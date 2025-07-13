/*
  Warnings:

  - You are about to drop the column `age_group` on the `Kindergarten` table. All the data in the column will be lost.
  - You are about to drop the column `institution_id` on the `Kindergarten` table. All the data in the column will be lost.
  - You are about to drop the column `institution_id` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `School` table. All the data in the column will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Institution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InstitutionTranslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TranslationLanguage" AS ENUM ('SR', 'EN', 'RU');

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_institution_id_fkey";

-- DropForeignKey
ALTER TABLE "InstitutionTranslation" DROP CONSTRAINT "InstitutionTranslation_institution_id_fkey";

-- DropForeignKey
ALTER TABLE "Kindergarten" DROP CONSTRAINT "Kindergarten_institution_id_fkey";

-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_institution_id_fkey";

-- AlterTable
ALTER TABLE "Kindergarten" DROP COLUMN "age_group",
DROP COLUMN "institution_id",
ADD COLUMN     "ageGroup" TEXT;

-- AlterTable
ALTER TABLE "School" DROP COLUMN "institution_id",
DROP COLUMN "rating";

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "Institution";

-- DropTable
DROP TABLE "InstitutionTranslation";

-- DropEnum
DROP TYPE "InstitutionType";

-- CreateTable
CREATE TABLE "SchoolTranslation" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "school_id" TEXT NOT NULL,
    "lang" "TranslationLanguage" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "address" TEXT,
    "description" TEXT,

    CONSTRAINT "SchoolTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolContact" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "school_id" TEXT NOT NULL,
    "type" "ContactType" NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "SchoolContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KindergartenTranslation" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "kindergarten_id" TEXT NOT NULL,
    "lang" "TranslationLanguage" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "address" TEXT,
    "description" TEXT,

    CONSTRAINT "KindergartenTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KindergartenContact" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "kindergarten_id" TEXT NOT NULL,
    "type" "ContactType" NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "KindergartenContact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SchoolTranslation_lang_slug_key" ON "SchoolTranslation"("lang", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolTranslation_school_id_lang_key" ON "SchoolTranslation"("school_id", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "KindergartenTranslation_lang_slug_key" ON "KindergartenTranslation"("lang", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "KindergartenTranslation_kindergarten_id_lang_key" ON "KindergartenTranslation"("kindergarten_id", "lang");

-- AddForeignKey
ALTER TABLE "SchoolTranslation" ADD CONSTRAINT "SchoolTranslation_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolContact" ADD CONSTRAINT "SchoolContact_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KindergartenTranslation" ADD CONSTRAINT "KindergartenTranslation_kindergarten_id_fkey" FOREIGN KEY ("kindergarten_id") REFERENCES "Kindergarten"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KindergartenContact" ADD CONSTRAINT "KindergartenContact_kindergarten_id_fkey" FOREIGN KEY ("kindergarten_id") REFERENCES "Kindergarten"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
