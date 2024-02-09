import { useQuery } from "@tanstack/react-query";

import { useCurrentUser } from "../hooks/useCurrentUser";
import { getCurrentWorkout } from "../api/workoutsApi";

export function currentWorkoutQueryKey(userId: string) {
  return ["currentWorkout", userId];
}

export function useCurrentWorkoutQuery() {
  const { userId } = useCurrentUser();

  return useQuery({
    queryKey: currentWorkoutQueryKey(userId),
    queryFn: () => getCurrentWorkout(userId),
  });
}
