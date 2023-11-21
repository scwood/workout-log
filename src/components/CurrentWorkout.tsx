import { Flex, Title, Center, Loader } from "@mantine/core";

import { ExerciseTable } from "./ExerciseTable";
import { WorkingWeightForm } from "./WorkingWeightForm";
import { useCurrentWorkoutQuery } from "../hooks/useCurrentWorkoutQuery";
import { Exercise } from "../types/Exercise";
import { useCreateWorkoutMutation } from "../hooks/useCreateWorkoutMutation";

export function CurrentWorkout() {
  const { isLoading, isError, data: currentWorkout } = useCurrentWorkoutQuery();
  const { mutate: createWorkout } = useCreateWorkoutMutation();

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  } else if (isError) {
    return <Center>Failed to get workouts</Center>;
  } else if (!currentWorkout) {
    return (
      <>
        <p>Add your current working weight for each exercise:</p>
        <WorkingWeightForm onSave={handleSaveWorkingWeight} />
      </>
    );
  } else {
    return (
      <>
        <Title order={3} mb="md">
          Current workout
        </Title>
        <Flex direction="column" gap="lg">
          <ExerciseTable
            name="Bench press"
            workingWeight={currentWorkout.workingWeight.benchPress}
            currentRepRecord={0}
            onComplete={() => {}}
          />
          <ExerciseTable
            name="Dead lift"
            workingWeight={currentWorkout.workingWeight.deadLift}
            currentRepRecord={0}
            lastSetRepScheme="1x5+"
            onComplete={() => {}}
          />
          <ExerciseTable
            name="Overhead press"
            workingWeight={currentWorkout.workingWeight.overheadPress}
            currentRepRecord={0}
            onComplete={() => {}}
          />
          <ExerciseTable
            name="Squat"
            workingWeight={currentWorkout.workingWeight.squat}
            currentRepRecord={0}
            onComplete={() => {}}
          />
        </Flex>
      </>
    );
  }

  function handleSaveWorkingWeight(workingWeight: {
    [keys in Exercise]: number;
  }) {
    createWorkout({ workingWeight });
  }
}
