import { lazy } from "react";
import GlobalLayout from "./pages/_layout";

const Index = lazy(() => import("./pages/index"));
const Kindergarten = lazy(() => import("./pages/kindergarten"));
const KindergartenId = lazy(() => import("./pages/kindergarten/[id]"));

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/kindergarten", element: <Kindergarten /> },
      { path: "/kindergarten/:id", element: <KindergartenId /> },
    ],
  },
];

export const pages = [
  { route: "/" },
  { route: "/kindergarten" },
  { route: "/kindergarten/:id" },
];
