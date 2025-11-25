-- CreateTable
CREATE TABLE "public"."Bundle" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "recurrenceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bundle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Bundle" ADD CONSTRAINT "Bundle_recurrenceId_fkey" FOREIGN KEY ("recurrenceId") REFERENCES "public"."Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
