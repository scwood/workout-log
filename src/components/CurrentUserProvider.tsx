import { ReactNode } from "react";

import { currentUserContext } from "../contexts/currentUserContext";

export interface CurrentUserProviderProps {
  userId: string;
  children?: ReactNode;
}

export function CurrentUserProvider(props: CurrentUserProviderProps) {
  const { userId, children } = props;

  return (
    <currentUserContext.Provider value={{ userId }}>
      {children}
    </currentUserContext.Provider>
  );
}
