export type Vector = [number, number, number];
export type AngleAndReceivedUvPower = {
  id: string;
  angle: number;
  receivedUvPower: number;
};
export type ParticlePosition = {
  id: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
};
