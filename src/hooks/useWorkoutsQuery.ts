import { useQuery } from "@tanstack/react-query";

import { useCurrentUser } from "../hooks/useCurrentUser";
import { getWorkouts } from "../api/workoutsApi";

export function workoutsQueryKey(userId: string) {
  return ["workouts", userId];
}

export function useWorkoutsQuery() {
  const { userId } = useCurrentUser();

  return useQuery({
    queryKey: workoutsQueryKey(userId),
    queryFn: () => getWorkouts(userId),
  });
}
