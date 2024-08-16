-- CreateTable
CREATE TABLE "SleepEntry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sleepTimeDuration" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SleepEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SleepEntry_name_idx" ON "SleepEntry"("name");
