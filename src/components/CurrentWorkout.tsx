import { Flex, Title, Center, Loader, Button } from "@mantine/core";

import { ExerciseTable } from "./ExerciseTable";
import { WorkingWeightForm } from "./WorkingWeightForm";
import { useCurrentWorkoutQuery } from "../hooks/useCurrentWorkoutQuery";
import { Exercise, allExercises } from "../types/Exercise";
import { useCreateWorkoutMutation } from "../hooks/useCreateWorkoutMutation";
import { useUpdateWorkoutMutation } from "../hooks/useUpdateWorkoutMutation";
import { CompletedExercise } from "./CompletedExercise";
import { Workout } from "../types/Workout";
import { calculateDeload } from "../utils/weightUtils";

export function CurrentWorkout() {
  const { isLoading, isError, data: currentWorkout } = useCurrentWorkoutQuery();
  const { mutate: createWorkout } = useCreateWorkoutMutation();
  const { mutate: updateWorkout } = useUpdateWorkoutMutation();

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  } else if (isError) {
    return <Center>Failed to get workout</Center>;
  } else if (!currentWorkout) {
    return (
      <>
        <p>Add your current working weight for each exercise:</p>
        <WorkingWeightForm onSave={handleSaveWorkingWeight} />
      </>
    );
  } else if (currentWorkout.completedTimestamp) {
    return (
      <>
        <Title order={3} mb="md">
          Workout complete
        </Title>
        <p>
          Click the button below to create the next workout or click "undo" on
          an exercise to correct any mistakes.
        </p>
        <Button color="green" mb="lg" onClick={handleCreateNextWorkout}>
          Create next workout
        </Button>
        <Flex direction="column" gap="lg">
          {allExercises.map((exercise) => {
            return (
              <CompletedExercise
                key={exercise}
                exercise={exercise}
                workout={currentWorkout}
                onUndo={handleUndo}
              />
            );
          })}
        </Flex>
      </>
    );
  } else {
    return (
      <>
        <Title order={3} mb="md">
          Current workout
        </Title>
        <Flex direction="column" gap="lg" mb="lg">
          {allExercises.map((exercise) => {
            return (
              currentWorkout.lastSetReps[exercise] === null && (
                <ExerciseTable
                  key={exercise}
                  exercise={exercise}
                  workout={currentWorkout}
                  onComplete={handleComplete}
                />
              )
            );
          })}
        </Flex>
        <Title order={3} mb="md">
          Completed exercises
        </Title>
        <Flex direction="column" gap="lg">
          {allExercises.map((exercise) => {
            return (
              currentWorkout.lastSetReps[exercise] !== null && (
                <CompletedExercise
                  key={exercise}
                  exercise={exercise}
                  workout={currentWorkout}
                  onUndo={handleUndo}
                />
              )
            );
          })}
        </Flex>
      </>
    );
  }

  function handleSaveWorkingWeight(workingWeight: {
    [keys in Exercise]: number;
  }) {
    createWorkout({ workingWeight });
  }

  function handleComplete(exercise: Exercise, lastSetReps: number) {
    if (!currentWorkout) {
      return;
    }
    const updates: Workout = {
      ...currentWorkout,
      lastSetReps: { ...currentWorkout.lastSetReps, [exercise]: lastSetReps },
    };
    const allCompleted = allExercises.every((exercise) => {
      return updates.lastSetReps[exercise] !== null;
    });
    if (allCompleted) {
      updates.completedTimestamp = Date.now();
    }
    updateWorkout({ workout: { ...updates } });
  }

  function handleUndo(exercise: Exercise) {
    if (!currentWorkout) {
      return;
    }
    updateWorkout({
      workout: {
        ...currentWorkout,
        completedTimestamp: null,
        lastSetReps: { ...currentWorkout.lastSetReps, [exercise]: null },
      },
    });
  }

  function handleCreateNextWorkout() {
    if (!currentWorkout) {
      return;
    }
    const newWorkingWeight = { ...currentWorkout.workingWeight };
    for (const exercise of allExercises) {
      const prevWorkingWeight = currentWorkout.workingWeight[exercise];
      const prevLastSetReps = currentWorkout.lastSetReps[exercise] || 0;
      if (prevLastSetReps >= 5) {
        if (exercise === "benchPress" || exercise === "overheadPress") {
          newWorkingWeight[exercise] += 2.5;
        } else {
          newWorkingWeight[exercise] += 5;
        }
      } else {
        newWorkingWeight[exercise] = calculateDeload(prevWorkingWeight);
      }
    }
    createWorkout({ workingWeight: newWorkingWeight });
  }
}
