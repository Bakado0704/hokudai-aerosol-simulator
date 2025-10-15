import { AngleAndUvPower, Vector } from '@/types/Vector.types';
import { calculateDeadParticleCount } from './calculateDeadParticleCount';
import { getDischargedParticleCount } from './getDischargedParticleCount';

type AnalyzeParticlesProps = {
  angleAndUvPowersList: AngleAndUvPower[][];
  lastEarosolPosition: Vector[];
};

export const analyzeParticles = ({
  angleAndUvPowersList,
  lastEarosolPosition,
}: AnalyzeParticlesProps) => {
  const totalParticleCount = angleAndUvPowersList[0].length;
  const deadParticleCount = calculateDeadParticleCount(angleAndUvPowersList);
  const deadParticleRatio = (
    (deadParticleCount / totalParticleCount) *
    100
  ).toFixed(3);
  const dischargedParticleCount =
    getDischargedParticleCount(lastEarosolPosition);

  const result = {
    date: new Date().toISOString(),
    virus: process.env.VIRUS,
    totalParticleCount,
    deadParticleCount,
    deadParticleRatio,
    dischargedParticleCount,
  };

  console.log('ウイルス:', process.env.VIRUS);
  console.log('エアロゾルの総数：', totalParticleCount);
  console.log('死滅したエアロゾルの数：', deadParticleCount);
  console.log('死滅したエアロゾルの数の割合：', deadParticleRatio, '%');
  console.log('排気されたエアロゾルの数：', dischargedParticleCount);

  return result;
};
