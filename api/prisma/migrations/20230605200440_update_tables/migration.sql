/*
  Warnings:

  - Added the required column `promotion` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_promotion` to the `grades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courses` ADD COLUMN `promotion` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `grades` ADD COLUMN `student_promotion` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
