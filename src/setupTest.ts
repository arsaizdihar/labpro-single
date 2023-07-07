import { runSeed } from './drizzle/script/seed';

module.exports = async function () {
  await runSeed();
};
