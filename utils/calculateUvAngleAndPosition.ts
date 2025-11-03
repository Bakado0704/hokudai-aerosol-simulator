import * as fs from 'fs';
import * as path from 'path';

import { Vector } from '@/types/Vector.types';

export const calculateUvAngleAndPosition = (fileIndex: number) => {
  const utilsDir = __dirname;
  const uvLightCsvPath = path.join(utilsDir, 'UvLight.csv');

  if (!fs.existsSync(uvLightCsvPath)) {
    throw new Error(`UvLight.csv not found in ${utilsDir}`);
  }

  const uvLightCsv = fs.readFileSync(uvLightCsvPath, 'utf8');
  const uvLightCsvLines = uvLightCsv.split('\n');
  const lastTimeStep = Number(
    uvLightCsvLines[uvLightCsvLines.length - 1].split(',')[0],
  );
  const referenceTimeStep = fileIndex % lastTimeStep;
  const uvLightCsvData = uvLightCsvLines[referenceTimeStep + 1].split(',');

  const UvPosition: Vector = [
    Number(uvLightCsvData[1]),
    Number(uvLightCsvData[2]),
    Number(uvLightCsvData[3]),
  ];
  const UvAngle: Vector = [
    Number(uvLightCsvData[4]),
    Number(uvLightCsvData[5]),
    Number(uvLightCsvData[6]),
  ];
  console.log(`計算中: ${fileIndex}秒後のUVの角度と位置`);

  return { UvAngle, UvPosition };
};
