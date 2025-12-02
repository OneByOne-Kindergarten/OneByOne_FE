interface KindergartenPosition {
  latitude: number;
  longitude: number;
}

// 현재 위치, 유치원들의 위치를 기반으로 지도 레벨 계산
export const calculateMapLevel = (
  userPosition: KindergartenPosition,
  kindergartens: KindergartenPosition[] = []
): number => {
  if (kindergartens.length === 0) return 15;

  // 모든 위치의 위경도 범위 계산
  const lats = [userPosition.latitude, ...kindergartens.map((k) => k.latitude)];
  const lngs = [
    userPosition.longitude,
    ...kindergartens.map((k) => k.longitude),
  ];

  // 위도/경도 차이 중 최대값 계산
  const latDiff = Math.max(...lats) - Math.min(...lats);
  const lngDiff = Math.max(...lngs) - Math.min(...lngs);
  const maxDiff = Math.max(latDiff, lngDiff);

  // 마커가 지도 가장자리에 붙지 않도록 패딩 추가
  const paddedDiff = maxDiff * 1.3;

  if (paddedDiff < 0.01) return 16;
  if (paddedDiff < 0.03) return 15;
  if (paddedDiff < 0.08) return 14;
  if (paddedDiff < 0.15) return 13;
  if (paddedDiff < 0.3) return 12;
  return 11;
};
