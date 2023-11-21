import "@mantine/core/styles.css";
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import { createTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Layout } from "./Layout";
import { MantineProvider } from "@mantine/core";
import { SignInPage } from "./SignInPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { CurrentWorkout } from "./CurrentWorkout";
import { AuthProvider } from "./AuthProvider";

const theme = createTheme({ headings: { fontWeight: "600" } });
const queryClient = new QueryClient();

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

export function App() {
  return (
    <AuthProvider>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={hashRouter} />
        </QueryClientProvider>
      </MantineProvider>
    </AuthProvider>
  );
}
