/*
  Warnings:

  - A unique constraint covering the columns `[strainId,orderId]` on the table `OrderLine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderLine_strainId_orderId_key" ON "OrderLine"("strainId", "orderId");
