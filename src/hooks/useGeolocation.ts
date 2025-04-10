import { useState, useEffect } from "react";

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

export function useGeolocation(options?: PositionOptions): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    error: null,
    position: null,
  });

  useEffect(() => {
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

    // 사용자가 이동할 때 자동 업데이트
    watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);

    // 클린업 함수: 컴포넌트 언마운트 시 위치 감시 종료
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return state;
}

// 위치 에러 코드 포맷팅
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
