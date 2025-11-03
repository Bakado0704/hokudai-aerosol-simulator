import * as fs from 'fs';
import * as path from 'path';

import { listParticleCsvFiles } from '@/utils/listParticleFiles';
import { parseCsvPositions } from '@/utils/parseCsvPositions';
import { getAngleAndReceivedUvPowerPerFile } from '@/utils/getAngleAndReceivedUvPowerPerFile';
import { calculateParticleLife } from '@/utils/calculateParticleLife';

const main = () => {
  const dir = __dirname;
  const allCsvPaths = listParticleCsvFiles({ directoryPath: dir });
  const earosolPositionsPerFile = allCsvPaths.map((path) =>
    parseCsvPositions({ filePath: path }),
  );
  const angleAndReceivedUvPowerPerFile = getAngleAndReceivedUvPowerPerFile(
    earosolPositionsPerFile,
  );
  calculateParticleLife(angleAndReceivedUvPowerPerFile);
};

main();
