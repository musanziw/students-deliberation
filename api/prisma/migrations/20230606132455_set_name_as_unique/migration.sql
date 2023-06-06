/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `fields` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `fields_name_key` ON `fields`(`name`);
