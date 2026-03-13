import { ParticlePosition, Vector } from '@/types/Vector.types';
import { calculateUvAngleAndPosition } from './calculateUvAngleAndPosition';

// UVの強さの計算式、単位mW/cm²
export const calculateReceivedUvPower = ({
  earosolPosition,
  fileIndex,
}: {
  earosolPosition: ParticlePosition;
  fileIndex: number;
}): number => {
  const { UvPosition } = calculateUvAngleAndPosition(fileIndex);

  const dx = earosolPosition.position.x - UvPosition[0];
  const dy = earosolPosition.position.y - UvPosition[1];
  const dz = earosolPosition.position.z - UvPosition[2];
  const receivedUvPower = 0.014 / (dx * dx + dy * dy + dz * dz);

  return receivedUvPower;
};
