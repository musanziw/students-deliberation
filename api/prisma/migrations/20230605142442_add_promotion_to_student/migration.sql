/*
  Warnings:

  - Added the required column `promotion` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `students` ADD COLUMN `promotion` INTEGER NOT NULL;
