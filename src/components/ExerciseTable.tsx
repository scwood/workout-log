import { Table, Title, Text, Button } from "@mantine/core";

import {
  calculatePlates,
  calculateWarmupPlates,
  calculateWarmupWeight,
} from "../utils/weightUtils";

export interface ExerciseProps {
  name: string;
  workingWeight: number;
  currentRepRecord: number;
  lastSetRepScheme?: string;
  onComplete: (lastSetReps: number) => void;
}

export function ExerciseTable(props: ExerciseProps) {
  const {
    name,
    workingWeight,
    currentRepRecord,
    lastSetRepScheme,
    onComplete,
  } = props;

  return (
    <div>
      <Title order={4}>{name}</Title>
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
              {lastSetRepScheme ? lastSetRepScheme : "2x5, 1x5+"}
            </Table.Td>
            <Table.Td>{workingWeight}</Table.Td>
            <Table.Td>{calculatePlates(workingWeight)}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      {!!currentRepRecord && (
        <Text c="dimmed" fz="sm" mb="xs">
          Last set rep record at this weight: {currentRepRecord}
        </Text>
      )}
      <Button size="xs" color="green" onClick={() => onComplete(0)}>
        Complete
      </Button>
    </div>
  );
}
