/*
  Warnings:

  - You are about to drop the column `creaytedAt` on the `BlogPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogPost" RENAME COLUMN "creaytedAt" TO "createdAt";