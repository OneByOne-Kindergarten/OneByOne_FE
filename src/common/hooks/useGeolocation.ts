import { useEffect, useRef, useState } from "react";

import {
  getCachedLocation,
  setCachedLocation,
} from "@/common/utils/locationCache";
import { requestCurrentLocation } from "@/entities/location/api";
import type { GeolocationState } from "@/entities/location/DTO.d";

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

    // AbortController로 요청 취소 관리
    const abortController = new AbortController();
    let isRequestCompleted = false;

    // 환경에 맞는 위치 정보 요청
    requestCurrentLocation(optionsRef.current)
      .then((location) => {
        if (abortController.signal.aborted) {
          return;
        }

        isRequestCompleted = true;
        setCachedLocation(location.latitude, location.longitude);

        setState({
          loading: false,
          error: null,
          position: location,
        });
      })
      .catch((error) => {
        if (abortController.signal.aborted) {
          return;
        }

        isRequestCompleted = true;
        setState({
          loading: false,
          error: error.message,
          position: null,
        });
      });

    return () => {
      if (!isRequestCompleted) {
        abortController.abort();
        // StrictMode에서 재실행 가능하도록 플래그 리셋
        hasRequestedLocation.current = false;
      }
    };
  }, []); // 한 번만 실행, options는 ref로 처리

  return state;
}
