import "@mantine/core/styles.css";
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import { createTheme } from "@mantine/core";

import { Layout } from "./Layout";
import { CurrentWorkout } from "./CurrentWorkout";
import { MantineProvider } from "@mantine/core";

const theme = createTheme({ headings: { fontWeight: "600" } });

const hashRouter = createHashRouter([
  {
    path: "/*",
    element: <Layout />,
    children: [
      {
        path: "current-workout",
        element: <CurrentWorkout />,
      },
      {
        path: "*",
        element: <Navigate to="current-workout" />,
      },
    ],
  },
]);

export function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <RouterProvider router={hashRouter} />
    </MantineProvider>
  );
}
