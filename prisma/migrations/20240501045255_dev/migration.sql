/*
  Warnings:

  - The values [ManagerManagement] on the enum `PermissionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PermissionType_new" AS ENUM ('AdminDashboard', 'ClientVerification', 'UserManagement', 'EventManagement', 'SubAdminManagement', 'CelebrityAgent', 'SalesAndOrderTracking', 'InventoryManagement', 'ReportAndAnalytics', 'DApp');
ALTER TABLE "UserPermissions" ALTER COLUMN "permission" TYPE "PermissionType_new" USING ("permission"::text::"PermissionType_new");
ALTER TYPE "PermissionType" RENAME TO "PermissionType_old";
ALTER TYPE "PermissionType_new" RENAME TO "PermissionType";
DROP TYPE "PermissionType_old";
COMMIT;
