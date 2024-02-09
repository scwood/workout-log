import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentUser } from "../hooks/useCurrentUser";
import { updateWorkout } from "../api/workoutsApi";
import { currentWorkoutQueryKey } from "./useCurrentWorkoutQuery";
import { Workout } from "../types/Workout";
import { workoutsQueryKey } from "./useWorkoutsQuery";

export function useUpdateWorkoutMutation() {
  const { userId } = useCurrentUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workout }: { workout: Workout }) => {
      return updateWorkout(workout);
    },
    onMutate: ({ workout }) => {
      const currentWorkout = queryClient.getQueryData<Workout>(
        currentWorkoutQueryKey(userId)
      );
      if (currentWorkout && currentWorkout.id === workout.id) {
        queryClient.setQueryData(currentWorkoutQueryKey(userId), workout);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: currentWorkoutQueryKey(userId),
      });
      queryClient.invalidateQueries({
        queryKey: workoutsQueryKey(userId),
      });
    },
  });
}
