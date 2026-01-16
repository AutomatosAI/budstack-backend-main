/*
  Warnings:

  - Added the required column `availableQuantity` to the `StrainLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockQuantity` to the `StrainLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StrainLocation" ADD COLUMN     "availableQuantity" INTEGER NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stockQuantity" INTEGER NOT NULL;
