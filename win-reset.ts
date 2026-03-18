process.env.VIRUS = '';
process.env.VIRUS_UV_DOSE = '';
process.env.CSV_INTERVAL = '';
process.env.IS_DEAD_THRESHOLD = '';

console.log('環境変数のリセット完了しました');
console.log(`VIRUS=${process.env.VIRUS}`);
console.log(`VIRUS_UV_DOSE=${process.env.VIRUS_UV_DOSE} mW/cm²`);
console.log(`CSV_INTERVAL=${process.env.CSV_INTERVAL}`);
console.log(`IS_DEAD_THRESHOLD=${process.env.IS_DEAD_THRESHOLD}`);