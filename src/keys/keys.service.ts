import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as crypto from "crypto";
import { KeysRepository } from "./keys.repository";
import { GetApiKeysQueryDto, KeyPair } from "./dto/request.dto";
import { MESSAGES } from "src/constants";

@Injectable()
export class KeysService {
  constructor(private keysRepository: KeysRepository) {}

  async genKeys(userId: string, keyName: string): Promise<KeyPair> {
    try {
      await this.keysRepository.validateApiKeyData(userId, keyName);

      const { apiKey, secretKey } = await this.generateECDSAKeyPair();

      await this.keysRepository.setUserKeys(userId, apiKey, keyName);
      return {
        apiKey,
        secretKey,
        message: MESSAGES.SUCCESS.DAPP.CREATE_MESSAGE,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllUserKeys(userId: string, query: GetApiKeysQueryDto) {
    try {
      const { search, page, take, orderBy } = query;
      return await this.keysRepository.getAllUserKeys(
        userId,
        search,
        page,
        take,
        orderBy
      );
    } catch (error) {
      throw error;
    }
  }

  async updateUserKeys(userId: string, apiKeyId: string, keyName: string) {
    try {
      await this.keysRepository.isExistKeyName(userId, keyName);
      const key = await this.keysRepository.getAPIKeyByUser(userId, apiKeyId);
      if (!key)
        throw new NotFoundException(MESSAGES.SUCCESS.AUTH_KEY.NOT_FOUND);
      await this.keysRepository.updateUserKeys(apiKeyId, keyName);
      return MESSAGES.SUCCESS.DAPP.UPDATE;
    } catch (error) {
      throw error;
    }
  }

  async softDelete(keyId: string, userId: string) {
    const key = await this.keysRepository.getAPIKeyByUser(userId, keyId);
    if (!key) throw new NotFoundException(MESSAGES.SUCCESS.AUTH_KEY.NOT_FOUND);
    await this.keysRepository.softDelete(userId, keyId);
    return MESSAGES.SUCCESS.DAPP.DELETE;
  }

  private async generateECDSAKeyPair(): Promise<{
    apiKey: string;
    secretKey: string;
  }> {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
      namedCurve: "secp256k1",
      publicKeyEncoding: { format: "pem", type: "spki" },
      privateKeyEncoding: { format: "pem", type: "pkcs8" },
    });

    return {
      apiKey: Buffer.from(publicKey).toString("base64"), // Public key
      secretKey: Buffer.from(privateKey).toString("base64"), // Private key
    };
  }
}
