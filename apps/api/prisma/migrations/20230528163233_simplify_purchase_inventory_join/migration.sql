/*
  Warnings:

  - You are about to drop the column `buyerInventoryId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `sellerInventoryId` on the `Purchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "buyerInventoryId",
DROP COLUMN "sellerInventoryId";
