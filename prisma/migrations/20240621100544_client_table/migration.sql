/*
  Warnings:

  - A unique constraint covering the columns `[caseId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "caseId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Client_caseId_key" ON "Client"("caseId");
