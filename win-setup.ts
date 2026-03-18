import { createAsker } from './utils/cliAsk';

(async () => {
  const { ask, close } = createAsker();

  console.log('');
  console.log('どのウイルスで実行しますか？');
  console.log('1) 新型コロナウイルス');
  console.log('2) ヒトコロナウイルス');
  console.log('3) インフルエンザウイルス');
  console.log('4) アオカビ');
  console.log('5) カンピロバクター');
  console.log('6) 大腸菌O157');

  const choice = await ask('番号を入力（デフォルトは1）: ');

  let VIRUS = '新型コロナウイルス';
  let VIRUS_UV_DOSE = '3';

  if (choice === '2') {
    VIRUS = 'ヒトコロナウイルス';
    VIRUS_UV_DOSE = '1.3';
  } else if (choice === '3') {
    VIRUS = 'インフルエンザウイルス';
    VIRUS_UV_DOSE = '6';
  } else if (choice === '4') {
    VIRUS = 'アオカビ';
    VIRUS_UV_DOSE = '50';
  } else if (choice === '5') {
    VIRUS = 'カンピロバクター';
    VIRUS_UV_DOSE = '4';
  } else if (choice === '6') {
    VIRUS = '大腸菌O157';
    VIRUS_UV_DOSE = '9';
  }

  const csvInterval = await ask('CSVは何秒間隔で出力されていますか？: ');
  const isDead = await ask('排気粒子を死と判定？ Yes=1 No=0: ');

  process.env.VIRUS = VIRUS;
  process.env.VIRUS_UV_DOSE = VIRUS_UV_DOSE;
  process.env.CSV_INTERVAL = csvInterval;
  process.env.IS_DEAD_THRESHOLD = isDead;

  console.log('\n✅ 環境変数が設定されました');
  console.log(`VIRUS=${process.env.VIRUS}`);
  console.log(`VIRUS_UV_DOSE=${process.env.VIRUS_UV_DOSE} mW/cm²`);
  console.log(`CSV_INTERVAL=${process.env.CSV_INTERVAL}`);
  console.log(`IS_DEAD_THRESHOLD=${process.env.IS_DEAD_THRESHOLD}`);

  close();
})();
