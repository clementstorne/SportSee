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
]);

export default router;
