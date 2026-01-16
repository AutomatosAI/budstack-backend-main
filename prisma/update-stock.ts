
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Updating stock for all strains...");

    // Update all StrainLocation records to have stock and be available
    await prisma.strainLocation.updateMany({
        data: {
            stockQuantity: 100,
            isAvailable: true,
            isActive: true,
        },
    });

    // Also verify that we have strains
    const strainCount = await prisma.strain.count();
    console.log(`Verified ${strainCount} strains exist.`);

    const updatedLocations = await prisma.strainLocation.count({
        where: {
            stockQuantity: 100,
            isAvailable: true,
            isActive: true,
        },
    });

    console.log(`Updated ${updatedLocations} strain locations with 100 stock.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
