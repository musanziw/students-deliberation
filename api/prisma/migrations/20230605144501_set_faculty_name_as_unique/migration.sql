/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `faculties` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `faculties_name_key` ON `faculties`(`name`);
