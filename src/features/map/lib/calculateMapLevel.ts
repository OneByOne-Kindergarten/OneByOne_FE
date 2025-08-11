interface KindergartenPosition {
  latitude: number;
  longitude: number;
}

/**
 * 현재 위치와 유치원들의 위치를 기반으로 지도 레벨을 계산하는 함수
 */
export const calculateMapLevel = (
  userPosition: KindergartenPosition,
  kindergartens: KindergartenPosition[] = []
): number => {
  if (kindergartens.length === 0) return 6;

  // 현재 위치와 모든 유치원의 위경도 범위 계산
  const lats = [userPosition.latitude, ...kindergartens.map((k) => k.latitude)];
  const lngs = [
    userPosition.longitude,
    ...kindergartens.map((k) => k.longitude),
  ];

  const latDiff = Math.max(...lats) - Math.min(...lats);
  const lngDiff = Math.max(...lngs) - Math.min(...lngs);
  const maxDiff = Math.max(latDiff, lngDiff);

  // 범위에 따른 레벨 결정
  if (maxDiff > 0.3) return 9;
  if (maxDiff > 0.2) return 8;
  if (maxDiff > 0.1) return 7;
  return 6;
};
