import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentUser } from "../components/CurrentUserProvider";
import { updateWorkout } from "../api/workoutsApi";
import { currentWorkoutQueryKey } from "./useCurrentWorkoutQuery";
import { Workout } from "../types/Workout";

export function useUpdateWorkoutMutation() {
  const { userId } = useCurrentUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workout }: { workout: Workout }) => {
      return updateWorkout(workout);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: currentWorkoutQueryKey(userId),
      });
    },
  });
}
