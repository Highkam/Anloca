-- CreateTable
CREATE TABLE "public"."BundleProduct" (
    "id" SERIAL NOT NULL,
    "bundleId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "BundleProduct_pkey" PRIMARY KEY ("id")
);
