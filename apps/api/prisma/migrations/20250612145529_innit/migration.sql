-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "html" TEXT,
    "content" TEXT,
    "mediaUrl" TEXT,
    "ipId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
