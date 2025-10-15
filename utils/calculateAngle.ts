import { Vector } from '@/types/Vector.types';

type CalculateAngleProps = {
  earosolPosition: Vector;
  uvVectorIndex: number;
};

// UVの角度の計算式
export const calculateAngle = ({
  earosolPosition,
  uvVectorIndex,
}: CalculateAngleProps): number => {
  const UVAngle: Vector = [1, 1, 1];
  const UVPosition: Vector = [0, 0, 0];

  const L: Vector = [
    earosolPosition[0] - UVPosition[0],
    earosolPosition[1] - UVPosition[1],
    earosolPosition[2] - UVPosition[2],
  ];

  // 内積
  const dot = UVAngle[0] * L[0] + UVAngle[1] * L[1] + UVAngle[2] * L[2];

  // ベクトルの大きさ
  const lenA = Math.sqrt(UVAngle[0] ** 2 + UVAngle[1] ** 2 + UVAngle[2] ** 2);
  const lenL = Math.sqrt(L[0] ** 2 + L[1] ** 2 + L[2] ** 2);

  // 角度[rad]
  const theta = Math.acos(dot / (lenA * lenL));

  // 角度[度]
  const degree = theta * (180 / Math.PI);

  return degree;
};
