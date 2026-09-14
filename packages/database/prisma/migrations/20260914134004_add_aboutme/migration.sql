-- CreateTable
CREATE TABLE "AboutMe" (
    "id" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "emails" TEXT[],
    "phones" TEXT[],
    "socials" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutMe_pkey" PRIMARY KEY ("id")
);
