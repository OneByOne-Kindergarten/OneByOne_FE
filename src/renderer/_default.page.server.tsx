import React from "react";
import ReactDOMServer from "react-dom/server";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import "@/styles/global.css";

export { render };

async function render(pageContext: {
  Page: React.ElementType;
  pageProps: Record<string, any>;
  routeParams?: Record<string, any>;
}) {
  const { Page, pageProps, routeParams } = pageContext;
  const getDocumentProps = (Page as any).getDocumentProps;
  const id = routeParams?.id;

  const { title, description } = getDocumentProps
    ? getDocumentProps(pageProps)
    : {
        title: "원바원",
        description: "유치원 교사들을 위한 유치원 리뷰 및 커뮤니티 서비스",
      };

  const viewHtml = ReactDOMServer.renderToString(
    <Page {...pageProps} id={id} />
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
