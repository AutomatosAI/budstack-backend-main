import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class KycRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateClientKycStatus(caseId: string) {
    try {
      return await this.prisma.client.update({
        where: { caseId },
        data: { isKYCVerified: true },
      });
    } catch (error) {
      throw error;
    }
  }
}
