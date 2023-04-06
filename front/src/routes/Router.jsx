import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "../routes/ErrorPage";
import UserErrorPage from "../routes/UserErrorPage";

const router = createBrowserRouter([
  {
    path: "/user/:userId",
    element: <App />,
    errorElement: <UserErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
