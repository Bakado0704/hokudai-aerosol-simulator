import { AngleAndReceivedUvPower } from '@/types/Vector.types';
import * as fs from 'fs';
import * as path from 'path';

export const calculateParticleLife = (
  angleAndReceivedUvPowersList: AngleAndReceivedUvPower[][],
) => {
  // 結果を保存する配列を作成
  const result: {
    fileIndex: number;
    percentage: string;
    livingParticleIndexArray: number;
  }[] = [];
  const csvInterval = Number(process.env.CSV_INTERVAL);
  const virusUvDose = Number(process.env.VIRUS_UV_DOSE);

  // 初期のRecord型の粒子のダメージ値のオブジェクトを作成(初期値は全て0)
  let accumulateDamages: Record<string, number> = {};
  const lastAngleAndReceivedUvPower =
    angleAndReceivedUvPowersList[0][angleAndReceivedUvPowersList[0].length - 1];
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

        accumulateDamages[id] +=
          receivedUvPower * Math.max(0, Math.cos(angle)) * csvInterval;

        // その瞬間におけるダメージは、最大値を超えることはない
        if (accumulateDamages[id] > virusUvDose) {
          accumulateDamages[id] = virusUvDose;
        }
      });

      // 欠損した粒子の扱い
      const missingIndexes = Array.from({ length: virusCount }, (_, i) =>
        String(i),
      ).filter((id) => !livingParticleIndexArray.includes(id));
      missingIndexes.forEach((id) => {
        if (process.env.IS_DEAD_THRESHOLD === '0') {
          // 排出された粒子は、カウント外とする
          accumulateDamages[id] = 0;
        } else {
          // 排出された粒子は、死んだとみなし、累積ダメージとして追加する
          accumulateDamages[id] = virusUvDose;
        }
      });

      // 累積ダメージを合計する
      Object.entries(accumulateDamages).forEach(([id, damage]) => {
        if (damage === null) return;
        accumulateDamage += damage;
      });

      // ダメージを計算する
      const initialParticleLife = virusUvDose * virusCount;
      const remainingParticleLife =
        virusUvDose * livingParticleIndexArray.length;
      let percentage = 0;
      if (process.env.IS_DEAD_THRESHOLD === '0') {
        // 排出された粒子は、カウント外とする
        percentage =
          ((remainingParticleLife - accumulateDamage) * 100) /
          remainingParticleLife;
      } else {
        // 排出された粒子は、死んだとみなし、累積ダメージとして追加する
        percentage =
          ((initialParticleLife - accumulateDamage) * 100) /
          initialParticleLife;
      }

      // 結果を出力
      result.push({
        fileIndex,
        percentage: percentage.toFixed(3),
        livingParticleIndexArray: livingParticleIndexArray.length,
      });
      console.log(
        `${fileIndex}秒後の粒子の部屋に残っている粒子の平均体力: ${percentage}%`,
      );
      console.log(
        `${fileIndex}秒後の粒子の部屋に残っている粒子数: ${livingParticleIndexArray.length}`,
      );
    },
  );

  const csvLines = result.map(
    (item) =>
      `${item.fileIndex},${item.percentage},${item.livingParticleIndexArray}`,
  );
  const csvContent = csvLines.join('\n');
  const outPath = path.join(process.cwd(), 'result.csv');
  fs.writeFileSync(outPath, csvContent, 'utf8');
};
