-- DropForeignKey
ALTER TABLE "OrderLine" DROP CONSTRAINT "OrderLine_strainId_fkey";

-- DropIndex
DROP INDEX "OrderLine_strainId_key";

-- AlterTable
ALTER TABLE "OrderLine" ALTER COLUMN "strainId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
