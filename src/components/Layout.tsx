import { Outlet } from "react-router-dom";
import { Title, useMantineColorScheme } from "@mantine/core";

import styles from "./Layout.module.css";

export function Layout() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Title order={2}>🏋️‍♂️ Workout log</Title>
          <div className={styles.headerActions}>
            <a
              href="https://github.com/scwood/workout-log"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
            <button onClick={toggleColorScheme}>
              {colorScheme === "dark" ? "light" : "dark"}
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
