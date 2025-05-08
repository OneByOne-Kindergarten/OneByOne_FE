import { useState, useEffect } from "react";
import { sendToFlutter, MessageType } from "@/utils/webViewCommunication";

/**
 * 위치 정보 조회
 * @param options 위치 옵션
 * @returns 위치 정보 상태
 */

export interface GeolocationState {
  loading: boolean;
  error: string | null;
  position: {
    latitude: number;
    longitude: number;
  } | null;
}

interface LocationResponse {
  status: string;
  lat: string;
  long: string;
  message?: string;
  error?: string;
}

function getPositionErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "위치 정보 접근 권한이 거부되었습니다. 위치 권한을 확인해주세요.";
    case error.POSITION_UNAVAILABLE:
      return "현재 위치 정보를 사용할 수 없습니다.";
    case error.TIMEOUT:
      return "요청 시간이 초과되었습니다.";
    default:
      return "알 수 없는 오류가 발생했습니다.";
  }
}

export function useGeolocation(options?: PositionOptions): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    error: null,
    position: null,
  });

  useEffect(() => {
    const isFlutterWebView = /OneByOne/i.test(navigator.userAgent);

    if (isFlutterWebView) {
      // Flutter WebView 환경
      let isMounted = true;
      setState((prev) => ({ ...prev, loading: true }));

      sendToFlutter<{}, LocationResponse>(MessageType.REQUEST_LAT_LONG, {})
        .then((result) => {
          if (!isMounted) return;
          if (result.status === "true" && result.lat && result.long) {
            setState({
              loading: false,
              error: null,
              position: {
                latitude: parseFloat(result.lat),
                longitude: parseFloat(result.long),
              },
            });
          } else {
            setState({
              loading: false,
              error: result.error || result.message || "위치 정보를 가져오는데 실패했습니다.",
              position: null,
            });
          }
        })
        .catch((error) => {
          if (!isMounted) return;
          setState({
            loading: false,
            error: error instanceof Error ? error.message : "위치 정보를 가져오는데 실패했습니다.",
            position: null,
          });
        });

      return () => {
        isMounted = false;
      };
    } else {
      // 일반 웹 브라우저 환경 (watchPosition 사용)
      if (!navigator.geolocation) {
        setState({
          loading: false,
          error: "이 브라우저에서는 위치 정보를 지원하지 않습니다.",
          position: null,
        });
        return;
      }

      let watchId: number;

      const onSuccess = (position: GeolocationPosition) => {
        setState({
          loading: false,
          error: null,
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      };

      const onError = (error: GeolocationPositionError) => {
        setState({
          loading: false,
          error: getPositionErrorMessage(error),
          position: null,
        });
      };

      watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);

      // 언마운트 시 위치 감시 해제
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [options]);

  return state;
}
