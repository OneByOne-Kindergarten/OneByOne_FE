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
