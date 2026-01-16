import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:PRixVhIZuCFEJQYWGhqIYWVjnxdojuHk@turntable.proxy.rlwy.net:29176/railway",
        },
    },
});

async function main() {
    console.log('Seeding mock data for testing...');

    // 1. Update "Caribbean Breeze" with rich data
    const caribbeanBreezeId = '5c5674cc-9122-47fe-9fee-3b2fc58d612a';

    await prisma.strain.update({
        where: { id: caribbeanBreezeId },
        data: {
            discount: 10,
            expiryDate: new Date('2025-12-31'),
            strainImages: {
                create: [
                    { strainImageUrl: '/caribbean-breeze-strain.png', altText: 'Caribbean Breeze Bud' },
                    { strainImageUrl: '/caribbean-breeze-strain.png', altText: 'Caribbean Breeze Macro' }
                ]
            }
        }
    });
    console.log('✓ Updated "Caribbean Breeze": Discount (10%), Expiry, 2 Images added');

    // 2. Set "Candy Pave" to Out of Stock
    const candyPaveId = '25c9bdc7-0e4e-4572-b089-37b2ca60e965';
    await prisma.strain.update({
        where: { id: candyPaveId },
        data: {
            isAvailable: false,
            stockQuantity: 0,
        }
    });
    // Also update location specific stock
    await prisma.strainLocation.updateMany({
        where: { strainId: candyPaveId },
        data: {
            isAvailable: false,
            stockQuantity: 0,
        }
    });

    console.log('✓ Updated "Candy Pave": Out of Stock');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
