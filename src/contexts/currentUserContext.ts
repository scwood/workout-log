import { createContext } from "react";

export interface CurrentUserContext {
  userId: string;
}

export const currentUserContext = createContext<CurrentUserContext | null>(
  null
);
