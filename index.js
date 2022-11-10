// Computes the percentage of morpho rewards a user has a right to per adapter.
//
// A user has rights to morpho rewards if they hold YTs during an epoch.
// We compute a score for each user with the following form:
//
// score = a_1 * t_1 + a_2 * t_2 + ... + a_n * t_n
//
// where t_i is the ith period of time the user held a_i YTs during the epoch.
// A period of time is defined as the amount of blocks the user held the YTs.
// If the user held the YTs for 100 blocks, then t_i = 100.
import ethers from "ethers";
import Decimal from "decimal.js";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { computeMerkleTree } from "./merkleTree.js";

import dividerAbi from "./abis/Divider.js";
import tokenAbi from "./abis/Token.js";

dotenv.config();

const DIVIDER_ADDRESS = "0x86bA3E96Be68563E41c2f5769F1AF9fAf758e6E0";
const MORPHO_TOKEN = "0x9994E35Db50125E0DF82e4c2dde62496CE330999";
const PROOFS_FILENAME = "./proof.json";

async function main(
  adapterAddress = "0x880E5caBB22D24F3E278C4C760e763f239AccA95", // WstETHAdapter
  startBlock = 0,
  endBlock = Infinity,
  dryRun = true
) {
  // Validate address
  adapterAddress = ethers.utils.getAddress(adapterAddress);

  const provider = new ethers.providers.AlchemyProvider("homestead", process.env.ALCHEMY_KEY);
  const divider = new ethers.Contract(DIVIDER_ADDRESS, dividerAbi, provider);
  const morphoToken = new ethers.Contract(MORPHO_TOKEN, tokenAbi, provider);

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
        if (startBlock > prevCheckpoint.block) {
          if (startBlock < block) {
            scores[to].score = score.plus(prevCheckpoint.amount.times(block - startBlock));
          }
        } else {
          scores[to].score = score.plus(prevCheckpoint.amount.times(block - prevCheckpoint.block));
        }

        scores[to].prevCheckpoint = { amount: prevCheckpoint.amount.plus(amount), block };
      } else {
        scores[to] = { score: new Decimal(0), prevCheckpoint: { amount, block } };
      }
    }

    if (scores[from] && from !== ethers.constants.AddressZero) {
      const { prevCheckpoint, score } = scores[from];
      if (startBlock > prevCheckpoint.block) {
        if (startBlock < block) {
          scores[from].score = score.plus(prevCheckpoint.amount.times(block - startBlock));
        }
      } else {
        scores[from].score = score.plus(prevCheckpoint.amount.times(block - prevCheckpoint.block));
      }
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

  const totalScore = Object.values(scores).reduce((acc, { score }) => acc.plus(score), new Decimal(0));

  const totalAvailableMorpho = dryRun
    ? new Decimal(1337).times("1e18")
    : new Decimal(await morphoToken.balanceOf(adapterAddress).then((b) => b.toString()));

  const rights = {};
  for (const [user, { score }] of Object.entries(scores)) {
    const _score = score.div(toalScore);
    if (_score.toNumber() > 0.001)
      rights[user] = _score.times(totalAvailableMorpho).toDecimalPlaces(0).toString();
  }

  const { root, proofs } = computeMerkleTree(
    Object.entries(rights).map(([address, accumulatedRewards]) => ({ address, accumulatedRewards }))
  );
  console.log("Computed root: ", root);

  // save the age proofs into a file
  if (!dryRun) {
    await fs.promises.writeFile(PROOFS_FILENAME, JSON.stringify({ root, proofs }, null, 2));
  }
}

const [adapterAddress, startBlock, endBlock] = process.argv.slice(2);

main(adapterAddress, startBlock, endBlock, true);
