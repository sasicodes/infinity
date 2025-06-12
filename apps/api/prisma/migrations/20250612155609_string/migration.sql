/*
  Warnings:

  - You are about to drop the column `edges` on the `Flow` table. All the data in the column will be lost.
  - You are about to drop the column `nodes` on the `Flow` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `generated` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `nodeId` on the `Node` table. All the data in the column will be lost.
  - Added the required column `flow` to the `Flow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flow" DROP COLUMN "edges",
DROP COLUMN "nodes",
ADD COLUMN     "flow" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Node" DROP COLUMN "content",
DROP COLUMN "generated",
DROP COLUMN "imageUrl",
DROP COLUMN "nodeId",
ADD COLUMN     "node" TEXT;
