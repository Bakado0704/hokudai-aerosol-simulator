import {
  AngleAndReceivedUvPower,
  ParticlePosition,
  Vector,
} from '@/types/Vector.types';

import { calculateAngle } from './calculateAngle';
import { calculateReceivedUvPower } from './calculateReceivedUvPower';

export const getAngleAndReceivedUvPowerPerFile = (
  earosolPositionsPerFile: ParticlePosition[][],
): AngleAndReceivedUvPower[][] => {
  if (earosolPositionsPerFile.length === 0) return [];

  const result: AngleAndReceivedUvPower[][] = earosolPositionsPerFile.map(
    (earosolPositions, fileIndex) =>
      earosolPositions.map((earosolPosition) => ({
        id: earosolPosition.id,
        angle: calculateAngle({ earosolPosition, fileIndex }),
        receivedUvPower: calculateReceivedUvPower({
          earosolPosition,
          fileIndex,
        }),
      })),
  );

  return result;
};
