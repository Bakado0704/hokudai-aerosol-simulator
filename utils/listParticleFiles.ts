import * as fs from 'fs';
import * as path from 'path';

export function listParticleCsvFiles({
  directoryPath,
}: {
  directoryPath: string;
}): string[] {
  const fileNames = fs
    .readdirSync(directoryPath)
    .filter((fileName: string) => /^particle_\d+\.csv$/.test(fileName))
    .sort((fileA: string, fileB: string) => {
      const matchA = fileA.match(/particle_(\d+)\.csv/);
      const matchB = fileB.match(/particle_(\d+)\.csv/);
      const numA = matchA ? parseInt(matchA[1], 10) : 0;
      const numB = matchB ? parseInt(matchB[1], 10) : 0;
      return numA - numB;
    });

  const allPaths = fileNames.map((fileName: string) =>
    path.join(directoryPath, fileName),
  );

  return allPaths;
}
