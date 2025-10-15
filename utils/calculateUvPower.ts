import { Vector } from '@/types/Vector.types';

// UVの強さの計算式、単位mW/cm²
export const calculateUvPower = ({
  earosolPosition,
  uvVectorIndex,
}: {
  earosolPosition: Vector;
  uvVectorIndex: number;
}): number => {
  const dx = earosolPosition[0];
  const dy = earosolPosition[1];
  const dz = earosolPosition[2];
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const uv = 0.014 / (distance * distance);
  return uv;
};
