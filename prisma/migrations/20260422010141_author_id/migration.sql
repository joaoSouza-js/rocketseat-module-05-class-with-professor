/*
  Warnings:

  - Made the column `author_id` on table `questions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_author_id_fkey";

-- AlterTable
ALTER TABLE "questions" ALTER COLUMN "author_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
