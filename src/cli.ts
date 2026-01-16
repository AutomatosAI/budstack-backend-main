import { NestFactory } from "@nestjs/core";
import { ProofGenerationService } from "./proof-generation";
import { Module } from "@nestjs/common";
import { validate } from "./config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `.env.${process.env.NODE_ENV}`,
        validate,
      }),
  ],
  providers: [ProofGenerationService, PrismaService],
})
class ProofGenerationModule {}

async function bootstrap() {
  // Create the application context
  const app = await NestFactory.createApplicationContext(ProofGenerationModule);

  const proofService = app.get(ProofGenerationService);
  const configService = app.get(ConfigService);

  // Retrieve environment variables
  const CONTRACT_ADDRESS = configService.get<string>("NFT_CONTRACT_ID");
  const CHAIN_ID = configService.get<string>("CONTRACT_DEPLOYED_CHAIN_ID");

  // Example list of wallet addresses
  const walletAddresses = [
    "0xf86DF3d89ab3d1dB9245137e72b58B21F05C6c10",
    "0x730772eF2AA7965A3524983c1eA870e9c8137168",
    "0xbC4C992b60C6Bccb9b612e6E0c7E2df02d3D66E7",
    "0xa153Ed85FfaaF9B151749509526877094D1551b6",
    "0x25DaE2fCBc4AE474232C04E8506d3C8Cb3759873",
    // ...500 wallet addresses
  ];

  // Call the method to generate and store proofs
  await proofService.generateAndStoreProofs(
    CONTRACT_ADDRESS,
    Number(CHAIN_ID),
    walletAddresses
  );

  await app.close(); // Close the app after completion
}

bootstrap();
