
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const strains = await prisma.strain.findMany({
        select: {
            id: true,
            name: true,
            isAvailable: true,
            isActive: true,
            stockQuantity: true
        }
    });

    console.log("Strains Status:");
    strains.forEach(s => {
        console.log(`- ${s.name}: isAvailable=${s.isAvailable}, isActive=${s.isActive}, stock=${s.stockQuantity}`);
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
