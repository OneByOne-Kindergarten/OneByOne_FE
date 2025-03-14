import * as express from "express";
import { renderPage } from "vite-plugin-ssr";

const app = express();

app.get(
  "*",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
    };

    // SSR 실행
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;

    if (!httpResponse) return next();

    // HTML 전송
    res.status(httpResponse.statusCode).send(httpResponse.body);
  }
);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
