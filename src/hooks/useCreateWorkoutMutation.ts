import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentUser } from "../components/CurrentUserProvider";
import { createWorkout } from "../api/workoutsApi";
import { Exercise } from "../types/Exercise";
import { currentWorkoutQueryKey } from "./useCurrentWorkoutQuery";

export function useCreateWorkoutMutation() {
  const { userId } = useCurrentUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workingWeight,
    }: {
      workingWeight: { [key in Exercise]: number };
    }) => {
      return createWorkout(userId, workingWeight);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: currentWorkoutQueryKey(userId),
      });
    },
  });
}
