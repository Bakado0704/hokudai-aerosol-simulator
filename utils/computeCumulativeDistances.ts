import { Vector } from '@/types/Vector.types';

const euclidean = (a: Vector): number => {
  const dx = a[0];
  const dy = a[1];
  const dz = a[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

export const computeCumulativeDistances = (
  vectorsPerFile: Vector[][],
): {
  particleDistanceList: number[];
} => {
  if (vectorsPerFile.length === 0) return { particleDistanceList: [] };

  const particlesCount = vectorsPerFile[0].length;
  const particleDistanceList = new Array<number>(particlesCount).fill(0);
  vectorsPerFile.forEach((vectors) => {
    vectors.forEach((vector, index) => {
      particleDistanceList[index] += euclidean(vector);
    });
  });

  return { particleDistanceList };
};
