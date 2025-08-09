import {
  CachedLocationData,
  LocationPosition,
} from "@/common/types/geolocation";

const LOCATION_CACHE_KEY = "userLocation";
const LOCATION_CACHE_DURATION = 60 * 60 * 1000; // 1시간

export function getCachedLocation(): LocationPosition | null {
  try {
    const cached = sessionStorage.getItem(LOCATION_CACHE_KEY);
    if (cached) {
      const data: CachedLocationData = JSON.parse(cached);
      const now = Date.now();

      // 위치 정보가 유효한지 확인
      if (now - data.timestamp < LOCATION_CACHE_DURATION) {
        return {
          latitude: data.latitude,
          longitude: data.longitude,
        };
      }
    }
  } catch (error) {
    console.warn("위치 정보 캐시 조회 실패:", error);
  }
  return null;
}

export function setCachedLocation(latitude: number, longitude: number): void {
  try {
    const data: CachedLocationData = {
      latitude,
      longitude,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("위치 정보 캐시 저장 실패:", error);
  }
}

export function clearLocationCache(): void {
  try {
    sessionStorage.removeItem(LOCATION_CACHE_KEY);
  } catch (error) {
    console.warn("위치 정보 캐시 삭제 실패:", error);
  }
}
