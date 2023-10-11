import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";

import { Layout } from "./Layout";
import { WorkoutList } from "../WorkoutList";
import { useTheme } from "./ThemeProvider";

const hashRouter = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <WorkoutList />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export function App() {
  const { theme } = useTheme();

  return (
    <FluentProvider theme={theme === "dark" ? webDarkTheme : webLightTheme}>
      <RouterProvider router={hashRouter} />
    </FluentProvider>
  );
}
