import { ConfigService } from "@nestjs/config";
import { Expose, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsString, validateSync } from "class-validator";

export const configData = (configService: ConfigService) => ({
  PORT: configService.get<string>("PORT"),
  NETWORK: configService.get<string>("NETWORK"),
  DATABASE_URL: configService.get<string>("DATABASE_URL"),
  JWT_SECRET_LOGIN: configService.get<string>("JWT_SECRET_LOGIN"),
  JWT_SECRET_VERIFY_EMAIL: configService.get<string>("JWT_SECRET_VERIFY_EMAIL"),
  JWT_SECRET_2FA: configService.get<string>("JWT_SECRET_2FA"),
  AWS_BUCKET_NAME: configService.get<string>("AWS_BUCKET_NAME"),
  AWS_ACCESS_KEY_ID: configService.get<string>("AWS_ACCESS_KEY_ID"),
  AWS_SECRET_ACCESS_KEY: configService.get<string>("AWS_SECRET_ACCESS_KEY"),
  AWS_REGION: configService.get<string>("AWS_REGION"),
  SENDGRID_API_KEY: configService.get<string>("SENDGRID_API_KEY"),
  SUPPORT_ADMIN_EMAIL: configService.get<string>("SUPPORT_ADMIN_EMAIL"),
  ADMIN_EMAIL: configService.get<string>("ADMIN_EMAIL"),
  FRONTEND_URL: configService.get<string>("FRONTEND_URL"),
  NFT_CONTRACT_ID: configService.get<string>("NFT_CONTRACT_ID"),
  NFT_MARKETPLACE_CONTRACT_NAME: configService.get<string>(
    "NFT_MARKETPLACE_CONTRACT_NAME"
  ),
  NFT_MARKETPLACE_CONTRACT_ID: configService.get<string>(
    "NFT_MARKETPLACE_CONTRACT_ID"
  ),
  CONTRACT_DEPLOYED_CHAIN_ID: configService.get<string>(
    "CONTRACT_DEPLOYED_CHAIN_ID"
  ),
  RPC_PROVIDER_URL: configService.get<string>("RPC_PROVIDER_URL"),
  KYC_CLIENT_ID: configService.get<string>("KYC_CLIENT_ID"),
  KYC_CLIENT_SECRET: configService.get<string>("KYC_CLIENT_SECRET"),
  KYC_AUDIENCE: configService.get<string>("KYC_AUDIENCE"),
  KYC_GRANT_TYPE: configService.get<string>("KYC_GRANT_TYPE"),
  KYC_WEBHOOK_SECRET: configService.get<string>("KYC_WEBHOOK_SECRET"),
  KYC_BASE_URL: configService.get<string>("KYC_BASE_URL"),
  KYC_ORGANIZATION_ID: configService.get<string>("KYC_ORGANIZATION_ID"),
  FIREBASE_CLIENT_EMAIL: configService.get<string>("FIREBASE_CLIENT_EMAIL"),
  FIREBASE_PROJECT_ID: configService.get<string>("FIREBASE_PROJECT_ID"),
  FIREBASE_PRIVATE_KEY: configService.get<string>("FIREBASE_PRIVATE_KEY"),
  FIREBASE_NOTIFICATION_IMAGE_URL: configService.get<string>(
    "FIREBASE_NOTIFICATION_IMAGE_URL"
  ),
  COIN_REMITTER_INVOICE_URL: configService.get<string>(
    "COIN_REMITTER_INVOICE_URL"
  ),
  COIN_REMITTER_TEST_API_KEY: configService.get<string>(
    "COIN_REMITTER_TEST_API_KEY"
  ),
  COIN_REMITTER_TEST_PASSWORD: configService.get<string>(
    "COIN_REMITTER_TEST_PASSWORD"
  ),
  COIN_REMITTER_USDT_API_KEY: configService.get<string>(
    "COIN_REMITTER_USDT_API_KEY"
  ),
  COIN_REMITTER_USDT_PASSWORD: configService.get<string>(
    "COIN_REMITTER_USDT_PASSWORD"
  ),
  COIN_REMITTER_ETH_API_KEY: configService.get<string>(
    "COIN_REMITTER_ETH_API_KEY"
  ),
  COIN_REMITTER_ETH_PASSWORD: configService.get<string>(
    "COIN_REMITTER_ETH_PASSWORD"
  ),
  COIN_REMITTER_BTC_API_KEY: configService.get<string>(
    "COIN_REMITTER_BTC_API_KEY"
  ),
  COIN_REMITTER_BTC_PASSWORD: configService.get<string>(
    "COIN_REMITTER_BTC_PASSWORD"
  ),
  PAYINN_API_KEY: configService.get<string>("PAYINN_API_KEY"),
  PAYINN_API_URL: configService.get<string>("PAYINN_API_URL"),
});

class RequiredVariables {
  @Expose()
  @IsString()
  @IsNotEmpty()
  NETWORK: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  PORT: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  JWT_SECRET_LOGIN: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  JWT_SECRET_VERIFY_EMAIL: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  JWT_SECRET_2FA: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  AWS_BUCKET_NAME: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  AWS_ACCESS_KEY_ID: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  AWS_SECRET_ACCESS_KEY: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  AWS_REGION: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  SENDGRID_API_KEY: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  SUPPORT_ADMIN_EMAIL: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  ADMIN_EMAIL: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  FRONTEND_URL: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  NFT_MARKETPLACE_CONTRACT_ID: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  NFT_CONTRACT_ID: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  NFT_MARKETPLACE_CONTRACT_NAME: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  CONTRACT_DEPLOYED_CHAIN_ID: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  RPC_PROVIDER_URL: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  KYC_CLIENT_ID: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  KYC_CLIENT_SECRET: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  KYC_AUDIENCE: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  KYC_GRANT_TYPE: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  KYC_WEBHOOK_SECRET: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  KYC_BASE_URL: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  KYC_ORGANIZATION_ID: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  FIREBASE_CLIENT_EMAIL: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  FIREBASE_PROJECT_ID: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  FIREBASE_PRIVATE_KEY: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  FIREBASE_NOTIFICATION_IMAGE_URL: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  COIN_REMITTER_INVOICE_URL: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  COIN_REMITTER_TEST_API_KEY: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  COIN_REMITTER_TEST_PASSWORD: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  COIN_REMITTER_USDT_API_KEY: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  COIN_REMITTER_USDT_PASSWORD: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  COIN_REMITTER_ETH_API_KEY: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  COIN_REMITTER_ETH_PASSWORD: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  COIN_REMITTER_BTC_API_KEY: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  COIN_REMITTER_BTC_PASSWORD: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  PAYINN_API_KEY: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  PAYINN_API_URL: string;
}

export const MultiCurrency = ["usd", "eur", "gbp"];

export function validate(config: Record<string, unknown>) {
  let updatedConfig = config;

  const nodeEnv = "prod";
  const prefix = `${nodeEnv.toUpperCase()}_`;
  if (prefix) {
    updatedConfig = Object.entries(config).reduce((acc, [key, value]) => {
      const newKey = key.startsWith(prefix) ? key.replace(prefix, "") : key;
      acc[newKey] = value;
      return acc;
    }, {});
  }
  const validatedConfig = plainToInstance(RequiredVariables, updatedConfig, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    //  Gather all the errors and throw it
    const issues: string[] = errors.map((error) => {
      const keys = Object.keys(error.constraints);
      return error.constraints[keys[0]];
    });

    issues.push("Invalid .env config");

    throw issues.join("\n");
  }

  return validatedConfig;
}
