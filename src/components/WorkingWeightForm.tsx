import { Button, NumberInput, Flex } from "@mantine/core";
import { useState } from "react";

import { Exercise } from "../types/Exercise";

export interface WorkingWeightFormProps {
  initialValues?: { [key in Exercise]: number };
  onSave: (workingWeight: { [key in Exercise]: number }) => void;
}

export function WorkingWeightForm(props: WorkingWeightFormProps) {
  const { initialValues, onSave } = props;
  const [benchPress, setBenchPress] = useState(initialValues?.benchPress ?? 0);
  const [overheadPress, setOverheadPress] = useState(
    initialValues?.overheadPress ?? 0
  );
  const [squat, setSquat] = useState(initialValues?.squat ?? 0);
  const [deadLift, setDeadLift] = useState(initialValues?.deadLift ?? 0);
  const isValid =
    benchPress > 0 && overheadPress > 0 && squat > 0 && deadLift > 0;

  return (
    <>
      <Flex direction="column" gap="xs">
        <NumberInput
          allowDecimal
          label="Bench press (lbs)"
          value={String(benchPress)}
          onChange={(value) => setBenchPress(parseFloat(String(value)))}
          min={0}
        />
        <NumberInput
          allowDecimal
          label="Dead lift (lbs)"
          value={String(deadLift)}
          onChange={(value) => setDeadLift(parseFloat(String(value)))}
          min={0}
        />
        <NumberInput
          allowDecimal
          label="Overhead press (lbs)"
          value={String(overheadPress)}
          onChange={(value) => setOverheadPress(parseFloat(String(value)))}
          min={0}
        />
        <NumberInput
          allowDecimal
          label="Squat (lbs)"
          value={String(squat)}
          onChange={(value) => setSquat(parseFloat(String(value)))}
          min={0}
        />
        <div>
          <Button
            color="green"
            onClick={() =>
              onSave({ benchPress, overheadPress, squat, deadLift })
            }
            mt="xs"
            disabled={!isValid}
          >
            Save
          </Button>
        </div>
      </Flex>
    </>
  );
}
