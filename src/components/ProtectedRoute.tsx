import { Navigate, Outlet } from "react-router";

import { useAuth } from "./AuthProvider";
import { CurrentUserProvider } from "./CurrentUserProvider";

export function ProtectedRoute() {
  const { userId } = useAuth();

  if (!userId) {
    return <Navigate to="/sign-in" />;
  } else {
    return (
      <CurrentUserProvider userId={userId}>
        <Outlet />
      </CurrentUserProvider>
    );
  }
}
