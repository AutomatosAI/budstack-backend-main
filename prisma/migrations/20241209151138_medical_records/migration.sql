/*
  Warnings:

  - The `medicalHistory5` column on the `ClientMedicalRecords` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `medicalHistory7` column on the `ClientMedicalRecords` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ClientMedicalRecords" DROP COLUMN "medicalHistory5",
ADD COLUMN     "medicalHistory5" TEXT[],
DROP COLUMN "medicalHistory7",
ADD COLUMN     "medicalHistory7" TEXT[];
