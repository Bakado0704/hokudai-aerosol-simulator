import { Vector } from '@/types/Vector.types';

// UVの強さの計算式、単位mW/cm²
const calculateUV = (a: Vector): number => {
  const dx = a[0];
  const dy = a[1];
  const dz = a[2];
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const uv = 0.014 / (distance * distance);
  return uv;
};

export const computeCumulativeDistances = (
  vectorsPerFile: Vector[][],
): number[] => {
  if (vectorsPerFile.length === 0) return [];

  const particlesCount = vectorsPerFile[0].length;
  const particleUvList = new Array<number>(particlesCount).fill(0);
  vectorsPerFile.forEach((vectors) => {
    vectors.forEach((vector, index) => {
      particleUvList[index] += calculateUV(vector);
    });
  });

  return particleUvList;
};
