export const allExercises = [
  "benchPress",
  "deadLift",
  "overheadPress",
  "squat",
] as const;

export const exerciseDisplayNames: { [key in Exercise]: string } = {
  benchPress: "Bench press",
  deadLift: "Dead lift",
  overheadPress: "Overhead press",
  squat: "Squat",
};

export type Exercise = (typeof allExercises)[number];
