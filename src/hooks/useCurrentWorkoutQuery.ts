import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "../components/CurrentUserProvider";
import { getCurrentWorkout } from "../api/workoutApi";

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
