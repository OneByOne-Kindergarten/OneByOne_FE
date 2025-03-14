import ReactDOM from "react-dom/client";
import "@/styles/global.css";

export { render };

async function render(pageContext: any) {
  const { Page, pageProps } = pageContext;

  const rootElement = document.getElementById("page-view");

  if (rootElement) {
    ReactDOM.hydrateRoot(rootElement, <Page {...pageProps} />);
  } else {
    console.error("Root element not found");
  }
}
