-- CreateEnum
CREATE TYPE "InstitutionType" AS ENUM ('KINDERGARTEN', 'SCHOOL');

-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('TELEGRAM', 'VIBER', 'WHATSAPP', 'PHONE', 'EMAIL');

-- CreateTable
CREATE TABLE "Institution" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "type" "InstitutionType" NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstitutionTranslation" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "institution_id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "schoolId" TEXT,
    "kindergartenId" TEXT,

    CONSTRAINT "InstitutionTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "institution_id" TEXT NOT NULL,
    "type" "ContactType" NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "rating" DOUBLE PRECISION,
    "institution_id" TEXT,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kindergarten" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "age_group" TEXT,
    "institution_id" TEXT,

    CONSTRAINT "Kindergarten_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionTranslation_lang_slug_key" ON "InstitutionTranslation"("lang", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionTranslation_institution_id_lang_key" ON "InstitutionTranslation"("institution_id", "lang");

-- AddForeignKey
ALTER TABLE "InstitutionTranslation" ADD CONSTRAINT "InstitutionTranslation_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionTranslation" ADD CONSTRAINT "InstitutionTranslation_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionTranslation" ADD CONSTRAINT "InstitutionTranslation_kindergartenId_fkey" FOREIGN KEY ("kindergartenId") REFERENCES "Kindergarten"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kindergarten" ADD CONSTRAINT "Kindergarten_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;
