
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Linking strains to South Africa location...");

    const southAfricaId = "3100b44f-d6fc-4b3c-bf5d-0d7c78cc73cf";

    // Get all strains
    const strains = await prisma.strain.findMany();
    console.log(`Found ${strains.length} strains.`);

    let linkedCount = 0;

    for (const strain of strains) {
        await prisma.strainLocation.upsert({
            where: {
                strainId_locationId: {
                    strainId: strain.id,
                    locationId: southAfricaId
                }
            },
            update: {
                stockQuantity: 100,
                isAvailable: true,
                isActive: true
            },
            create: {
                strainId: strain.id,
                locationId: southAfricaId,
                stockQuantity: 100,
                isAvailable: true,
                isActive: true
            }
        });
        linkedCount++;
    }

    console.log(`Successfully linked ${linkedCount} strains to South Africa (ZAF).`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
