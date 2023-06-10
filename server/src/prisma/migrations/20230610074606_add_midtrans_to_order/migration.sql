-- AlterTable
ALTER TABLE `Order` ADD COLUMN `midtrans_redirect_uri` VARCHAR(191) NULL,
    ADD COLUMN `midtrans_token` VARCHAR(191) NULL;
