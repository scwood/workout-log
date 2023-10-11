import {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useContext,
} from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

export type AppTheme = "light" | "dark";

export interface ThemeContext {
  theme: AppTheme;
  setTheme: Dispatch<SetStateAction<AppTheme>>;
}

export const themeContext = createContext<ThemeContext | null>(null);

export interface ThemeProviderProps {
  children?: ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;

  const [theme, setTheme] = useLocalStorage<AppTheme>({
    key: "workout-log-theme",
    defaultValue: "dark",
  });

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(themeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
