-- CreateTable
CREATE TABLE "Racket" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Racket_pkey" PRIMARY KEY ("id")
);
