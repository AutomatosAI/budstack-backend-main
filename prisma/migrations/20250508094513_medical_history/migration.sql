/*
  Warnings:

  - The `medicalHistory14` column on the `ClientMedicalRecords` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ClientMedicalRecords" ALTER COLUMN "medicalHistory6" DROP NOT NULL,
ALTER COLUMN "medicalHistory6" DROP DEFAULT,
ALTER COLUMN "medicalHistory11" DROP NOT NULL,
DROP COLUMN "medicalHistory14",
ADD COLUMN     "medicalHistory14" TEXT[],
ALTER COLUMN "medicalHistory15" DROP NOT NULL,
ALTER COLUMN "medicalHistory16" DROP NOT NULL,
ALTER COLUMN "medicalHistory16" DROP DEFAULT;
