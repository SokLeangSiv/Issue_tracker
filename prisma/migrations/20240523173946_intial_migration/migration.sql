-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_assignToUserId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";
