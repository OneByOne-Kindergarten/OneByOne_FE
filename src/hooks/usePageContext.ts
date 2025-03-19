import { useState, useEffect } from "react";

/**
 * 현재 페이지 컨텍스트(URL 경로 등)를 가져오는 훅
 * 서버 사이드 렌더링과 클라이언트 사이드 렌더링 모두에서 동작
 */

export function usePageContext() {
  const [urlPathname, setUrlPathname] = useState<string>("");

  // 클라이언트에서만 실행
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrlPathname(window.location.pathname);

      // URL 변경 감지
      const handleUrlChange = () => {
        setUrlPathname(window.location.pathname);
      };

      window.addEventListener("popstate", handleUrlChange);
      return () => {
        window.removeEventListener("popstate", handleUrlChange);
      };
    }
  }, []);

  return {
    urlPathname,
  };
}
