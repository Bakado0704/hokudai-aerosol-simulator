import * as fs from 'fs';
import { ParticlePosition } from '@/types/Vector.types';

export const parseCsvPositions = ({
  filePath,
}: {
  filePath: string;
}): ParticlePosition[] => {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length <= 1) return [];

  const dataLines = lines.slice(1);
  const particlePositions: ParticlePosition[] = [];

  for (const line of dataLines) {
    const parts = line.split(',').map((s) => s.trim());

    const id = parts[1];
    const x = Number(parts[2]);
    const y = Number(parts[3]);
    const z = Number(parts[4]);
    const particlePosition: ParticlePosition = {
      id,
      position: {
        x,
        y,
        z,
      },
    };

    particlePositions.push(particlePosition);
  }

  return particlePositions;
};
