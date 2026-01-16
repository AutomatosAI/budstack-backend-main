import { PrismaClient, Role, AdminApprovalOnClient, StrainType } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

// Simple API key generator
function generateApiKey(): string {
    return `drg_${crypto.randomBytes(32).toString('hex')}`;
}

async function main() {
    console.log('🌱 Starting seed...\n');

    // 1. Create test admin user with wallet address
    const adminWalletAddress = '0x' + crypto.randomBytes(20).toString('hex');
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@drgreen-test.local' },
        update: {},
        create: {
            email: 'admin@drgreen-test.local',
            walletAddress: adminWalletAddress,
            fullName: 'Test Admin',
            role: Role.ADMIN,
            isVerified: true,
            isActive: true,
            nonce: 1,
        },
    });
    console.log('✓ Admin user:', adminUser.id);

    // 2. Create test NFT (required for client creation)
    const testNft = await prisma.nft.upsert({
        where: { tokenId: 99999 },
        update: { ownerId: adminWalletAddress },
        create: {
            tokenId: 99999,
            ownerId: adminWalletAddress,
        },
    });
    console.log('✓ Test NFT:', testNft.id, '(tokenId: 99999)');

    // 3. Update admin to use this NFT as primary
    await prisma.user.update({
        where: { id: adminUser.id },
        data: { primaryNftId: testNft.id },
    });
    console.log('✓ Admin linked to NFT');

    // 4. Create API key for test user
    const apiKey = generateApiKey();
    await prisma.apiKey.upsert({
        where: { key: apiKey },
        update: {},
        create: {
            userId: adminUser.id,
            keyName: 'Test API Key',
            key: apiKey,
        },
    });
    console.log('✓ API Key:', apiKey);

    // 5. Create location (South Africa)
    const locationZA = await prisma.location.upsert({
        where: { countryCode: 'ZAF' },
        update: {},
        create: { country: 'South Africa', countryCode: 'ZAF' },
    });
    console.log('✓ Location ZAF:', locationZA.id);

    // Create additional locations
    const locationPT = await prisma.location.upsert({
        where: { countryCode: 'PRT' },
        update: {},
        create: { country: 'Portugal', countryCode: 'PRT' },
    });
    console.log('✓ Location PRT:', locationPT.id);

    // 6. Create KYC-verified test client (BYPASSED KYC)
    const existingClient = await prisma.client.findUnique({
        where: { email: 'test-verified@drgreen-test.local' },
    });

    let testClient;
    if (existingClient) {
        testClient = await prisma.client.update({
            where: { email: 'test-verified@drgreen-test.local' },
            data: {
                isKYCVerified: true,
                adminApproval: AdminApprovalOnClient.VERIFIED,
                isActive: true,
            },
        });
    } else {
        testClient = await prisma.client.create({
            data: {
                firstName: 'Test',
                lastName: 'Customer',
                email: 'test-verified@drgreen-test.local',
                contactNumber: '+27123456789',
                phoneCode: '+27',
                phoneCountryCode: 'ZA',
                isKYCVerified: true,
                adminApproval: AdminApprovalOnClient.VERIFIED,
                isActive: true,
                verifiedAt: new Date(),
                nftId: testNft.id,
                shippings: {
                    create: {
                        address1: '123 Test Street',
                        address2: 'Suite 1',
                        city: 'Cape Town',
                        state: 'Western Cape',
                        country: 'South Africa',
                        countryCode: 'ZAF',
                        postalCode: '8001',
                        default: true,
                    },
                },
                clientCart: { create: {} },
            },
        });
    }
    console.log('✓ KYC-verified client:', testClient.id);

    // 7. Create sample strains with multi-currency pricing
    const strainData = [
        {
            name: 'Caribbean Breeze',
            description: 'A relaxing tropical hybrid with sweet fruity notes',
            type: StrainType.Hybrid,
            thc: 18.5,
            cbd: 0.5,
            cbg: 0.1,
            retailPrice: 100,
            wholeSalePrice: 80,
            flavour: 'tropical,sweet,fruity',
            feelings: 'relaxed,happy,euphoric',
            helpsWith: 'stress,anxiety,pain',
            imageUrl: 'caribbean-breeze-strain.png',
        },
        {
            name: 'Purple Haze',
            description: 'Classic sativa with uplifting creative effects',
            type: StrainType.Sativa,
            thc: 21.0,
            cbd: 0.3,
            cbg: 0.2,
            retailPrice: 120,
            wholeSalePrice: 95,
            flavour: 'earthy,berry,spicy',
            feelings: 'creative,energetic,focused',
            helpsWith: 'depression,fatigue,stress',
            imageUrl: 'purple-haze-strain.png',
        },
        {
            name: 'Northern Lights',
            description: 'Heavy indica for deep relaxation and sleep',
            type: StrainType.Indica,
            thc: 16.5,
            cbd: 1.0,
            cbg: 0.3,
            retailPrice: 90,
            wholeSalePrice: 70,
            flavour: 'pine,earthy,sweet',
            feelings: 'sleepy,relaxed,calm',
            helpsWith: 'insomnia,pain,stress',
            imageUrl: 'northern-lights-strain.png',
        },
    ];

    for (const strain of strainData) {
        const strainId = uuidv4();
        await prisma.strain.upsert({
            where: { id: strainId },
            update: {},
            create: {
                id: strainId,
                name: strain.name,
                description: strain.description,
                type: strain.type,
                thc: strain.thc,
                cbd: strain.cbd,
                cbg: strain.cbg,
                retailPrice: strain.retailPrice,
                wholeSalePrice: strain.wholeSalePrice,
                stockQuantity: 1000,
                isAvailable: true,
                isActive: true,
                flavour: strain.flavour,
                feelings: strain.feelings,
                helpsWith: strain.helpsWith,
                imageUrl: strain.imageUrl,
                strainLocations: {
                    create: [
                        {
                            locationId: locationZA.id,
                            stockQuantity: 500,
                            isAvailable: true,
                            isActive: true,
                        },
                        {
                            locationId: locationPT.id,
                            stockQuantity: 300,
                            isAvailable: true,
                            isActive: true,
                        },
                    ],
                },
                prices: {
                    createMany: {
                        data: [
                            { currency: 'usd', retailPrice: strain.retailPrice, wholeSalePrice: strain.wholeSalePrice },
                            { currency: 'eur', retailPrice: strain.retailPrice * 0.92, wholeSalePrice: strain.wholeSalePrice * 0.92 },
                            { currency: 'gbp', retailPrice: strain.retailPrice * 0.79, wholeSalePrice: strain.wholeSalePrice * 0.79 },
                        ],
                    },
                },
            },
        });
        console.log('✓ Strain:', strain.name);
    }

    console.log('\n🎉 Seed complete!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('TEST CREDENTIALS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`API Key:      ${apiKey}`);
    console.log(`Admin Email:  admin@drgreen-test.local`);
    console.log(`Client Email: test-verified@drgreen-test.local`);
    console.log(`Client ID:    ${testClient.id}`);
    console.log(`NFT Token:    99999`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
    .catch((e) => {
        console.error('Seed error:', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
