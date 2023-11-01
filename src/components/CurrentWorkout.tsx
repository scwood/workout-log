import { Subtitle1, Subtitle2 } from "@fluentui/react-components";

import { useLocalStorage } from "@mantine/hooks";
import { WorkingWeight, WorkingWeightForm } from "./WorkingWeightForm";

export interface Workout {
  workingWeight: WorkingWeight;
  completedDate?: Date;
}

export function CurrentWorkout() {
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>({
    key: "workout-log-workouts",
    defaultValue: [],
  });

  function saveInitialWorkingWeights(workingWeight: WorkingWeight) {
    setWorkouts([{ workingWeight }]);
  }

  if (workouts && workouts.length === 0) {
    return (
      <>
        <p>Add your current working weight for each exercise to get started:</p>
        <WorkingWeightForm onSave={saveInitialWorkingWeights} />
      </>
    );
  } else {
    return (
      <>
        <Subtitle1>Current workout</Subtitle1>
        <div>
          <Subtitle2>Bench press</Subtitle2>
        </div>
        <div>
          <Subtitle2>Dead lift</Subtitle2>
        </div>
        <div>
          <Subtitle2></Subtitle2>
        </div>
        <div>
          <Subtitle2>Bench press</Subtitle2>
        </div>
      </>
    );
  }
}
