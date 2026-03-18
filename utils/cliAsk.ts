import readline from 'readline';

export type AskFn = (question: string) => Promise<string>;

export const createAsker = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask: AskFn = (question: string) =>
    new Promise((resolve) => rl.question(question, resolve));

  const close = () => rl.close();

  return { ask, close };
};

