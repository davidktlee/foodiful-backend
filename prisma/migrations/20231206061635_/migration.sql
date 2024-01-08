ALTER TABLE "Order" ALTER COLUMN "requirement" DROP NOT NULL;

ALTER TABLE "Order" ALTER COLUMN "requirement" TYPE varchar;