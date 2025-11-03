import { ParticlePosition, Vector } from '@/types/Vector.types';
import { calculateUvAngleAndPosition } from './calculateUvAngleAndPosition';

type CalculateAngleProps = {
  earosolPosition: ParticlePosition;
  fileIndex: number;
};

// UVの角度の計算式
export const calculateAngle = ({
  earosolPosition,
  fileIndex,
}: CalculateAngleProps): number => {
  const { UvAngle, UvPosition } = calculateUvAngleAndPosition(fileIndex);
  const L: Vector = [
    earosolPosition.position.x - UvPosition[0],
    earosolPosition.position.y - UvPosition[1],
    earosolPosition.position.z - UvPosition[2],
  ];

  // 内積
  const dot = UvAngle[0] * L[0] + UvAngle[1] * L[1] + UvAngle[2] * L[2];

  // ベクトルの大きさ
  const lenA = Math.sqrt(UvAngle[0] ** 2 + UvAngle[1] ** 2 + UvAngle[2] ** 2);
  const lenL = Math.sqrt(L[0] ** 2 + L[1] ** 2 + L[2] ** 2);

  // 角度[rad]
  const theta = Math.acos(dot / (lenA * lenL));

  return theta;
};
