import { useMantineTheme } from "@mantine/core";
import {
  Grid,
  Axis,
  XYChart,
  LineSeries,
  DataProvider,
  DataContext,
} from "@visx/xychart";
import { LegendOrdinal } from "@visx/legend";

import { Workout } from "../types/Workout";
import {
  Exercise,
  allExercises,
  exerciseDisplayNames,
} from "../types/Exercise";
import { useContext } from "react";

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
    <DataProvider xScale={{ type: "time" }} yScale={{ type: "linear" }}>
      <XYChart
        margin={{ top: 20, bottom: 58, left: 50, right: 20 }}
        height={320}
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
            dy: 12,
          }}
          tickFormat={(value: Date) => {
            return value.toLocaleDateString(undefined, { dateStyle: "short" });
          }}
          labelProps={{
            fill: theme.colors.dark[0],
            fontSize: 12,
            fontWeight: 600,
            dy: 10,
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
              xAccessor={(data) => data?.x}
              yAccessor={(data) => data?.y}
            />
          );
        })}
      </XYChart>
      <ChartLegend />
    </DataProvider>
  );
}

function ChartLegend() {
  const { colorScale } = useContext(DataContext);

  if (!colorScale) {
    return null;
  }

  return (
    <LegendOrdinal
      direction="row"
      scale={colorScale}
      itemMargin="0px 12px 0px 0px"
      legendLabelProps={{ style: { fontSize: 12 } }}
      labelFormat={(item) => {
        return exerciseDisplayNames[item as Exercise];
      }}
    />
  );
}
