import { Center, Flex, Loader, Table, useMantineTheme } from "@mantine/core";

import { useWorkoutsQuery } from "../hooks/useWorkoutsQuery";
import { allExercises, exerciseDisplayNames } from "../types/Exercise";
import { IconCheck, IconX } from "@tabler/icons-react";

export function History() {
  const { data: workouts, isLoading, isError } = useWorkoutsQuery();
  const theme = useMantineTheme();

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  } else if (isError || !workouts) {
    return <Center>Failed to load workout history</Center>;
  } else {
    const completedWorkouts = workouts.filter((workout) => {
      return workout.completedTimestamp;
    });

    return (
      <Table mb="xs">
        <Table.Thead>
          <Table.Tr>
            {allExercises.map((exercise) => {
              return (
                <Table.Th key={exercise}>
                  {exerciseDisplayNames[exercise]}
                </Table.Th>
              );
            })}
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {completedWorkouts.map((workout) => {
            return (
              <Table.Tr key={workout.id}>
                {allExercises.map((exercise) => {
                  return (
                    <Table.Td key={exercise}>
                      <Flex align="center" gap={2}>
                        <span>{workout.workingWeight[exercise]}</span>
                        {(workout.lastSetReps[exercise] || 0) >= 5 ? (
                          <IconCheck color={theme.colors.lime[5]} size={16} />
                        ) : (
                          <IconX color={theme.colors.red[6]} size={16} />
                        )}
                      </Flex>
                    </Table.Td>
                  );
                })}
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    );
  }
}
