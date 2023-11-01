import "@mantine/core/styles.css";
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";

import { Layout } from "./Layout";
import { CurrentWorkout } from "./CurrentWorkout";
import { MantineProvider } from "@mantine/core";

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
    <MantineProvider>
      <RouterProvider router={hashRouter} />
    </MantineProvider>
  );
}
