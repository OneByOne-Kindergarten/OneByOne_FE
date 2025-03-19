// 타입 확장
declare global {
  interface Window {
    __viteNavigate?: (url: string) => void;
  }
}

// 클라이언트 측에서만 실행되도록 설정
if (typeof window !== "undefined") {
  // history API를 사용한 네비게이션 처리
  window.__viteNavigate = (url: string) => {
    window.history.pushState({}, "", url);

    // 페이지 컨텐츠를 업데이트하기 위한 이벤트 발생
    const navigationEvent = new PopStateEvent("navigate", { state: {} });
    window.dispatchEvent(navigationEvent);
  };

  // 브라우저의 뒤로가기/앞으로가기 처리
  window.addEventListener("popstate", () => {
    const navigationEvent = new PopStateEvent("navigate", { state: {} });
    window.dispatchEvent(navigationEvent);
  });
}

// 현재 경로 반환
export const getCurrentPath = () => {
  if (typeof window !== "undefined") {
    return window.location.pathname;
  }
  // SSR 환경에서는 요청 객체에서 경로를 가져와야 함
  return "";
};
