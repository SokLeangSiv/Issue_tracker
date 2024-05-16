-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "assignToUserId" TEXT;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assignToUserId_fkey" FOREIGN KEY ("assignToUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
