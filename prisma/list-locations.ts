
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const locations = await prisma.location.findMany();
    console.log("Available Locations:");
    locations.forEach(l => {
        console.log(`- ${l.country} (${l.countryCode}) ID: ${l.id}`);
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
