export interface ExerciseProps {
  name: string;
  onComplete: (lastSetReps: number) => void;
}

export function Exercise(props: ExerciseProps) {
  return <div></div>;
}
