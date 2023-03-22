import { createBrowserRouter } from "react-router-dom";

import App from "../routes/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profile",
    element: <App />,
  },
  {
    path: "/settings",
    element: <App />,
  },
  {
    path: "/community",
    element: <App />,
  },
  {
    path: "/meditation",
    element: <App />,
  },
  {
    path: "/swimming",
    element: <App />,
  },
  {
    path: "/cycling",
    element: <App />,
  },
  {
    path: "/bodybuilding",
    element: <App />,
  },
]);

export default router;
