import * as fs from 'fs';
import * as path from 'path';

import { listParticleCsvFiles } from '@/utils/listParticleFiles';
import { parseCsvPositions } from '@/utils/parseCsvPositions';
import { computeCumulativeDistances } from '@/utils/computeCumulativeDistances';
import { analyzeParticles } from '@/utils/analizeParticles';

const main = () => {
  const dir = __dirname;
  const allCsvPaths = listParticleCsvFiles({ directoryPath: dir });
  const positionsPerFile = allCsvPaths.map((path) =>
    parseCsvPositions({ filePath: path }),
  );
  const particleUvList = computeCumulativeDistances(positionsPerFile);
  const result = analyzeParticles(particleUvList);
  const outPath = path.join(dir, 'result.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
};

main();
