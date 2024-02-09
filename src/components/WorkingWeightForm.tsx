import { Button, NumberInput, Flex } from "@mantine/core";
import { useState } from "react";

import { Exercise } from "../types/Exercise";

export interface WorkingWeightFormProps {
  initialValues?: { [key in Exercise]: number };
  onSave: (workingWeight: { [key in Exercise]: number }) => void;
}

export function WorkingWeightForm(props: WorkingWeightFormProps) {
  const { initialValues, onSave } = props;
  const [benchPress, setBenchPress] = useState<string | number>(
    initialValues?.benchPress ?? ""
  );
  const [overheadPress, setOverheadPress] = useState<string | number>(
    initialValues?.overheadPress ?? ""
  );
  const [squat, setSquat] = useState<string | number>(
    initialValues?.squat ?? ""
  );
  const [deadLift, setDeadLift] = useState<string | number>(
    initialValues?.deadLift ?? ""
  );

  const parsedValues = {
    benchPress: parseFloat(String(benchPress)),
    overheadPress: parseFloat(String(overheadPress)),
    squat: parseInt(String(squat)),
    deadLift: parseInt(String(deadLift)),
  };

  const isValid =
    parsedValues.benchPress > 0 &&
    parsedValues.overheadPress > 0 &&
    parsedValues.squat > 0 &&
    parsedValues.deadLift > 0;

  return (
    <>
      <Flex direction="column" gap="xs">
        <NumberInput
          allowDecimal
          label="Bench press (lbs)"
          placeholder="100"
          value={benchPress}
          onChange={setBenchPress}
          min={0}
        />
        <NumberInput
          allowDecimal
          label="Dead lift (lbs)"
          placeholder="100"
          value={deadLift}
          onChange={setDeadLift}
          min={0}
        />
        <NumberInput
          allowDecimal
          label="Overhead press (lbs)"
          placeholder="100"
          value={overheadPress}
          onChange={setOverheadPress}
          min={0}
        />
        <NumberInput
          allowDecimal
          label="Squat (lbs)"
          placeholder="100"
          value={squat}
          onChange={setSquat}
          min={0}
        />
        <div>
          <Button
            color="green"
            onClick={handleSave}
            mt="xs"
            disabled={!isValid}
          >
            Save
          </Button>
        </div>
      </Flex>
    </>
  );

  function handleSave() {
    if (isValid) {
      onSave(parsedValues);
    }
  }
}
