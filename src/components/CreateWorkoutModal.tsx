import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { Button, Flex, Modal, NumberInput } from "@mantine/core";

import { Workout } from "../types/Workout";

export interface CreateWorkoutModalProps {
  opened: boolean;
  isLoadingCreate: boolean;
  onClose: () => void;
  onCreate: (values: {
    workingWeight: Workout["workingWeight"];
    lastSetReps: Workout["lastSetReps"];
    completedTimestamp: number;
  }) => void;
}

export function CreateWorkoutModal(props: CreateWorkoutModalProps) {
  const { opened, isLoadingCreate, onClose, onCreate } = props;

  const [completedDate, setCompletedDate] = useState<Date | null>(null);
  const [benchPress, setBenchPress] = useState<string | number>("");
  const [overheadPress, setOverheadPress] = useState<string | number>("");
  const [squat, setSquat] = useState<string | number>("");
  const [deadLift, setDeadLift] = useState<string | number>("");

  const [benchPressLastSetReps, setBenchPressLastSetReps] = useState<
    string | number
  >("");
  const [overheadPressLastSetReps, setOverheadPressLastSetReps] = useState<
    string | number
  >("");
  const [squatLastSetReps, setSquatLastSetReps] = useState<string | number>("");
  const [deadLiftLastSetReps, setDeadLiftLastSetReps] = useState<
    string | number
  >("");

  const [prevOpened, setPrevOpened] = useState(opened);
  if (prevOpened !== opened) {
    setPrevOpened(opened);
    setCompletedDate(null);
    setBenchPress("");
    setBenchPressLastSetReps("");
    setDeadLift("");
    setDeadLiftLastSetReps("");
    setOverheadPress("");
    setOverheadPressLastSetReps("");
    setSquat("");
    setSquatLastSetReps("");
  }

  const parsedValues = {
    workingWeight: {
      benchPress: parseFloat(String(benchPress)),
      overheadPress: parseFloat(String(overheadPress)),
      squat: parseInt(String(squat)),
      deadLift: parseInt(String(deadLift)),
    },
    lastSetReps: {
      benchPress: parseInt(String(benchPressLastSetReps)),
      overheadPress: parseInt(String(overheadPressLastSetReps)),
      deadLift: parseInt(String(deadLiftLastSetReps)),
      squat: parseInt(String(squatLastSetReps)),
    },
  };

  const isValid =
    !!completedDate &&
    parsedValues.workingWeight.benchPress > 0 &&
    parsedValues.workingWeight.overheadPress > 0 &&
    parsedValues.workingWeight.deadLift > 0 &&
    parsedValues.workingWeight.squat > 0 &&
    parsedValues.lastSetReps.benchPress > 0 &&
    parsedValues.lastSetReps.deadLift > 0 &&
    parsedValues.lastSetReps.overheadPress > 0 &&
    parsedValues.lastSetReps.squat > 0;

  return (
    <Modal centered title="Create workout" opened={opened} onClose={onClose}>
      Use the form below to manually add a workout that wasn't completed with
      the app.
      <Flex direction="column" gap="xs" mt="md">
        <DatePickerInput
          label="Date"
          placeholder="Completion date of workout"
          value={completedDate}
          maxDate={new Date()}
          onChange={setCompletedDate}
        />
        <Flex justify="space-between" gap="md">
          <NumberInput
            allowDecimal
            label="Bench press (lbs)"
            placeholder="100"
            value={benchPress}
            onChange={setBenchPress}
            min={0}
          />
          <NumberInput
            allowDecimal={false}
            label="Last set reps"
            placeholder="5"
            value={benchPressLastSetReps}
            onChange={setBenchPressLastSetReps}
            min={0}
          />
        </Flex>
        <Flex justify="space-between" gap="md">
          <NumberInput
            allowDecimal
            label="Dead lift (lbs)"
            placeholder="100"
            value={deadLift}
            onChange={setDeadLift}
            min={0}
          />
          <NumberInput
            allowDecimal={false}
            label="Last set reps"
            placeholder="5"
            value={deadLiftLastSetReps}
            onChange={setDeadLiftLastSetReps}
            min={0}
          />
        </Flex>
        <Flex justify="space-between" gap="md">
          <NumberInput
            allowDecimal
            label="Overhead press (lbs)"
            placeholder="100"
            value={overheadPress}
            onChange={setOverheadPress}
            min={0}
          />
          <NumberInput
            allowDecimal={false}
            label="Last set reps"
            placeholder="5"
            value={overheadPressLastSetReps}
            onChange={setOverheadPressLastSetReps}
            min={0}
          />
        </Flex>
        <Flex justify="space-between" gap="md">
          <NumberInput
            allowDecimal
            label="Squat (lbs)"
            placeholder="100"
            value={squat}
            onChange={setSquat}
            min={0}
          />
          <NumberInput
            allowDecimal={false}
            label="Last set reps"
            placeholder="5"
            value={squatLastSetReps}
            onChange={setSquatLastSetReps}
            min={0}
          />
        </Flex>
        <div>
          <Button
            loading={isLoadingCreate}
            color="green"
            mt="xs"
            disabled={!isValid}
            onClick={handleCreate}
          >
            Create
          </Button>
        </div>
      </Flex>
    </Modal>
  );

  function handleCreate() {
    if (isValid) {
      onCreate({
        completedTimestamp: completedDate.getTime(),
        ...parsedValues,
      });
    }
  }
}
