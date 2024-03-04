import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";

import { History } from "./History";
import { Layout } from "./Layout";
import { SignInPage } from "./SignInPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { CurrentWorkout } from "./CurrentWorkout";

const hashRouter = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <CurrentWorkout />,
          },
          {
            path: "history",
            element: <History />,
          },
        ],
      },
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export function AppRouterProvider() {
  return <RouterProvider router={hashRouter} />;
}
