-- CreateTable
CREATE TABLE "ClientMedicalRecords" (
    "id" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "medicalConditions" TEXT[],
    "otherMedicalCondition" TEXT,
    "medicinesTreatments" TEXT[],
    "otherMedicalTreatments" TEXT,
    "medicalHistory0" BOOLEAN NOT NULL DEFAULT false,
    "medicalHistory1" BOOLEAN NOT NULL DEFAULT false,
    "medicalHistory2" BOOLEAN NOT NULL DEFAULT false,
    "medicalHistory3" BOOLEAN NOT NULL DEFAULT false,
    "medicalHistory4" BOOLEAN NOT NULL DEFAULT false,
    "medicalHistory5" TEXT NOT NULL,
    "medicalHistory6" BOOLEAN NOT NULL DEFAULT false,
    "medicalHistory7" TEXT NOT NULL,
    "medicalHistory8" BOOLEAN NOT NULL DEFAULT false,
    "medicalHistory9" BOOLEAN NOT NULL DEFAULT false,
    "medicalHistory10" BOOLEAN NOT NULL DEFAULT false,
    "medicalHistory11" TEXT NOT NULL,
    "medicalHistory12" BOOLEAN NOT NULL DEFAULT false,
    "medicalHistory13" TEXT NOT NULL,
    "medicalHistory14" TEXT NOT NULL,
    "medicalHistory15" TEXT NOT NULL,
    "medicalHistory16" BOOLEAN NOT NULL DEFAULT false,
    "prescriptionsSupplements" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "ClientMedicalRecords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientMedicalRecords_clientId_key" ON "ClientMedicalRecords"("clientId");

-- AddForeignKey
ALTER TABLE "ClientMedicalRecords" ADD CONSTRAINT "ClientMedicalRecords_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
