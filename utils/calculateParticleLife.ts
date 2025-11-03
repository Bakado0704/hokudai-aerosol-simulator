import { AngleAndReceivedUvPower } from '@/types/Vector.types';
import * as fs from 'fs';
import * as path from 'path';

export const calculateParticleLife = (
  angleAndReceivedUvPowersList: AngleAndReceivedUvPower[][],
) => {
  const csvInterval = Number(process.env.CSV_INTERVAL);
  const virusUvDose = Number(process.env.VIRUS_UV_DOSE);

  let accumulateDamages: Record<string, number> = {};
  let averageParticleLife = virusUvDose;

  const result: { fileIndex: number; percentage: string }[] = [];
  const lastAngleAndReceivedUvPower =
    angleAndReceivedUvPowersList[angleAndReceivedUvPowersList.length - 1][
      angleAndReceivedUvPowersList[angleAndReceivedUvPowersList.length - 1]
        .length - 1
    ];
  const lastId = lastAngleAndReceivedUvPower.id;
  const virusCount = Number(lastId) + 1;

  for (let i = 0; i < virusCount; i++) {
    const id = String(i);
    accumulateDamages[id] = 0;
  }

  angleAndReceivedUvPowersList.forEach(
    (angleAndReceivedUvPowers, fileIndex) => {
      let livingParticleIndexArray: string[] = [];
      let accumulateDamage = 0;
      // 累積ダメージを計算する
      angleAndReceivedUvPowers.forEach((angleAndReceivedUvPower) => {
        const { id, angle, receivedUvPower } = angleAndReceivedUvPower;
        livingParticleIndexArray.push(id);

        accumulateDamages[id] = receivedUvPower * Math.cos(angle) * csvInterval;

        // 累積ダメージを超えたらaccmulateDamage[id]をmax値にする
        if (accumulateDamages[id] > virusUvDose) {
          accumulateDamages[id] = virusUvDose;
        }
      });

      // 欠損している粒子の累積ダメージを0にする
      const livingParticleCount = livingParticleIndexArray.length;
      const missingIndexes = Array.from({ length: virusCount }, (_, i) =>
        String(i + 1),
      ).filter((n) => !livingParticleIndexArray.includes(String(n)));
      missingIndexes.forEach((id) => {
        accumulateDamages[id] = 0;
      });

      // 累積ダメージを合計する
      Object.entries(accumulateDamages).forEach(([id, damage]) => {
        accumulateDamage += damage;
      });

      // 平均ダメージを計算する
      const averageDamage = accumulateDamage / livingParticleCount;
      averageParticleLife -= averageDamage;
      const percentage = ((averageParticleLife * 100) / virusUvDose).toFixed(3);

      result.push({ fileIndex, percentage });
      console.log(
        `${fileIndex}秒後の粒子の部屋に残っている粒子の平均体力: ${percentage}%`,
      );
      console.log(
        `${fileIndex}秒後の粒子の部屋に残っている粒子数: ${livingParticleCount}`,
      );
    },
  );

  const csvLines = result.map((item) => `${item.fileIndex},${item.percentage}`);
  const csvContent = csvLines.join('\n');
  const outPath = path.join(process.cwd(), 'result.csv');
  fs.writeFileSync(outPath, csvContent, 'utf8');
};
