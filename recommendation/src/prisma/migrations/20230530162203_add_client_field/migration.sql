/*
  Warnings:

  - Added the required column `address` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_date` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identity_number` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` ADD COLUMN `address` TEXT NOT NULL,
    ADD COLUMN `birth_date` DATETIME(3) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `identity_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL;
