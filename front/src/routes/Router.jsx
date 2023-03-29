import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "../routes/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/user/:userId",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <ErrorPage />,
  },
  {
    path: "/settings",
    element: <ErrorPage />,
  },
  {
    path: "/community",
    element: <ErrorPage />,
  },
  {
    path: "/meditation",
    element: <ErrorPage />,
  },
  {
    path: "/swimming",
    element: <ErrorPage />,
  },
  {
    path: "/cycling",
    element: <ErrorPage />,
  },
  {
    path: "/bodybuilding",
    element: <ErrorPage />,
  },
]);

export default router;
