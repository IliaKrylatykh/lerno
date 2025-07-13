/*
  Warnings:

  - The values [SR,EN,RU] on the enum `TranslationLanguage` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `ageGroup` on the `Kindergarten` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TranslationLanguage_new" AS ENUM ('sr', 'en', 'ru');
ALTER TABLE "SchoolTranslation" ALTER COLUMN "lang" TYPE "TranslationLanguage_new" USING ("lang"::text::"TranslationLanguage_new");
ALTER TABLE "KindergartenTranslation" ALTER COLUMN "lang" TYPE "TranslationLanguage_new" USING ("lang"::text::"TranslationLanguage_new");
ALTER TYPE "TranslationLanguage" RENAME TO "TranslationLanguage_old";
ALTER TYPE "TranslationLanguage_new" RENAME TO "TranslationLanguage";
DROP TYPE "TranslationLanguage_old";
COMMIT;

-- AlterTable
ALTER TABLE "Kindergarten" DROP COLUMN "ageGroup",
ADD COLUMN     "age_group" TEXT;
