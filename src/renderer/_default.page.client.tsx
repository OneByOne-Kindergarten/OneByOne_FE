import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import "@/styles/global.css";
import { useEffect } from "react";

export { render };

// 클라이언트 라우팅 활성화 상태
export const clientRouting = false;

let root: ReactDOM.Root | null = null;

async function render(pageContext: any) {
  const { Page, pageProps, routeParams } = pageContext;
  const id = routeParams?.id || getIdFromUrl();

  // URL에서 ID 추출
  function getIdFromUrl() {
    if (typeof window === "undefined") return "";
    const pathSegments = window.location.pathname.split("/");
    return pathSegments.length >= 3 ? pathSegments[2] : "";
  }

  const rootElement = document.getElementById("page-view");
  if (!rootElement) {
    console.error("Root element not found");
    return;
  }

  // TEST:디버깅 로깅
  console.log("클라이언트 렌더링:", {
    id,
    routeParams,
    path: typeof window !== "undefined" ? window.location.pathname : "",
    extractedId: getIdFromUrl(),
  });

  // TEST: 클라이언트 컴포넌트를 위한 래퍼
  const PageWrapper = () => {
    const params = useParams();
    const effectiveId = params.id || id;
    const propsWithId = effectiveId
      ? { ...pageProps, id: effectiveId }
      : pageProps;

    // 페이지 컴포넌트가 getMetadata를 갖고 있다면 메타데이터 업데이트
    useEffect(() => {
      if ((Page as any).getMetadata) {
        const meta = (Page as any).getMetadata(propsWithId);
        if (meta.title) {
          document.title = meta.title;
        }
        const descriptionMeta = document.querySelector(
          'meta[name="description"]'
        );
        if (descriptionMeta && meta.description) {
          descriptionMeta.setAttribute("content", meta.description);
        }
      }
    }, [effectiveId]);

    return <Page {...propsWithId} />;
  };

  // TEST: 하이드레이션
  // 기존 루트가 있으면 루트 재사용, 없으면 새로 생성
  if (!root) {
    try {
      root = ReactDOM.hydrateRoot(
        rootElement,
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<PageWrapper />} />
          </Routes>
        </BrowserRouter>
      );
    } catch (error) {
      console.warn("Hydration failed, creating a new root:", error);
      // 하이드레이션 실패 시 새로 렌더링
      rootElement.innerHTML = "";
      root = ReactDOM.createRoot(rootElement);
      root.render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<PageWrapper />} />
          </Routes>
        </BrowserRouter>
      );
    }
  } else {
    // 기존 루트가 있으면 업데이트
    root.render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PageWrapper />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
