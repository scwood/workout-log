import { Button, Card, Title } from "@mantine/core";

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
    <Card withBorder shadow="sm">
      <Card.Section withBorder inheritPadding py="xs">
        <Title order={4}>{exerciseDisplayNames[exercise]}</Title>
      </Card.Section>
      <Card.Section withBorder inheritPadding py="xs" mb={6} fz={14}>
        <div>Working weight: {workout.workingWeight[exercise]} lbs </div>
        <div>Last set reps: {workout.lastSetReps[exercise]}</div>
      </Card.Section>
      <Button mt="xs" size="xs" onClick={() => onUndo(exercise)}>
        Undo
      </Button>
    </Card>
  );
}
