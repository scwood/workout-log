import { Flex, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import { WorkingWeight, WorkingWeightForm } from "./WorkingWeightForm";
import { ExerciseTable } from "./ExerciseTable";

export interface Workout {
  workingWeight: WorkingWeight;
  completedDate?: Date;
}

export function CurrentWorkout() {
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>({
    key: "workout-log-workouts",
    defaultValue: [],
  });

  if (!workouts || workouts.length === 0) {
    return (
      <>
        <p>Add your current working weight for each exercise to get started:</p>
        <WorkingWeightForm onSave={saveInitialWorkingWeights} />
      </>
    );
  } else {
    const currentWorkout = workouts[0];
    return (
      <>
        <Title order={3} mb="md">
          Current workout
        </Title>
        <Flex direction="column" gap="lg">
          <ExerciseTable
            name="Bench press"
            workingWeight={currentWorkout.workingWeight.bench}
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
            workingWeight={currentWorkout.workingWeight.press}
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

  function saveInitialWorkingWeights(workingWeight: WorkingWeight) {
    setWorkouts([{ workingWeight }]);
  }
}
