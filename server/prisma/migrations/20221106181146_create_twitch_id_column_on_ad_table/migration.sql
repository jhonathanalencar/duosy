/*
  Warnings:

  - A unique constraint covering the columns `[twitchId]` on the table `Ad` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Ad" ADD COLUMN "twitchId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Ad_twitchId_key" ON "Ad"("twitchId");
