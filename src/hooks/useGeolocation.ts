import { useEffect, useRef, useState } from "react";

import { requestCurrentLocation } from "@/services/locationService";
import type { GeolocationState } from "@/types/geolocation";
import { getCachedLocation, setCachedLocation } from "@/utils/locationCache";

/**
 * 위치 정보 조회
 * @param options 위치 옵션
 * @returns 위치 정보 상태
 */
export function useGeolocation(options?: PositionOptions): GeolocationState {
  const [state, setState] = useState<GeolocationState>(() => {
    const cached = getCachedLocation();

    return {
      loading: !cached,
      error: null,
      position: cached,
    };
  });

  const hasRequestedLocation = useRef(false);

  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    // 캐시된 위치 정보가 있으면 재요청하지 않음
    const cached = getCachedLocation();

    if (cached || hasRequestedLocation.current) {
      if (cached && !state.position) {
        setState({
          loading: false,
          error: null,
          position: cached,
        });
      }
      return;
    }

    // 위치 정보 요청 시작
    hasRequestedLocation.current = true;
    setState((prev) => ({ ...prev, loading: true }));

    let isMounted = true;

    // 환경에 맞는 위치 정보 요청
    requestCurrentLocation(optionsRef.current)
      .then((location) => {
        if (!isMounted) return;

        setCachedLocation(location.latitude, location.longitude);

        setState({
          loading: false,
          error: null,
          position: location,
        });
      })
      .catch((error) => {
        if (!isMounted) return;

        setState({
          loading: false,
          error: error.message,
          position: null,
        });
      });

    return () => {
      isMounted = false;
    };
  }, []); // 한 번만 실행, options는 ref로 처리

  return state;
}
