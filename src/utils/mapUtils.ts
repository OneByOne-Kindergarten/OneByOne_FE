interface MarkerStyle {
  bgColor: string;
  borderColor: string;
  textColor: string;
  text: string;
  showIcon: boolean;
}

/**
 * 설립형태에 따른 마커 스타일을 반환하는 함수
 */
export const getMarkerStyles = (establishment?: string): MarkerStyle => {
  const isPublic = establishment?.includes("공립");
  const isPrivate = establishment?.includes("사립");

  if (isPublic) {
    return {
      bgColor: "#6CA6ED",
      borderColor: "transparent",
      textColor: "white",
      text: "공립",
      showIcon: false,
    };
  }

  if (isPrivate) {
    return {
      bgColor: "white",
      borderColor: "#6CA6ED",
      textColor: "#6CA6ED",
      text: "사립",
      showIcon: false,
    };
  }

  return {
    bgColor: "#6b7280",
    borderColor: "transparent",
    textColor: "white",
    text: "미확인",
    showIcon: false,
  };
};

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
