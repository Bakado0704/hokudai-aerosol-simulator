import { ParticlePosition, Vector } from '@/types/Vector.types';

export const getDischargedParticleCount = (
  lastEarosolPosition: ParticlePosition[],
): number => {
  let count = 0;

  lastEarosolPosition.forEach((particlePosition) => {
    const { x, y, z } = particlePosition.position;
    const isInside = x >= 2.3 && x <= 2.7 && y >= 1.3 && y <= 1.7 && z >= 2.29;

    if (isInside) count++;
  });

  return count;
};
