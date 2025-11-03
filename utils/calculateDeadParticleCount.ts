import { AngleAndReceivedUvPower } from '@/types/Vector.types';

export const calculateDeadParticleCount = (
  angleAndUvPowersList: AngleAndReceivedUvPower[][],
) => {
  const csvInterval = Number(process.env.CSV_INTERVAL);
  const virusUvDose = Number(process.env.VIRUS_UV_DOSE);

  let deadParticleCount = 0;

  const totalUvPower = new Array(angleAndUvPowersList[0].length).fill(0);
  angleAndUvPowersList.forEach((angleAndUvPowers) => {
    angleAndUvPowers.forEach((angleAndUvPower, index) => {
      const { angle, receivedUvPower } = angleAndUvPower;
      if (angle < 32 || angle > 148) {
        totalUvPower[index] += receivedUvPower;
      }
    });
  });

  totalUvPower.forEach((uvPower) => {
    if (uvPower * csvInterval > virusUvDose) {
      deadParticleCount++;
    }
  });

  return deadParticleCount;
};
