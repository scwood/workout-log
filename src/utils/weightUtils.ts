const weightOfBar = 45;
const plates = [45, 25, 10, 5, 2.5, 1.25];

export function calculatePlates(weight: number): string {
  const result = [];
  const weightMinusBar = weight - weightOfBar;
  const weightOfOneSide = weightMinusBar / 2;
  let remainingWeight = weightOfOneSide;

  for (let i = 0; i < plates.length; i++) {
    const plate = plates[i];
    const remainder = remainingWeight % plate;
    const numberOfPlates = (remainingWeight - remainder) / plate;
    for (let j = 0; j < numberOfPlates; j++) {
      result.push(plate);
    }
    if (numberOfPlates > 0) {
      remainingWeight = remainder;
    }
  }

  return result.join(", ");
}

export function calculateWarmupWeight(
  workingWeight: number,
  percentage: number
): number {
  return Math.max(weightOfBar, round5(workingWeight * percentage));
}

export function calculateWarmupPlates(
  workingWeight: number,
  percentage: number
): string {
  const weight = Math.max(45, round5(workingWeight * percentage));
  return calculatePlates(weight);
}

export function calculateDeload(weight: number): number {
  const unrounded = weight * 0.9;
  return unrounded - (unrounded % 5);
}

function round5(n: number): number {
  return Math.ceil(n / 5) * 5;
}
