import { createContext } from "react";

export interface AuthContext {
  userId: string | null;
  displayName: string | null;
  isLoading: boolean;
  error: Error | null;
  signIn: (provider: "google" | "github") => void;
  signOut: () => void;
}

export const authContext = createContext<AuthContext | null>(null);
