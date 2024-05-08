import {
  Flex,
  Title,
  Center,
  Loader,
  Button,
  Modal,
  ActionIcon,
  Text,
  Textarea,
} from "@mantine/core";
import { useState } from "react";
import { IconPencil } from "@tabler/icons-react";

import { ExerciseCard } from "./ExerciseCard";
import { WorkingWeightForm } from "./WorkingWeightForm";
import { useCurrentWorkoutQuery } from "../hooks/useCurrentWorkoutQuery";
import { Exercise, allExercises } from "../types/Exercise";
import { useCreateWorkoutMutation } from "../hooks/useCreateWorkoutMutation";
import { useUpdateWorkoutMutation } from "../hooks/useUpdateWorkoutMutation";
import { CompletedExercise } from "./CompletedExercise";
import { Workout } from "../types/Workout";
import { calculateDeload } from "../utils/weightUtils";
import { useRepRecords } from "../hooks/useRepRecords";

export function CurrentWorkout() {
  const {
    isLoading: isLoadingWorkout,
    isError: failedToLoadWorkout,
    data: currentWorkout,
  } = useCurrentWorkoutQuery();

  const {
    isLoading: isLoadingRepRecords,
    isError: failedToLoadRepRecords,
    repRecords,
  } = useRepRecords();

  const { mutate: createWorkout } = useCreateWorkoutMutation();
  const { mutate: updateWorkout } = useUpdateWorkoutMutation();

  const [isEditWorkoutModalOpen, setIsEditWorkoutModalOpen] = useState(false);
  const [notes, setNotes] = useState(currentWorkout?.notes ?? "");
  const isLoading = isLoadingWorkout || isLoadingRepRecords;
  const isError = failedToLoadWorkout || failedToLoadRepRecords;

  // Sync notes from currentWorkout to input
  const [prevCurrentWorkout, setPrevCurrentWorkout] = useState(currentWorkout);
  if (currentWorkout !== prevCurrentWorkout) {
    setPrevCurrentWorkout(currentWorkout);
    setNotes(currentWorkout?.notes ?? "");
  }

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  } else if (isError || !repRecords) {
    return <Center>Failed to get workout</Center>;
  } else if (!currentWorkout) {
    return (
      <>
        <p>Add your current working weight for each exercise:</p>
        <WorkingWeightForm onSave={handleSaveInitialWorkingWeight} />
      </>
    );
  } else if (currentWorkout.completedTimestamp) {
    return (
      <>
        <Title order={3} mb="md">
          Workout complete
        </Title>
        <p>
          Click the button below to create the next workout or click "undo" on
          an exercise to correct any mistakes.
        </p>
        <Button color="green" mb="sm" onClick={handleCreateNextWorkout}>
          Create next workout
        </Button>
        {renderNotes()}
        {renderCompletedWorkouts()}
      </>
    );
  } else {
    return (
      <>
        <Flex align="center" justify="space-between">
          <Title order={3}>Current workout</Title>
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => setIsEditWorkoutModalOpen(true)}
          >
            <IconPencil />
          </ActionIcon>
        </Flex>
        <Text fz="sm" c="dimmed" mb="sm">
          Created on{" "}
          {new Date(currentWorkout.createdTimestamp).toLocaleString(undefined, {
            dateStyle: "long",
            timeStyle: "short",
          })}
        </Text>
        <Flex direction="column" gap="md" mb="sm">
          {allExercises.map((exercise) => {
            return (
              currentWorkout.lastSetReps[exercise] === null && (
                <ExerciseCard
                  key={exercise}
                  exercise={exercise}
                  workout={currentWorkout}
                  repRecords={repRecords}
                  onComplete={handleCompleteExercise}
                />
              )
            );
          })}
        </Flex>
        {renderNotes()}
        {renderCompletedWorkouts()}
        <Modal
          centered
          title="Edit current workout"
          opened={isEditWorkoutModalOpen}
          onClose={() => setIsEditWorkoutModalOpen(false)}
        >
          <WorkingWeightForm
            initialValues={currentWorkout?.workingWeight}
            onSave={handleUpdateWorkingWeight}
          />
        </Modal>
      </>
    );
  }

  function renderNotes() {
    return (
      <Textarea
        label="Notes"
        placeholder="Accessory lifts, feelings, etc."
        mb="lg"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        onBlur={handleNotesBlur}
      />
    );
  }

  function renderCompletedWorkouts() {
    if (!currentWorkout) {
      return null;
    }
    return (
      <>
        {isAnyExerciseComplete() && (
          <Title order={3} mb="md">
            Completed exercises
          </Title>
        )}
        <Flex direction="column" gap="lg">
          {allExercises.map((exercise) => {
            return (
              currentWorkout.lastSetReps[exercise] !== null && (
                <CompletedExercise
                  key={exercise}
                  exercise={exercise}
                  workout={currentWorkout}
                  onUndo={handleUndo}
                />
              )
            );
          })}
        </Flex>
      </>
    );
  }

  function handleSaveInitialWorkingWeight(workingWeight: {
    [keys in Exercise]: number;
  }) {
    createWorkout({ workingWeight });
  }

  function handleUpdateWorkingWeight(workingWeight: {
    [keys in Exercise]: number;
  }) {
    if (!currentWorkout) {
      return;
    }
    updateWorkout({ workout: { ...currentWorkout, workingWeight } });
    setIsEditWorkoutModalOpen(false);
  }

  function handleCompleteExercise(exercise: Exercise, lastSetReps: number) {
    if (!currentWorkout) {
      return;
    }
    const updates: Workout = {
      ...currentWorkout,
      lastSetReps: { ...currentWorkout.lastSetReps, [exercise]: lastSetReps },
    };
    const allCompleted = allExercises.every((exercise) => {
      return updates.lastSetReps[exercise] !== null;
    });
    if (allCompleted) {
      updates.completedTimestamp = Date.now();
    }
    updateWorkout({ workout: { ...updates } });
  }

  function handleNotesBlur() {
    if (!currentWorkout) {
      return;
    }
    const trimmedNotes = notes.trim();
    const notesUpdate = notes.trim().length > 0 ? trimmedNotes : null;
    updateWorkout({ workout: { ...currentWorkout, notes: notesUpdate } });
  }

  function handleUndo(exercise: Exercise) {
    if (!currentWorkout) {
      return;
    }
    updateWorkout({
      workout: {
        ...currentWorkout,
        completedTimestamp: null,
        lastSetReps: { ...currentWorkout.lastSetReps, [exercise]: null },
      },
    });
  }

  function handleCreateNextWorkout() {
    if (!currentWorkout || !repRecords) {
      return;
    }
    const newWorkingWeight = { ...currentWorkout.workingWeight };
    for (const exercise of allExercises) {
      const prevWorkingWeight = currentWorkout.workingWeight[exercise];
      const prevLastSetReps = currentWorkout.lastSetReps[exercise] || 0;

      if (prevLastSetReps >= 10) {
        if (exercise === "benchPress" || exercise === "overheadPress") {
          newWorkingWeight[exercise] += 5;
        } else {
          newWorkingWeight[exercise] += 10;
        }
      } else if (prevLastSetReps >= 5) {
        if (exercise === "benchPress" || exercise === "overheadPress") {
          newWorkingWeight[exercise] += 2.5;
        } else {
          newWorkingWeight[exercise] += 5;
        }
      } else {
        newWorkingWeight[exercise] = calculateDeload(prevWorkingWeight);
      }
    }
    createWorkout({ workingWeight: newWorkingWeight });
  }

  function isAnyExerciseComplete() {
    return (
      !!currentWorkout &&
      Object.values(currentWorkout.lastSetReps).some((reps) => !!reps)
    );
  }
}
