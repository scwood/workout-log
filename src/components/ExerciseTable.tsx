import {
  Table,
  Title,
  Text,
  Button,
  Modal,
  NumberInput,
  Card,
} from "@mantine/core";

import {
  calculatePlates,
  calculateWarmupPlates,
  calculateWarmupWeight,
} from "../utils/weightUtils";
import { Exercise, exerciseDisplayNames } from "../types/Exercise";
import { useState } from "react";
import { Workout } from "../types/Workout";
import { RepRecords } from "../hooks/useRepRecords";

export interface ExerciseProps {
  exercise: Exercise;
  workout: Workout;
  repRecords: RepRecords;
  onComplete: (exercise: Exercise, lastSetReps: number) => void;
}

export function ExerciseTable(props: ExerciseProps) {
  const { exercise, workout, repRecords, onComplete } = props;
  const [isLastSetModalOpen, setIsLastSetModalOpen] = useState(false);

  const [lastSetRepsInput, setLastSetRepsInput] = useState<string | number>("");
  const lastSetReps = parseInt(String(lastSetRepsInput));
  const isSaveDisabled = isNaN(lastSetReps) || lastSetReps === 0;

  const displayName = exerciseDisplayNames[exercise];
  const workingWeight = workout.workingWeight[exercise];

  return (
    <Card withBorder shadow="sm">
      <Card.Section inheritPadding withBorder py="sm" mb={6}>
        <Title order={4}>{displayName}</Title>
      </Card.Section>
      <Card.Section withBorder inheritPadding mb="xs">
        <Table mb="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Reps</Table.Th>
              <Table.Th>Weight (lb)</Table.Th>
              <Table.Th>Plates (lb)</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>4</Table.Td>
              <Table.Td>{calculateWarmupWeight(workingWeight, 0.55)}</Table.Td>
              <Table.Td>{calculateWarmupPlates(workingWeight, 0.55)}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>3</Table.Td>
              <Table.Td>{calculateWarmupWeight(workingWeight, 0.7)}</Table.Td>
              <Table.Td>{calculateWarmupPlates(workingWeight, 0.7)}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>2</Table.Td>
              <Table.Td>{calculateWarmupWeight(workingWeight, 0.85)}</Table.Td>
              <Table.Td>{calculateWarmupPlates(workingWeight, 0.85)}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                {exercise === "deadLift" ? "1x5+" : "2x5, 1x5+"}
              </Table.Td>
              <Table.Td>{workingWeight}</Table.Td>
              <Table.Td>{calculatePlates(workingWeight)}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Card.Section>
      <Text c="dimmed" fz="sm" mb="xs">
        Current rep record at this weight:{" "}
        {repRecords[exercise][workingWeight] || "N/A"}
      </Text>
      <Button
        size="xs"
        color="green"
        onClick={() => setIsLastSetModalOpen(true)}
      >
        Complete
      </Button>
      <Modal
        centered
        title={displayName}
        opened={isLastSetModalOpen}
        onClose={() => setIsLastSetModalOpen(false)}
      >
        <NumberInput
          data-autofocus
          min={0}
          value={lastSetRepsInput}
          onChange={setLastSetRepsInput}
          allowDecimal={false}
          label="How many reps did you do on the last set?"
        />
        <Button
          color="green"
          disabled={isSaveDisabled}
          onClick={handleSave}
          mt="xs"
        >
          Save
        </Button>
      </Modal>
    </Card>
  );

  function handleSave() {
    onComplete(exercise, lastSetReps);
    setIsLastSetModalOpen(false);
  }
}
