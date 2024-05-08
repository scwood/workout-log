import { Box, Card, Flex, Text, useMantineTheme } from "@mantine/core";

import { Workout } from "../types/Workout";
import { allExercises, exerciseDisplayNames } from "../types/Exercise";
import { IconCheck, IconX } from "@tabler/icons-react";

export interface PastWorkoutCardProps {
  workout: Workout;
}

export function PastWorkoutCard(props: PastWorkoutCardProps) {
  const { workout } = props;
  const theme = useMantineTheme();

  return (
    <Card withBorder shadow="sm" fz="sm">
      <Card.Section withBorder inheritPadding py="xs" mb="xs">
        <Text c="dimmed" size="xs">
          Completed on{" "}
          {new Date(workout.completedTimestamp || 0).toLocaleString(undefined, {
            dateStyle: "long",
            timeStyle: "short",
          })}
        </Text>
      </Card.Section>
      <Flex>
        <Flex direction="column" justify="space-around">
          {allExercises.map((exercise) => {
            return <span key={exercise}>{exerciseDisplayNames[exercise]}</span>;
          })}
        </Flex>
        <Flex direction="column" justify="space-around" pl="sm">
          {allExercises.map((exercise) => {
            return (workout.lastSetReps[exercise] || 0) >= 5 ? (
              <IconCheck
                key={exercise}
                color={theme.colors.lime[5]}
                size={14}
              />
            ) : (
              <IconX key={exercise} color={theme.colors.red[6]} size={14} />
            );
          })}
        </Flex>
        <Flex direction="column" pl="xs">
          {allExercises.map((exercise) => {
            return (
              <span key={exercise}>
                {workout.workingWeight[exercise]} lbs for{" "}
                {workout.lastSetReps[exercise]} reps
              </span>
            );
          })}
        </Flex>
      </Flex>
      {workout.notes && <Box mt={6}>Notes: {workout.notes}</Box>}
    </Card>
  );
}
