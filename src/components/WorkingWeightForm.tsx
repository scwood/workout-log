import { Button, Input, Label } from "@fluentui/react-components";
import { useId, useState } from "react";
import styles from "./WorkingWeightForm.module.css";

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

  const benchId = useId();
  const pressId = useId();
  const squatId = useId();
  const deadLiftId = useId();

  return (
    <>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <Label htmlFor={benchId}>Bench press (lbs)</Label>
          <Input
            value={String(bench)}
            onChange={(event) => setBench(parseInt(event.target.value))}
            id={benchId}
            type="number"
            placeholder="135"
            min={0}
          />
        </div>
        <div className={styles.inputGroup}>
          <Label htmlFor={deadLiftId}>Dead lift (lbs)</Label>
          <Input
            value={String(deadLift)}
            onChange={(event) => setDeadLift(parseInt(event.target.value))}
            id={deadLiftId}
            type="number"
            placeholder="135"
            min={0}
          />
        </div>
        <div className={styles.inputGroup}>
          <Label htmlFor={pressId}>Overhead press (lbs)</Label>
          <Input
            value={String(press)}
            onChange={(event) => setPress(parseInt(event.target.value))}
            id={pressId}
            type="number"
            placeholder="135"
            min={0}
          />
        </div>
        <div className={styles.inputGroup}>
          <Label htmlFor={squatId}>Squat (lbs)</Label>
          <Input
            value={String(squat)}
            onChange={(event) => setSquat(parseInt(event.target.value))}
            id={squatId}
            type="number"
            placeholder="135"
            min={0}
          />
        </div>
        <div className={styles.saveButton}>
          <Button
            appearance="primary"
            onClick={() => onSave?.({ bench, press, squat, deadLift })}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
