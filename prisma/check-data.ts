import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:PRixVhIZuCFEJQYWGhqIYWVjnxdojuHk@turntable.proxy.rlwy.net:29176/railway",
        },
    },
});

async function main() {
    console.log('Checking Strains for missing data...');

    // Get first 5 strains to see what we have
    const strains = await prisma.strain.findMany({
        take: 5,
        include: {
            strainImages: true,
            strainLocations: {
                include: { location: true }
            }
        }
    });

    for (const strain of strains) {
        console.log(`\nStrain: ${strain.name} (${strain.id})`);
        console.log(`- Discount: ${strain.discount}`);
        console.log(`- Expiry: ${strain.expiryDate}`);
        console.log(`- Images Count: ${strain.strainImages.length}`);
        strain.strainImages.forEach(img => {
            console.log(`  - Image: ${img.strainImageUrl}`);
        });
        console.log(`- Stock (Root): ${strain.isAvailable ? 'In Stock' : 'Out'} / ${strain.stockQuantity}`);
        strain.strainLocations.forEach(sl => {
            console.log(`  - Location ${sl.location.countryCode}: ${sl.isAvailable ? 'In Stock' : 'Out'} / ${sl.stockQuantity}`);
        });
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
