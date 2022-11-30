import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";

export const computeMerkleTree = (distribution) => {
  const leaves = distribution.map(({ address, accumulatedRewards }) =>
    ethers.utils.solidityKeccak256(["address", "uint256"], [address, accumulatedRewards])
  );
  const merkleTree = new MerkleTree(leaves, ethers.utils.keccak256, {
    sortPairs: true,
  });

  const proofs = {};
  distribution.forEach(({ address, accumulatedRewards }) => {
    proofs[address] = {
      amount: accumulatedRewards,
      proof: merkleTree.getHexProof(
        ethers.utils.solidityKeccak256(["address", "uint256"], [address, accumulatedRewards])
      ),
    };
  });
  const root = merkleTree.getHexRoot();

  return {
    root,
    proofs,
    leaves,
  };
};
