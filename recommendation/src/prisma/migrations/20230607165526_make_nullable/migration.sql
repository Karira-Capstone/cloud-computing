-- AlterTable
ALTER TABLE `Client` MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `birth_date` DATETIME(3) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `identity_number` VARCHAR(191) NULL,
    MODIFY `province` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Worker` MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `identity_number` VARCHAR(191) NULL,
    MODIFY `birth_date` DATETIME(3) NULL,
    MODIFY `province` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL;
