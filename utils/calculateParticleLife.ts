import { AngleAndReceivedUvPower } from '@/types/Vector.types';
import * as fs from 'fs';
import * as path from 'path';

export const calculateParticleLife = (
  angleAndReceivedUvPowersList: AngleAndReceivedUvPower[][],
) => {
  const csvInterval = Number(process.env.CSV_INTERVAL);
  const virusUvDose = Number(process.env.VIRUS_UV_DOSE);

  let instantDamages: Record<string, number> = {};
  let averageParticleLife = virusUvDose;

  // 結果を保存する配列を作成
  const result: { fileIndex: number; percentage: string }[] = [];

  // 初期のRecord型の粒子のダメージ値のオブジェクトを作成(初期値は全て0)
  const lastAngleAndReceivedUvPower =
    angleAndReceivedUvPowersList[angleAndReceivedUvPowersList.length - 1][
      angleAndReceivedUvPowersList[angleAndReceivedUvPowersList.length - 1]
        .length - 1
    ];
  const lastId = lastAngleAndReceivedUvPower.id;
  const virusCount = Number(lastId) + 1;
  for (let i = 0; i < virusCount; i++) {
    const id = String(i);
    instantDamages[id] = 0;
  }

  angleAndReceivedUvPowersList.forEach(
    (angleAndReceivedUvPowers, fileIndex) => {
      let livingParticleIndexArray: string[] = [];
      let accumulateDamage = 0;
      // 累積ダメージを計算する
      angleAndReceivedUvPowers.forEach((angleAndReceivedUvPower) => {
        const { id, angle, receivedUvPower } = angleAndReceivedUvPower;
        livingParticleIndexArray.push(id);

        instantDamages[id] =
          receivedUvPower * Math.max(0, Math.cos(angle)) * csvInterval;

        // その瞬間におけるダメージは、最大値を超えることはない
        if (instantDamages[id] > virusUvDose) {
          instantDamages[id] = virusUvDose;
        }
      });

      // 欠損している粒子の累積ダメージを0にする
      let livingParticleCount = livingParticleIndexArray.length;
      const missingIndexes = Array.from({ length: virusCount }, (_, i) =>
        String(i),
      ).filter((id) => !livingParticleIndexArray.includes(id));

      // 欠損した粒子の扱い
      if (process.env.IS_DEAD_THRESHOLD === '0') {
        missingIndexes.forEach((id) => {
          // 排出された粒子は、カウント外とする
          instantDamages[id] = 0;
        });
      } else {
        missingIndexes.forEach((id) => {
          if (instantDamages[id] === virusUvDose || instantDamages[id] === 0) {
            // これ以前排出された粒子は、カウント外とする
            instantDamages[id] = 0;
          } else {
            // 最初に排出された粒子は、死んだとみなし、累積ダメージとして追加する
            livingParticleCount++;
            instantDamages[id] = virusUvDose;
          }
        });
      }

      // 累積ダメージを合計する
      Object.entries(instantDamages).forEach(([id, damage]) => {
        accumulateDamage += damage;
      });

      // 平均ダメージを計算する
      const averageDamage = accumulateDamage / livingParticleCount;
      averageParticleLife -= averageDamage;
      const percentage = ((averageParticleLife * 100) / virusUvDose).toFixed(3);

      // 結果を出力
      result.push({ fileIndex, percentage });
      console.log(
        `${fileIndex}秒後の粒子の部屋に残っている粒子の平均体力: ${percentage}%`,
      );
      console.log(
        `${fileIndex}秒後の粒子の部屋に残っている粒子数: ${livingParticleIndexArray.length}`,
      );
    },
  );

  const csvLines = result.map((item) => `${item.fileIndex},${item.percentage}`);
  const csvContent = csvLines.join('\n');
  const outPath = path.join(process.cwd(), 'result.csv');
  fs.writeFileSync(outPath, csvContent, 'utf8');
};
