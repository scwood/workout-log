import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { ActionIcon, Center, Flex, Loader, Title } from "@mantine/core";

import { useWorkoutsQuery } from "../hooks/useWorkoutsQuery";
import { WorkingWeightChart } from "./WorkingWeightChart";
import { CreateWorkoutModal } from "./CreateWorkoutModal";
import { useCreateWorkoutMutation } from "../hooks/useCreateWorkoutMutation";
import { Workout } from "../types/Workout";
import { PastWorkoutCard } from "./PastWorkoutCard";

export function History() {
  const { data: workouts, isLoading, isError } = useWorkoutsQuery();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { mutate: createWorkout, isLoadingCreate } = useCreateWorkoutMutation();

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
          <Title order={3} mb="md" mt="lg">
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
        <Flex gap="sm" direction="column">
          {completedWorkouts.map((workout) => {
            return <PastWorkoutCard key={workout.id} workout={workout} />;
          })}
        </Flex>
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
