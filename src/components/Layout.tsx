import { Outlet } from "react-router-dom";
import { Button, Divider, Title2 } from "@fluentui/react-components";
import {
  Code24Regular,
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from "@fluentui/react-icons";

import styles from "./Layout.module.css";
import { useTheme } from "./ThemeProvider";

export function Layout() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Title2>🏋️‍♂️ Workout log</Title2>
          <div className={styles.headerActions}>
            <Button
              as="a"
              href="https://github.com/scwood/workout-log"
              target="_blank"
              rel="noopener noreferrer"
              icon={<Code24Regular />}
              appearance="subtle"
              size="large"
            />
            <Button
              appearance="subtle"
              size="large"
              icon={
                theme === "dark" ? (
                  <WeatherSunny24Regular />
                ) : (
                  <WeatherMoon24Regular />
                )
              }
              onClick={() =>
                setTheme((prev) => {
                  return prev === "dark" ? "light" : "dark";
                })
              }
            />
          </div>
        </div>
        <Divider className={styles.divider} />
        <Outlet />
      </div>
    </div>
  );
}
