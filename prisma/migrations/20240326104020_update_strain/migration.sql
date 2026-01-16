/*
  Warnings:

  - You are about to drop the column `productId` on the `OrderLine` table. All the data in the column will be lost.
  - You are about to drop the column `planetMintingLimit` on the `PlanetDetail` table. All the data in the column will be lost.
  - You are about to drop the column `flavor` on the `Strain` table. All the data in the column will be lost.
  - You are about to drop the column `gentics` on the `Strain` table. All the data in the column will be lost.
  - You are about to drop the column `growingInfo` on the `Strain` table. All the data in the column will be lost.
  - You are about to drop the column `planetDetailId` on the `Strain` table. All the data in the column will be lost.
  - The primary key for the `WhitelistedUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `WhitelistedUsers` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductLocation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[strainId]` on the table `OrderLine` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `NftTransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `txHash` to the `NftTransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strainId` to the `OrderLine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Strain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Strain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockQuantity` to the `Strain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Strain` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StrainType" AS ENUM ('Hybrid', 'Sativa', 'Indica');

-- DropForeignKey
ALTER TABLE "OrderLine" DROP CONSTRAINT "OrderLine_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_strainId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductLocation" DROP CONSTRAINT "ProductLocation_locationId_fkey";

-- DropForeignKey
ALTER TABLE "ProductLocation" DROP CONSTRAINT "ProductLocation_productId_fkey";

-- DropForeignKey
ALTER TABLE "Strain" DROP CONSTRAINT "Strain_planetDetailId_fkey";

-- DropIndex
DROP INDEX "OrderLine_productId_key";

-- AlterTable
ALTER TABLE "Contracts" ADD COLUMN     "planetMintingLimit" INTEGER NOT NULL DEFAULT 251;

-- AlterTable
ALTER TABLE "NftTransactions" ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "txHash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderLine" DROP COLUMN "productId",
ADD COLUMN     "strainId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PlanetDetail" DROP COLUMN "planetMintingLimit",
ADD COLUMN     "planetDetailJson" JSONB;

-- AlterTable
ALTER TABLE "Strain" DROP COLUMN "flavor",
DROP COLUMN "gentics",
DROP COLUMN "growingInfo",
DROP COLUMN "planetDetailId",
ADD COLUMN     "batchNumber" TEXT,
ADD COLUMN     "cbd" DOUBLE PRECISION,
ADD COLUMN     "cbg" DOUBLE PRECISION,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "expiryDate" TIMESTAMP(3),
ADD COLUMN     "flavour" TEXT,
ADD COLUMN     "popularity" INTEGER,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "stockQuantity" INTEGER NOT NULL,
ADD COLUMN     "strainId" TEXT,
ADD COLUMN     "thc" DOUBLE PRECISION,
DROP COLUMN "type",
ADD COLUMN     "type" "StrainType" NOT NULL;

-- AlterTable
ALTER TABLE "WhitelistedUsers" DROP CONSTRAINT "WhitelistedUsers_pkey",
DROP COLUMN "userId";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductImage";

-- DropTable
DROP TABLE "ProductLocation";

-- CreateTable
CREATE TABLE "PlanetStrain" (
    "planetDetailId" INTEGER NOT NULL,
    "strainId" TEXT NOT NULL,

    CONSTRAINT "PlanetStrain_pkey" PRIMARY KEY ("planetDetailId","strainId")
);

-- CreateTable
CREATE TABLE "StrainLocation" (
    "id" SERIAL NOT NULL,
    "strainId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "StrainLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrainImage" (
    "id" TEXT NOT NULL,
    "strainImageUrl" TEXT,
    "altText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "strainId" TEXT NOT NULL,

    CONSTRAINT "StrainImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StrainLocation_strainId_locationId_key" ON "StrainLocation"("strainId", "locationId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderLine_strainId_key" ON "OrderLine"("strainId");

-- AddForeignKey
ALTER TABLE "PlanetStrain" ADD CONSTRAINT "PlanetStrain_planetDetailId_fkey" FOREIGN KEY ("planetDetailId") REFERENCES "PlanetDetail"("planetNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanetStrain" ADD CONSTRAINT "PlanetStrain_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrainLocation" ADD CONSTRAINT "StrainLocation_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrainLocation" ADD CONSTRAINT "StrainLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrainImage" ADD CONSTRAINT "StrainImage_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
