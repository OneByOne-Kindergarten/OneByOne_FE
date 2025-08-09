import {
  MessageType,
  sendToFlutter,
} from "@/common/utils/webViewCommunication";

import type { LocationPosition, LocationResponse } from "./DTO.d";

/**
 * 브라우저 geolocation 에러 메시지 변환
 */
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

/**
 * Flutter WebView에서 위치 정보 요청
 */
export async function requestLocationFromFlutter(): Promise<LocationPosition> {
  try {
    const result = await sendToFlutter<Record<string, never>, LocationResponse>(
      MessageType.REQUEST_LAT_LONG,
      {}
    );

    if (result.status === "true" && result.lat && result.long) {
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.long),
      };
    }

    throw new Error(
      result.error || result.message || "위치 정보를 가져오는데 실패했습니다."
    );
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "위치 정보를 가져오는데 실패했습니다."
    );
  }
}

/**
 * 웹 브라우저에서 위치 정보 요청
 */
export async function requestLocationFromBrowser(
  options?: PositionOptions
): Promise<LocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("이 브라우저에서는 위치 정보를 지원하지 않습니다."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error(getPositionErrorMessage(error)));
      },
      options
    );
  });
}

/**
 * 현재 환경이 Flutter WebView인지 확인
 * TODO 0806 한승완 : 추후 userAgent 변환 확인 필요
 */
export function isFlutterWebView(): boolean {
  return typeof window !== "undefined" && !!window.flutter_inappwebview;
}

/**
 * 환경에 맞는 위치 정보 요청
 */
export async function requestCurrentLocation(
  options?: PositionOptions
): Promise<LocationPosition> {
  if (isFlutterWebView()) {
    return requestLocationFromFlutter();
  } else {
    return requestLocationFromBrowser(options);
  }
}
