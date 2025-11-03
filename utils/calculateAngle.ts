import { ParticlePosition, Vector } from '@/types/Vector.types';

type CalculateAngleProps = {
  earosolPosition: ParticlePosition;
  fileIndex: number;
};

// UVの角度の計算式
export const calculateAngle = ({
  earosolPosition,
  fileIndex,
}: CalculateAngleProps): number => {
  const UVAngle: Vector = [1, 1, 1];
  const UVPosition: Vector = [0, 0, 0];

  const L: Vector = [
    earosolPosition.position.x - UVPosition[0],
    earosolPosition.position.y - UVPosition[1],
    earosolPosition.position.z - UVPosition[2],
  ];

  // 内積
  const dot = UVAngle[0] * L[0] + UVAngle[1] * L[1] + UVAngle[2] * L[2];

  // ベクトルの大きさ
  const lenA = Math.sqrt(UVAngle[0] ** 2 + UVAngle[1] ** 2 + UVAngle[2] ** 2);
  const lenL = Math.sqrt(L[0] ** 2 + L[1] ** 2 + L[2] ** 2);

  // 角度[rad]
  const theta = Math.acos(dot / (lenA * lenL));

  return theta;
};
