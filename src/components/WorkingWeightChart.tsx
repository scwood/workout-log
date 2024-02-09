import { useMantineTheme } from "@mantine/core";
import { Grid, Axis, XYChart, LineSeries } from "@visx/xychart";

import { Workout } from "../types/Workout";
import { allExercises } from "../types/Exercise";

export interface WorkingWeightCharProps {
  workouts: Workout[];
}

export function WorkingWeightChart(props: WorkingWeightCharProps) {
  const { workouts } = props;
  const theme = useMantineTheme();
  const completedWorkouts = workouts.filter((workout) => {
    return workout.completedTimestamp;
  });

  return (
    <>
      <XYChart
        margin={{ top: 20, bottom: 70, left: 50, right: 20 }}
        height={320}
        xScale={{ type: "time" }}
        yScale={{ type: "linear" }}
      >
        <Axis
          tickStroke={theme.colors.gray[8]}
          hideAxisLine
          orientation="left"
          label="Weight (lb)"
          tickLabelProps={{
            fill: theme.colors.dark[0],
          }}
          labelProps={{
            fill: theme.colors.dark[0],
            dx: -22,
            fontSize: 12,
            fontWeight: 600,
          }}
        />
        <Axis
          numTicks={5}
          tickTransform=""
          orientation="bottom"
          tickStroke={theme.colors.gray[8]}
          label="Date"
          tickLabelProps={{
            fill: theme.colors.dark[0],
            angle: -70,
            dy: 12,
          }}
          labelProps={{
            fill: theme.colors.dark[0],
            fontSize: 12,
            fontWeight: 600,
            dy: 20,
          }}
        />
        <Grid lineStyle={{ stroke: theme.colors.gray[8] }} strokeWidth="1px" />
        {allExercises.map((exercise) => {
          const data = completedWorkouts.map((workout) => {
            return {
              x: new Date(workout.completedTimestamp || 0),
              y: workout.workingWeight[exercise],
            };
          });
          return (
            <LineSeries
              key={exercise}
              dataKey={exercise}
              data={data}
              xAccessor={(data) => data.x}
              yAccessor={(data) => data.y}
            />
          );
        })}
      </XYChart>
    </>
  );
}
