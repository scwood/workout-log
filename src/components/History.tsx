import { useState } from "react";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import {
  ActionIcon,
  Center,
  Flex,
  Loader,
  Table,
  Title,
  useMantineTheme,
} from "@mantine/core";

import { useWorkoutsQuery } from "../hooks/useWorkoutsQuery";
import { allExercises, exerciseDisplayNames } from "../types/Exercise";
import { WorkingWeightChart } from "./WorkingWeightChart";
import { CreateWorkoutModal } from "./CreateWorkoutModal";
import { useCreateWorkoutMutation } from "../hooks/useCreateWorkoutMutation";
import { Workout } from "../types/Workout";

export function History() {
  const { data: workouts, isLoading, isError } = useWorkoutsQuery();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { mutate: createWorkout, isLoadingCreate } = useCreateWorkoutMutation();
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
      <>
        <Title order={3} mb="xs">
          Working weight
        </Title>
        <WorkingWeightChart workouts={completedWorkouts} />
        <Flex justify="space-between" align="center">
          <Title order={3} mb="xs" mt="lg">
            Past workouts
          </Title>

          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <IconPlus />
          </ActionIcon>
        </Flex>
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
              <Table.Th>Date</Table.Th>
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
                  <Table.Td>
                    {new Date(workout.completedTimestamp ?? 0).toDateString()}
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
        <CreateWorkoutModal
          opened={isCreateModalOpen}
          isLoadingCreate={isLoadingCreate}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateWorkout}
        />
      </>
    );
  }

  async function handleCreateWorkout(values: {
    workingWeight: Workout["workingWeight"];
    lastSetReps: Workout["lastSetReps"];
    completedTimestamp: number;
  }) {
    await createWorkout({
      createdTimestamp: values.completedTimestamp,
      ...values,
    });
    setIsCreateModalOpen(false);
  }
}
