import { Button, Title } from "@mantine/core";

import { Exercise, exerciseDisplayNames } from "../types/Exercise";
import { Workout } from "../types/Workout";

export interface CompletedExerciseProps {
  workout: Workout;
  exercise: Exercise;
  onUndo: (exercise: Exercise) => void;
}

export function CompletedExercise(props: CompletedExerciseProps) {
  const { onUndo, workout, exercise } = props;

  return (
    <div>
      <Title order={4}>{exerciseDisplayNames[exercise]}</Title>
      <div>
        <div>Working weight: {workout.workingWeight[exercise]}lbs </div>
        <div>Last set reps: {workout.lastSetReps[exercise]}</div>
      </div>
      <Button
        variant="default"
        mt="xs"
        size="xs"
        onClick={() => onUndo(exercise)}
      >
        Undo
      </Button>
    </div>
  );
}
