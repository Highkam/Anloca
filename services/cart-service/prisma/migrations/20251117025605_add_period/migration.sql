-- CreateTable
CREATE TABLE "public"."Period" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "duration_days" INTEGER NOT NULL,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Period_name_key" ON "public"."Period"("name");
