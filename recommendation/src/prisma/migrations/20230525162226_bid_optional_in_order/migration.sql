-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_bid_id_fkey`;

-- AlterTable
ALTER TABLE `Order` MODIFY `bid_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_bid_id_fkey` FOREIGN KEY (`bid_id`) REFERENCES `Bid`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
