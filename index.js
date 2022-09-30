import ethers from "ethers";
import Decimal from "decimal.js";
import * as dotenv from "dotenv";

import dividerAbi from "./abis/Divider.js";
import tokenAbi from "./abis/Token.js";

dotenv.config();

const DIVIDER_ADDRESS = "0x86bA3E96Be68563E41c2f5769F1AF9fAf758e6E0";

async function main(adapterAddress, startBlock = 0, endBlock = Infinity) {
  // Validate address
  adapterAddress = ethers.utils.getAddress(adapterAddress);

  const provider = new ethers.providers.AlchemyProvider("homestead", process.env.ALCHEMY_KEY);
  const divider = new ethers.Contract(DIVIDER_ADDRESS, dividerAbi, provider);

  const logs = await divider
    .queryFilter(divider.filters.SeriesInitialized(null, null, null, null, null, null))
    .then((logs) => logs.map((log) => divider.interface.parseLog(log).args));

  const series = logs.filter((log) => log.adapter === adapterAddress);

  const ytTokens = series.map((s) => new ethers.Contract(s.yt, tokenAbi, provider));

  const aggregatedTransfers = await Promise.all(
    ytTokens.map((yt) => yt.queryFilter(yt.filters.Transfer(null, null, null)))
  ).then((t) =>
    t
      .flat()
      .sort((a, b) => a.blockNumber - b.blockNumber) // sort ASC
      .map((t) => ({ ...t.args, amount: new Decimal(t.args.amount.toString()), block: t.blockNumber }))
  );

  const scores = {};
  for (const { from, to, amount, block } of aggregatedTransfers) {
    if (to !== ethers.constants.AddressZero) {
      if (scores[to]) {
        const { prevCheckpoint, score } = scores[to];
        scores[to].score = score.plus(prevCheckpoint.amount.times(block - prevCheckpoint.block));
        scores[to].prevCheckpoint = { amount: prevCheckpoint.amount.plus(amount), block };
      } else {
        scores[to] = { score: new Decimal(0), prevCheckpoint: { amount, block } };
      }
    }

    if (scores[from] && from !== ethers.constants.AddressZero) {
      const { prevCheckpoint, score } = scores[from];
      scores[from].score = score.plus(prevCheckpoint.amount.times(block - prevCheckpoint.block));
      scores[from].prevCheckpoint = { amount: prevCheckpoint.amount.minus(amount), block };
    }
  }

  // Accrue scores up to min(currentBlock, endBlock)
  const currentBlock = await provider.getBlockNumber();
  endBlock = currentBlock < endBlock ? currentBlock : endBlock;
  for (const [user, { score, prevCheckpoint }] of Object.entries(scores)) {
    scores[user].score = score.plus(prevCheckpoint.amount.times(endBlock - prevCheckpoint.block));
    scores[user].prevCheckpoint.block = endBlock;
  }

  const toalScore = Object.values(scores).reduce((acc, { score }) => acc.plus(score), new Decimal(0));

  const rights = {};
  for (const [user, { score }] of Object.entries(scores)) {
    rights[user] = score.div(toalScore).toNumber();
  }

  console.log(rights, "score");
}

const [adapterAddress, startBlock, endBlock] = process.argv.slice(2);

main(adapterAddress, startBlock, endBlock);
