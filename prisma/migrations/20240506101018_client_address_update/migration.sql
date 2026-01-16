/*
  Warnings:

  - You are about to drop the column `address` on the `ClientBusiness` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Shipping` table. All the data in the column will be lost.
  - Added the required column `address1` to the `ClientBusiness` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address2` to the `ClientBusiness` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `ClientBusiness` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `ClientBusiness` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `ClientBusiness` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address1` to the `Shipping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address2` to the `Shipping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClientBusiness" DROP COLUMN "address",
ADD COLUMN     "address1" TEXT NOT NULL,
ADD COLUMN     "address2" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "countryCode" TEXT,
ADD COLUMN     "landmark" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Shipping" DROP COLUMN "address",
ADD COLUMN     "address1" TEXT NOT NULL,
ADD COLUMN     "address2" TEXT NOT NULL,
ADD COLUMN     "landmark" TEXT,
ALTER COLUMN "postalCode" DROP NOT NULL;
