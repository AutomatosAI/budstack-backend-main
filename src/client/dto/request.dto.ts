import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsArray,
  IsUUID,
  IsEnum,
  IsNotEmpty,
  ValidateIf,
  IsEmail,
  IsDate,
  ArrayNotEmpty,
  IsDateString,
  IsObject,
  IsISO31661Alpha3,
  IsIn,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { AdminApprovalOnClient, DocumentType, Prisma } from "@prisma/client";
import { PaginationDto, filterByDate } from "src/constants/dto";
import { STATUS } from "src/user/user.dto";
import { KYC_STATUS } from "src/constants/enums";
import { IsLowercaseEmail } from "src/validators/email.validator";

const ALLOWED_MEDICAL_CONDITIONS = [
  "adhd",
  "agoraphobia",
  "anxiety",
  "appetite_disorders",
  "arthritis",
  "autistic_spectrum_disorder",
  "back_and_neck_pain",
  "bipolar",
  "bladder_pain",
  "cancer_pain_and_nausea",
  "chrohns_disease_or_colitis_pain",
  "chronic_and_long_term_pain",
  "chronic_fatigue_syndrome",
  "cluster_headaches",
  "complex_regional_pain_syndrome",
  "depression",
  "dermatology",
  "dvt",
  "ehlers-danlos_syndrome",
  "endometriosis",
  "epilepsy",
  "female_gynaecological_pain",
  "fibromyalgia",
  "irritable_bowel_syndrome",
  "migraine",
  "multiple_sclerosis_pain_and_muscle_spasm",
  "nerve_pain",
  "ocd",
  "osteoporosis",
  "parkinsons_disease",
  "personality_disorder",
  "phantom_limb_pain",
  "post_traumatic_stress_disorder",
  "sciatica",
  "scoliosis",
  "sleep_disorders",
  "spondylolisthesis",
  "thalassemia_major_blood_disorder",
  "the_menopause",
  "tinnitus",
  "tourette_syndrome",
  "trigeminal_neuralgia",
  "other_medical_condition",
];

const ALLOWED_MEDICINES_TREATMENTS = [
  "alprazolam",
  "alfentanil",
  "amitriptyline",
  "atomoxetine",
  "azathioprine",
  "buprenorphine",
  "bupropion",
  "citalopram",
  "clonazepam",
  "codeine",
  "codeine_phosphate",
  "co-codamol_30-500",
  "dexamfetamine",
  "diazepam",
  "diclofenac",
  "dihydrocodeine",
  "fentanyl",
  "fluoxetine",
  "fluoxetine_prozac",
  "gabapentin",
  "guanfacine",
  "infliximab",
  "lisdexamfetamine",
  "lithium",
  "lorazepam",
  "melatonin",
  "menthylphenidate",
  "meptazinol",
  "methadone",
  "methotrexate",
  "mirtazapine",
  "modafinil",
  "morphine",
  "naproxen",
  "nefopam",
  "nortriptyline",
  "omepresol",
  "omezrapol",
  "oxycodone",
  "paroxetine",
  "pentacozine",
  "pethidine",
  "prednisolone",
  "propranolol",
  "remifentanil",
  "sertraline",
  "sodium_valproate",
  "suvorexant",
  "tapentadol",
  "temazepam",
  "tramadol",
  "trazodone",
  "triazolam",
  "venlafaxine",
  "zolpidem",
  "zopiclone",
  "other_prescribed_medicines_treatments",
];

const ALLOWED_MEDICAL_HISTORY5 = [
  "anxiety_disorders_including_generalized_anxiety_disorder_ocd_or_other",
  "depression",
  "mania_bipolar_disorder",
  "personality_disorder",
  "ptsd",
  "schizophrenia",
  "none",
];

const ALLOWED_MEDICAL_HISTORY7 = [
  "psychosis",
  "schizophrenia",
  "schizoaffective_disorder",
  "anxiety",
  "depression",
  "bipolar_manic_depression_mania",
  "none",
];

const ALLOWED_MEDICAL_HISTORY13 = [
  "everyday",
  "every_other_day",
  "1_2_times_per_week",
  "never",
];

const ALLOWED_MEDICAL_HISTORY14 = [
  "smoking_joints",
  "vaporizing",
  "ingestion",
  "topical",
  "never",
];

// Custom validator to ensure "Never" is mutually exclusive
@ValidatorConstraint({ name: "IsValidCannabisUsage", async: false })
export class IsValidCannabisUsageConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string[], args: ValidationArguments) {
    if (!Array.isArray(value)) return false;

    const hasExclusive = value.includes("never") || value.includes("none");
    const otherValues = value.filter((v) => v !== "never" && v !== "none");

    // Invalid if 'Never' or 'None' is selected along with other values
    if (hasExclusive && otherValues.length > 0) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `"Never" or "None" cannot be selected along with other options '${args.value}'`;
  }
}

class CreateClientBusinessDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address1: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address2: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  landmark: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO31661Alpha3()
  @IsString()
  countryCode: string;

  @ApiProperty()
  @IsString()
  // @IsPostalCode('US')
  postalCode: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  businessType?: string;
}

class CreateClientDocumentDto {
  @ApiProperty()
  @IsString()
  documentUrl: string;

  @ApiProperty({ enum: DocumentType })
  @IsEnum(DocumentType)
  documentType: DocumentType;
}

class CreateShippingDto {
  @ApiProperty()
  @IsString()
  address1: string;

  @ApiProperty()
  @IsString()
  address2: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  landmark: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsISO31661Alpha3()
  @IsString()
  countryCode: string;

  @ApiProperty()
  @IsString()
  // @IsPostalCode('US')
  postalCode: string;
}

class MedicalRecordsDto {
  @ApiProperty({ description: "Date of birth in ISO format (YYYY-MM-DD)" })
  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @ApiProperty({ description: "Gender of the client", example: "Male" })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    description: "List of medical conditions",
    type: [String],
    example: ["ADHD", "Autistic Spectrum Disorder"],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(ALLOWED_MEDICAL_CONDITIONS, { each: true })
  @IsString({ each: true })
  @IsOptional()
  medicalConditions: string[];

  @ApiPropertyOptional({
    description: "Other medical conditions, if any",
    example: "Asthma",
  })
  @IsString()
  @ValidateIf((obj) =>
    obj.medicalConditions?.includes("other_medical_condition")
  )
  @IsNotEmpty()
  otherMedicalCondition?: string;

  @ApiProperty({
    description: "List of medicines or treatments",
    type: [String],
    example: ["Alfentanil", "Bupropion"],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(ALLOWED_MEDICINES_TREATMENTS, { each: true })
  @IsString({ each: true })
  @IsOptional()
  medicinesTreatments: string[];

  @ApiPropertyOptional({
    description: "Other treatments or medicines, if any",
    example: "Herbal remedies",
  })
  @ValidateIf((obj) =>
    obj.medicinesTreatments?.includes("other_prescribed_medicines_treatments")
  )
  @IsString()
  @IsNotEmpty()
  otherMedicalTreatments?: string;

  @ApiProperty({ description: "Medical history 0 flag", default: false })
  @IsBoolean()
  @IsNotEmpty()
  medicalHistory0: boolean;

  @ApiProperty({ description: "Medical history 1 flag", default: false })
  @IsBoolean()
  @IsNotEmpty()
  medicalHistory1: boolean;

  @ApiProperty({ description: "Medical history 2 flag", default: false })
  @IsBoolean()
  @IsNotEmpty()
  medicalHistory2: boolean;

  @ApiProperty({ description: "Medical history 3 flag", default: false })
  @IsBoolean()
  @IsNotEmpty()
  medicalHistory3: boolean;

  @ApiProperty({ description: "Medical history 4 flag", default: false })
  @IsBoolean()
  @IsNotEmpty()
  medicalHistory4: boolean;

  @ApiProperty({
    description: "Description for medical history 5",
    example: ["Mania (bipolar disorder)", "Schizophrenia"],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(ALLOWED_MEDICAL_HISTORY5, { each: true })
  @IsString({ each: true })
  @IsNotEmpty()
  @Validate(IsValidCannabisUsageConstraint)
  medicalHistory5: string[];

  @ApiProperty({ description: "Medical history 6 flag", default: null })
  @IsOptional()
  @IsBoolean()
  medicalHistory6: boolean;

  @ApiProperty({
    description: "Description for medical history 7",
    example: ["Schizophrenia", "Depression"],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(ALLOWED_MEDICAL_HISTORY7, { each: true })
  @IsString({ each: true })
  @IsOptional()
  @Validate(IsValidCannabisUsageConstraint)
  medicalHistory7: string[];

  @ApiProperty({ description: "Medical history 7 flag", example: "Father" })
  @ValidateIf(
    (obj) => obj.medicalHistory7 && !obj.medicalHistory7.includes("none")
  )
  @IsString()
  @IsNotEmpty()
  medicalHistory7Relation?: string;

  @ApiProperty({ description: "Medical history 8 flag", default: false })
  @IsBoolean()
  @IsNotEmpty()
  medicalHistory8: boolean;

  @ApiProperty({ description: "Medical history 9 flag", default: false })
  @IsBoolean()
  @IsNotEmpty()
  medicalHistory9: boolean;

  @ApiProperty({ description: "Medical history 10 flag", default: false })
  @IsBoolean()
  @IsNotEmpty()
  medicalHistory10: boolean;

  @ApiProperty({
    description: "Description for medical history 11",
    example: "History of allergies",
  })
  @IsOptional()
  @IsString()
  medicalHistory11?: string;

  @ApiProperty({ description: "Medical history 12 flag", default: false })
  @IsBoolean()
  @IsNotEmpty()
  medicalHistory12: boolean;

  @ApiProperty({
    description: "Description for medical history 13",
    example: "1-2 times per week",
  })
  @IsIn(ALLOWED_MEDICAL_HISTORY13)
  @IsNotEmpty()
  medicalHistory13: string;

  @ApiProperty({
    description: "Description for medical history 14",
    example: ["Vaporizing", "Topical"],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(ALLOWED_MEDICAL_HISTORY14, {
    each: true,
  })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Validate(IsValidCannabisUsageConstraint)
  medicalHistory14: string[];

  @ApiProperty({
    description: "Description for medical history 15",
    example: "Regular migraines",
  })
  @IsOptional()
  @IsString()
  medicalHistory15?: string;

  @ApiProperty({ description: "Medical history 16 flag", default: null })
  @IsOptional()
  @IsBoolean()
  medicalHistory16?: boolean;

  @ApiPropertyOptional({
    description: "List of supplements or prescriptions",
    example: "Vitamin D supplements",
  })
  @IsOptional()
  @IsString()
  prescriptionsSupplements?: string;
}

export class CreateClientDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsLowercaseEmail({ message: "Email must be in lowercase." })
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  phoneCode?: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.contactNumber)
  @IsOptional()
  @IsString()
  phoneCountryCode?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  contactNumber?: string;

  @ApiProperty({ type: CreateClientBusinessDto })
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateClientBusinessDto)
  clientBusiness: CreateClientBusinessDto;

  @ApiProperty({ type: CreateShippingDto })
  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateShippingDto)
  shipping: CreateShippingDto;

  @ApiProperty({ type: CreateShippingDto })
  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MedicalRecordsDto)
  medicalRecord: MedicalRecordsDto;
}

export enum ClientSearch {
  clientName = "clientName",
}

export class ClientIncludesDto {
  @ApiProperty()
  @Transform((v: any) => {
    return v.value.split(",");
  })
  @IsOptional()
  @IsArray()
  includes: string[];
}

export class GetAllClientDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate({
    message: "startdate must be a valid date. ex: YYYY-MM-DD or MM-DD-YYYY",
  })
  startDate: Date;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate({
    message: "endDate must be a valid date. ex: YYYY-MM-DD or MM-DD-YYYY",
  })
  endDate: Date;

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) => JSON.parse(value))
  @IsOptional()
  countryCodes?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty()
  @ValidateIf((o) => o.search)
  @IsString()
  @IsOptional()
  @IsEnum(ClientSearch)
  searchBy: ClientSearch;

  @ApiProperty()
  @IsOptional()
  @IsEnum(AdminApprovalOnClient)
  adminApproval: AdminApprovalOnClient;

  @ApiProperty()
  @IsOptional()
  @IsEnum(STATUS)
  status: STATUS;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === "true" || value === true)
  isVerified?: boolean;
}

class UpdateClientBusinessDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  address1: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address2: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  landmark: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  state: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty()
  @IsISO31661Alpha3()
  @IsString()
  @IsOptional()
  countryCode: string;

  @ApiProperty()
  @IsString()
  // @IsPostalCode('US')
  postalCode: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsOptional()
  businessType?: string;
}

class UpdateShippingDto {
  @ApiProperty()
  @IsString()
  address1: string;

  @ApiProperty()
  @IsString()
  address2: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  landmark: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsISO31661Alpha3()
  @IsString()
  countryCode: string;

  @ApiProperty()
  @IsString()
  // @IsPostalCode('US')
  postalCode: string;
}

export class UpdateMedicalRecordDto {
  @ApiProperty({ description: "Date of birth in ISO format (YYYY-MM-DD)" })
  @IsDateString()
  @IsOptional()
  dob: string;

  @ApiProperty({ description: "Gender of the client", example: "Male" })
  @IsString()
  @IsOptional()
  gender: string;

  @ApiProperty({
    description: "List of medical conditions",
    type: [String],
    example: ["Diabetes", "Hypertension"],
  })
  @IsArray()
  @IsIn(ALLOWED_MEDICAL_CONDITIONS, { each: true })
  @IsString({ each: true })
  @IsOptional()
  medicalConditions: string[];

  @ApiPropertyOptional({
    description: "Other medical conditions, if any",
    example: "Asthma",
  })
  @IsOptional()
  @IsString()
  otherMedicalCondition?: string;

  @ApiProperty({
    description: "List of medicines or treatments",
    type: [String],
    example: ["Paracetamol", "Therapy"],
  })
  @IsArray()
  @IsIn(ALLOWED_MEDICINES_TREATMENTS, { each: true })
  @IsString({ each: true })
  @IsOptional()
  medicinesTreatments: string[];

  @ApiPropertyOptional({
    description: "Other treatments or medicines, if any",
    example: "Herbal remedies",
  })
  @IsOptional()
  @IsString()
  otherMedicalTreatments?: string;

  @ApiProperty({ description: "Medical history 0 flag", default: false })
  @IsBoolean()
  @IsOptional()
  medicalHistory0: boolean;

  @ApiProperty({ description: "Medical history 1 flag", default: false })
  @IsBoolean()
  @IsOptional()
  medicalHistory1: boolean;

  @ApiProperty({ description: "Medical history 2 flag", default: false })
  @IsBoolean()
  @IsOptional()
  medicalHistory2: boolean;

  @ApiProperty({ description: "Medical history 3 flag", default: false })
  @IsBoolean()
  @IsOptional()
  medicalHistory3: boolean;

  @ApiProperty({ description: "Medical history 4 flag", default: false })
  @IsBoolean()
  @IsOptional()
  medicalHistory4: boolean;

  @ApiProperty({
    description: "Description for medical history 5",
    example: "Diagnosed with high cholesterol",
  })
  @IsArray()
  @IsIn(ALLOWED_MEDICAL_HISTORY5, { each: true })
  @IsString({ each: true })
  @IsOptional()
  medicalHistory5: string[];

  @ApiProperty({ description: "Medical history 6 flag", default: null })
  @IsOptional()
  @IsBoolean()
  medicalHistory6?: boolean;

  @ApiProperty({
    description: "Description for medical history 7",
    example: "Underwent surgery",
  })
  @IsArray()
  @IsIn(ALLOWED_MEDICAL_HISTORY7, { each: true })
  @IsString({ each: true })
  @IsOptional()
  medicalHistory7: string[];

  @ApiProperty({ description: "Medical history 7 flag", example: "Father" })
  @ValidateIf(
    (obj) =>
      obj.medicalHistory7?.length > 0 && !obj.medicalHistory7?.includes("none")
  )
  @IsString()
  @IsNotEmpty()
  medicalHistory7Relation?: string;

  @ApiProperty({ description: "Medical history 8 flag", default: false })
  @IsBoolean()
  @IsOptional()
  medicalHistory8: boolean;

  @ApiProperty({ description: "Medical history 9 flag", default: false })
  @IsBoolean()
  @IsOptional()
  medicalHistory9: boolean;

  @ApiProperty({ description: "Medical history 10 flag", default: false })
  @IsBoolean()
  @IsOptional()
  medicalHistory10: boolean;

  @ApiProperty({
    description: "Description for medical history 11",
    example: "History of allergies",
  })
  @IsOptional()
  @IsString()
  medicalHistory11?: string;

  @ApiProperty({ description: "Medical history 12 flag", default: false })
  @IsBoolean()
  @IsOptional()
  medicalHistory12: boolean;

  @ApiProperty({
    description: "Description for medical history 13",
    example: "Treated for heart disease",
  })
  @IsString()
  @IsOptional()
  medicalHistory13: string;

  @ApiProperty({
    description: "Description for medical history 14",
    example: "Chronic back pain",
  })
  @IsOptional()
  @IsArray()
  @IsIn(ALLOWED_MEDICAL_HISTORY14, {
    each: true,
  })
  @IsString({ each: true })
  medicalHistory14: string[];

  @ApiProperty({
    description: "Description for medical history 15",
    example: "Regular migraines",
  })
  @IsString()
  @IsOptional()
  medicalHistory15: string;

  @ApiProperty({ description: "Medical history 16 flag", default: false })
  @IsBoolean()
  @IsOptional()
  medicalHistory16: boolean;

  @ApiPropertyOptional({
    description: "List of supplements or prescriptions",
    example: "Vitamin D supplements",
  })
  @IsOptional()
  @IsString()
  prescriptionsSupplements?: string;
}

class UpdateClientDocumentDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  documentUrl: string;

  @ApiProperty({ enum: DocumentType })
  @IsEnum(DocumentType)
  @IsOptional()
  documentType: DocumentType;
}

export class UpdateClientDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contactNumber?: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.contactNumber)
  @IsOptional()
  @IsString()
  phoneCountryCode?: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.contactNumber)
  @IsOptional()
  @IsString()
  phoneCode?: string;

  @ApiPropertyOptional({ type: UpdateClientBusinessDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateClientBusinessDto)
  clientBusiness?: UpdateClientBusinessDto;

  @ApiPropertyOptional({ type: UpdateShippingDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateShippingDto)
  shipping?: UpdateShippingDto;

  @ApiPropertyOptional({ type: UpdateShippingDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateMedicalRecordDto)
  medicalRecord?: UpdateMedicalRecordDto;
}

export class ClientIdParams {
  @ApiProperty()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  clientId: string;
}

export class ClientOrderIdParams {
  @ApiProperty()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  orderId: string;
}

export class filterByCountryDto extends filterByDate {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) => JSON.parse(value))
  @IsOptional()
  countryCodes?: string[];
}

export class ApproveClientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  clientId: string;
}

export class updateClientStatusDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isApproved: boolean;

  @ApiProperty()
  @ValidateIf((o) => o.isApproved === false)
  @IsNotEmpty()
  @IsString()
  rejectionNote: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isDelete: boolean;
}

export class ClientApprovalDto {
  @ApiProperty({
    description: "Array of client IDs",
    type: [String],
    example: [
      "e1234567-e89b-12d3-a456-426614174000",
      "e1234567-e89b-12d3-a456-426614174001",
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID("all", { each: true, message: "Each clientId must be a valid UUID" })
  clientIds: string[];
}

export class ClientRejectionDto {
  @ApiProperty({
    description: "Array of client IDs",
    type: [String],
    example: [
      "e1234567-e89b-12d3-a456-426614174000",
      "e1234567-e89b-12d3-a456-426614174001",
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID("all", { each: true, message: "Each clientId must be a valid UUID" })
  clientIds: string[];

  @ApiProperty({
    description: "Rejection note for the clients",
    example: "Client does not meet the requirements",
  })
  @IsNotEmpty()
  @IsString()
  rejectionNote: string;
}

export class ClientQueryFilter {
  @ApiProperty()
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(STATUS)
  status: STATUS;

  @ApiProperty()
  @IsOptional()
  @IsEnum(KYC_STATUS)
  kyc: KYC_STATUS;
}
