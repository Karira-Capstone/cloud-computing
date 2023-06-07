-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Service` DROP FOREIGN KEY `Service_category_id_fkey`;

-- AlterTable
ALTER TABLE `Project` MODIFY `category_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Service` MODIFY `category_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
