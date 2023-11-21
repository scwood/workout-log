import { ReactNode, createContext, useContext } from "react";

export interface CurrentUserContext {
  userId: string;
}

const context = createContext<CurrentUserContext | null>(null);

export interface CurrentUserProviderProps {
  userId: string;
  children?: ReactNode;
}

export function CurrentUserProvider(props: CurrentUserProviderProps) {
  const { userId, children } = props;

  return <context.Provider value={{ userId }}>{children}</context.Provider>;
}

export function useCurrentUser() {
  const contextValue = useContext(context);

  if (!contextValue) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }

  return contextValue;
}
