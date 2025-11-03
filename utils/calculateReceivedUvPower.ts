import { ParticlePosition, Vector } from '@/types/Vector.types';

// UVの強さの計算式、単位mW/cm²
export const calculateReceivedUvPower = ({
  earosolPosition,
  fileIndex,
}: {
  earosolPosition: ParticlePosition;
  fileIndex: number;
}): number => {
  const dx = earosolPosition.position.x;
  const dy = earosolPosition.position.y;
  const dz = earosolPosition.position.z;
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const receivedUvPower = 0.014 / (distance * distance);
  return receivedUvPower;
};
