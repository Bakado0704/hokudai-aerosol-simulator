import { AngleAndUvPower, Vector } from '@/types/Vector.types';

import { calculateAngle } from './calculateAngle';
import { calculateUvPower } from './calculateUvPower';

export const getAngleAndUvPowers = (
  earosolPositionsPerFile: Vector[][],
): AngleAndUvPower[][] => {
  if (earosolPositionsPerFile.length === 0) return [];

  // 各ファイルごとの粒子データを格納
  const result: AngleAndUvPower[][] = earosolPositionsPerFile.map(
    (earosolPositions, uvVectorIndex) =>
      earosolPositions.map((earosolPosition) => ({
        angle: calculateAngle({ earosolPosition, uvVectorIndex }),
        uvPower: calculateUvPower({ earosolPosition, uvVectorIndex }),
      })),
  );

  return result;
};
