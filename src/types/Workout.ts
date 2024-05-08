import { Exercise } from "./Exercise";

export interface Workout {
  id: string;
  userId: string;
  createdTimestamp: number;
  completedTimestamp: number | null;
  notes: string | null;
  workingWeight: {
    [key in Exercise]: number;
  };
  lastSetReps: {
    [key in Exercise]: number | null;
  };
}
