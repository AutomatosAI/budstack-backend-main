/*
  Warnings:

  - You are about to drop the column `name` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[countryCode]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Made the column `countryCode` on table `Location` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "name",
DROP COLUMN "region",
ALTER COLUMN "countryCode" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Location_countryCode_key" ON "Location"("countryCode");
