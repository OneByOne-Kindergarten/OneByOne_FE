import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import "@/styles/global.css";
import "@/utils/navigation";

// 클라이언트로 전달할 데이터 배열
export const passToClient = ["pageProps", "routeParams", "urlPathname"];

export { render };

async function render(pageContext: {
  Page: React.ElementType;
  pageProps: Record<string, any>;
  routeParams?: Record<string, any>;
  urlPathname: string;
}) {
  const { Page, pageProps, routeParams, urlPathname } = pageContext;

  // CSR, 초기 HTMl 전달
  if (!Page) {
    return escapeInject`<!DOCTYPE html>
      <html>
        <head>
          <title>원바원원</title>
        </head>
        <body>
          <div id="page-view"></div>
        </body>
        </html>`;
  }

  const id = routeParams?.id;

  // pageProps에 ID 추가
  const propsWithId = {
    ...pageProps,
    id,
  };

  let title = "원바원";
  let description = "유치원 교사들을 위한 유치원 리뷰 및 커뮤니티 서비스";

  if ((Page as any).getMetadata) {
    const meta = (Page as any).getMetadata(propsWithId);
    title = meta.title || title;
    description = meta.description || description;
  } else if ((Page as any).metadata) {
    const meta = (Page as any).metadata;
    title = meta.title || title;
    description = meta.description || description;
  }

  const viewHtml = ReactDOMServer.renderToString(
    <StaticRouter location={urlPathname}>
      <Page {...propsWithId} />
    </StaticRouter>
  );

  return escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <meta name="description" content="${description}">
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(viewHtml)}</div>
      </body>
    </html>`;
}
