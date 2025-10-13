import * as fs from 'fs';
import * as path from 'path';

import { listParticleCsvFiles } from '@/utils/listParticleFiles';
import { parseCsvPositions } from '@/utils/parseCsvPositions';
import { computeCumulativeDistances } from '@/utils/computeCumulativeDistances';

const main = () => {
  const dir = __dirname;
  const allCsvPaths = listParticleCsvFiles({ directoryPath: dir });
  const positionsPerFile = allCsvPaths.map((path) =>
    parseCsvPositions({ filePath: path }),
  );
  const { particleDistanceList } = computeCumulativeDistances(positionsPerFile);

  const result = {
    perParticle: particleDistanceList.map((d, idx) => ({
      id: idx,
      distance: d,
    })),
  };

  const outPath = path.join(dir, 'distance_sum.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
};

main();
