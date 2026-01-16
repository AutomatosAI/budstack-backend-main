import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service"; // Assuming you already have a Prisma service for DB interactions
import { MerkleTree } from "merkletreejs";
const keccak256 = require("keccak256");
import { solidityPackedKeccak256 } from "ethers";

@Injectable()
export class ProofGenerationService {
  constructor(private prisma: PrismaService) {}

  async generateAndStoreProofs(
    contractAddress: string,
    chainId: number,
    walletAddresses: string[]
  ) {
    try {
      await this.prisma.walletProof.deleteMany({});
      // Create the Merkle Tree
      const leaves = walletAddresses.map((address) =>
        solidityPackedKeccak256(
          ["address", "address", "uint256"],
          [address, contractAddress, chainId]
        )
      );
      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const rootHash = merkleTree.getHexRoot();

      // Array to store wallet proofs for batch insert
      const walletProofs = [];

      for (const wallet of walletAddresses) {
        const leaf = solidityPackedKeccak256(
          ["address", "address", "uint256"],
          [wallet, contractAddress, chainId]
        );
        const proof = merkleTree.getHexProof(leaf);
        walletProofs.push({
          walletAddress: wallet,
          proof: proof.join(","),
        });
      }
      console.log("Merkle Root Hash:", rootHash);
      // Batch insert into the database using Prisma
      await this.prisma.walletProof.createMany({
          data: walletProofs,
      });

      console.log("Proofs generated and stored successfully.");
    } catch (error) {
      console.error("Error during proof generation:", error);
    }
  }
}
