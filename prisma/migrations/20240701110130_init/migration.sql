-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_listingId_fkey`;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
