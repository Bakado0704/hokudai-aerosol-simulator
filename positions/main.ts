import * as fs from 'fs';
import * as path from 'path';

import { listParticleCsvFiles } from '@/utils/listParticleFiles';
import { parseCsvPositions } from '@/utils/parseCsvPositions';
import { analyzeParticles } from '@/utils/analizeParticles';
import { getAngleAndUvPowers } from '@/utils/getAngleAndDistancesPerFile';

const main = () => {
  const dir = __dirname;
  const allCsvPaths = listParticleCsvFiles({ directoryPath: dir });
  const earosolPositionsPerFile = allCsvPaths.map((path) =>
    parseCsvPositions({ filePath: path }),
  );
  const lastEarosolPosition =
    earosolPositionsPerFile[earosolPositionsPerFile.length - 1];
  const angleAndUvPowersList = getAngleAndUvPowers(earosolPositionsPerFile);
  const result = analyzeParticles({ angleAndUvPowersList, lastEarosolPosition });
  const outPath = path.join(dir, 'result.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
};

main();
