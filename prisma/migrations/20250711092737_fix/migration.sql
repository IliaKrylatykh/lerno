/*
  Warnings:

  - You are about to drop the column `kindergartenId` on the `InstitutionTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `InstitutionTranslation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "InstitutionTranslation" DROP CONSTRAINT "InstitutionTranslation_kindergartenId_fkey";

-- DropForeignKey
ALTER TABLE "InstitutionTranslation" DROP CONSTRAINT "InstitutionTranslation_schoolId_fkey";

-- AlterTable
ALTER TABLE "InstitutionTranslation" DROP COLUMN "kindergartenId",
DROP COLUMN "schoolId";
