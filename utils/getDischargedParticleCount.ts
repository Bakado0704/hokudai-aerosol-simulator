import { Vector } from '@/types/Vector.types';

export const getDischargedParticleCount = (
  lastEarosolPosition: Vector[],
): number => {
  let count = 0;

  lastEarosolPosition.forEach(([x, y, z]) => {
    const isInside = x >= 2.3 && x <= 2.7 && y >= 1.3 && y <= 1.7 && z >= 2.29;

    if (isInside) count++;
  });

  return count;
};
