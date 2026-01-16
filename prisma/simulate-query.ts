
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const countryCode = "ZAF";
    console.log(`Querying strains for countryCode: ${countryCode}`);

    const strains = await prisma.strain.findMany({
        where: {
            isDeleted: false,
            // Match the logic in strain.service.ts
            strainLocations: {
                some: {
                    location: {
                        countryCode: {
                            equals: countryCode,
                        },
                    },
                    isActive: true,
                    isAvailable: true,
                },
            },
        },
        select: {
            id: true,
            name: true,
            strainLocations: {
                where: {
                    location: { countryCode: { equals: countryCode } },
                },
                select: {
                    isActive: true,
                    isAvailable: true,
                    stockQuantity: true,
                    location: {
                        select: {
                            countryCode: true
                        }
                    }
                },
            },
        },
        take: 5
    });

    console.log(JSON.stringify(strains, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
