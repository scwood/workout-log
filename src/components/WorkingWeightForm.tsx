import { Button, NumberInput, Flex } from "@mantine/core";
import { useState } from "react";

export interface WorkingWeight {
  bench: number;
  press: number;
  squat: number;
  deadLift: number;
}

export interface WorkingWeightFormProps {
  initialValues?: WorkingWeight;
  onSave?: (workingWeight: WorkingWeight) => void;
}

export function WorkingWeightForm(props: WorkingWeightFormProps) {
  const { initialValues, onSave } = props;
  const [bench, setBench] = useState(initialValues?.bench ?? 0);
  const [press, setPress] = useState(initialValues?.press ?? 0);
  const [squat, setSquat] = useState(initialValues?.squat ?? 0);
  const [deadLift, setDeadLift] = useState(initialValues?.deadLift ?? 0);

  return (
    <>
      <Flex direction="column" gap="xs">
        <NumberInput
          allowDecimal
          label="Bench press (lbs)"
          value={String(bench)}
          onChange={(value) => setBench(parseFloat(String(value)))}
          placeholder="135"
          min={0}
        />
        <NumberInput
          allowDecimal
          label="Dead lift (lbs)"
          value={String(deadLift)}
          onChange={(value) => setDeadLift(parseFloat(String(value)))}
          placeholder="135"
          min={0}
        />
        <NumberInput
          allowDecimal
          label="Overhead press (lbs)"
          value={String(press)}
          onChange={(value) => setPress(parseFloat(String(value)))}
          placeholder="135"
          min={0}
        />
        <NumberInput
          allowDecimal
          label="Squat (lbs)"
          value={String(squat)}
          onChange={(value) => setSquat(parseFloat(String(value)))}
          placeholder="135"
          min={0}
        />
        <div>
          <Button
            color="green"
            onClick={() => onSave?.({ bench, press, squat, deadLift })}
            mt="xs"
          >
            Save
          </Button>
        </div>
      </Flex>
    </>
  );
}
