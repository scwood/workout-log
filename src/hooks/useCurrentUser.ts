import { useContext } from "react";

import { currentUserContext } from "../contexts/currentUserContext";

export function useCurrentUser() {
  const contextValue = useContext(currentUserContext);

  if (!contextValue) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }

  return contextValue;
}
