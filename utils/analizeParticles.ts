export const analyzeParticles = (particleUvList: number[]) => {
  let deadParticleCount = 0;
  const csvInterval = Number(process.env.CSV_INTERVAL);
  const virusUvDose = Number(process.env.VIRUS_UV_DOSE);

  // エアロゾルのUV強さがウイルスのUV強さを超えたら死滅したエアロゾルとしてカウント
  particleUvList.forEach((UV) => {
    if (UV * csvInterval > virusUvDose) {
      deadParticleCount++;
    }
  });
  const result = {
    date: new Date().toISOString(),
    virus: process.env.VIRUS,
    particleCount: particleUvList.length,
    deadParticleRatio: (
      (deadParticleCount / particleUvList.length) *
      100
    ).toFixed(3),
    deadParticleCount: deadParticleCount,
    dischargedParticleCount: particleUvList.length - deadParticleCount,
  };

  console.log('ウイルス:', process.env.VIRUS);
  console.log('エアロゾルの総数：', particleUvList.length);
  console.log('死滅したエアロゾルの数：', deadParticleCount);
  console.log(
    '死滅したエアロゾルの数の割合：',
    ((deadParticleCount / particleUvList.length) * 100).toFixed(3),
    '%',
  );
  console.log('排気されたエアロゾルの数：');

  return result;
};
