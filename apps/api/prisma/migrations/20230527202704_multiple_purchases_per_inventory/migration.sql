/*
  Warnings:

  - You are about to drop the column `purchaseTransactionHash` on the `Inventory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_purchaseTransactionHash_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "purchaseTransactionHash";

-- CreateTable
CREATE TABLE "_InventoryToPurchase" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InventoryToPurchase_AB_unique" ON "_InventoryToPurchase"("A", "B");

-- CreateIndex
CREATE INDEX "_InventoryToPurchase_B_index" ON "_InventoryToPurchase"("B");

-- AddForeignKey
ALTER TABLE "_InventoryToPurchase" ADD CONSTRAINT "_InventoryToPurchase_A_fkey" FOREIGN KEY ("A") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryToPurchase" ADD CONSTRAINT "_InventoryToPurchase_B_fkey" FOREIGN KEY ("B") REFERENCES "Purchase"("transactionHash") ON DELETE CASCADE ON UPDATE CASCADE;
