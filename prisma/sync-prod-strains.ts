/**
 * Fetch Production Strains with Authentication
 * 
 * Uses the production API keys to fetch all real strain data
 * and insert into development database.
 */

import { PrismaClient, StrainType } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

const PROD_API_URL = 'https://api.drgreennft.com/api/v1';

// Production API credentials (base64 encoded PEM keys)
const API_KEY = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZZd0VBWUhLb1pJemowQ0FRWUZLNEVFQUFvRFFnQUVodDJwYVppeDJHMnFVTXRkRDR4QXk1OG90WDRJOUhIYQpzcXNkZ2Y2Wk5OZ1NrWk5CREMxdjYvalJtMXVCRDdQNzNnRmIycHVqSzdLQW90MGlLUDJReFE9PQotLS0tLUVORCBQVUJMSUMgS0VZLS0tLS0K';
const SECRET_KEY = 'LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JR0VBZ0VBTUJBR0J5cUdTTTQ5QWdFR0JTdUJCQUFLQkcwd2F3SUJBUVFnWDVGa25DbUVJRkg0K081MmdSaWsKVkJEZHN1VXAremtlR0pMdy9jZ0Ftd0toUkFOQ0FBU0czYWxwbUxIWWJhcFF5MTBQakVETG55aTFmZ2owY2RxeQpxeDJCL3BrMDJCS1JrMEVNTFcvcitOR2JXNEVQcy92ZUFWdmFtNk1yc29DaTNTSW8vWkRGCi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K';

function generateSignature(payload: string, secretKeyBase64: string): string {
    let privateKeyPEM = secretKeyBase64;
    if (!secretKeyBase64.includes('BEGIN PRIVATE KEY')) {
        try {
            privateKeyPEM = Buffer.from(secretKeyBase64, 'base64').toString('utf-8');
        } catch (error) {
            // Keep original
        }
    }

    const sign = crypto.createSign('SHA256');
    sign.update(payload);
    sign.end();

    return sign.sign(privateKeyPEM).toString('base64');
}

async function fetchFromProdAPI(countryCode: string): Promise<any> {
    const url = `${PROD_API_URL}/strains?country=${countryCode}`;

    // For signature, use the query string part
    const queryString = `country=${countryCode}`;
    const signature = generateSignature(queryString, SECRET_KEY);

    console.log(`Fetching: ${url}`);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-apikey': API_KEY,
            'x-auth-signature': signature,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    return response.json();
}

function parseStrainType(type: string | undefined): StrainType {
    const t = (type || 'hybrid').toLowerCase();
    if (t.includes('indica')) return StrainType.Indica;
    if (t.includes('sativa')) return StrainType.Sativa;
    return StrainType.Hybrid;
}

async function main() {
    console.log('🔄 Fetching strains from PRODUCTION API with authentication...\n');

    try {
        // Fetch from Portugal (PRT) - the main market
        const data = await fetchFromProdAPI('PRT');

        const strains = data.data?.strains || data.strains || [];
        console.log(`✓ Fetched ${strains.length} strains from production\n`);

        if (strains.length === 0) {
            console.log('No strains found. Response:', JSON.stringify(data, null, 2));
            return;
        }

        // Get or create Portugal location
        let portugal = await prisma.location.findFirst({ where: { countryCode: 'PRT' } });
        if (!portugal) {
            portugal = await prisma.location.create({
                data: { country: 'Portugal', countryCode: 'PRT' }
            });
            console.log('✓ Created Portugal location');
        }

        const currencies = ['usd', 'eur', 'gbp', 'zar'];
        const rates: Record<string, number> = { usd: 1, eur: 0.92, gbp: 0.79, zar: 18.5 };

        for (const strain of strains) {
            try {
                // Upsert strain
                await prisma.strain.upsert({
                    where: { id: strain.id },
                    update: {
                        name: strain.name,
                        description: strain.description || '',
                        imageUrl: strain.imageUrl || '',
                        thc: strain.thc || 0,
                        cbd: strain.cbd || 0,
                        cbg: strain.cbg || 0,
                        type: parseStrainType(strain.type),
                        retailPrice: strain.retailPrice || 0,
                        wholeSalePrice: strain.wholeSalePrice || 0,
                        flavour: strain.flavour || '',
                        feelings: strain.feelings || '',
                        helpsWith: strain.helpsWith || '',
                        effects: strain.effects || '',
                        popularity: strain.popularity || 0,
                        batchNumber: strain.batchNumber || '',
                        isActive: strain.isActive ?? true,
                        isAvailable: strain.isAvailable ?? true,
                        stockQuantity: strain.stockQuantity || 100,
                    },
                    create: {
                        id: strain.id,
                        name: strain.name,
                        description: strain.description || '',
                        imageUrl: strain.imageUrl || '',
                        thc: strain.thc || 0,
                        cbd: strain.cbd || 0,
                        cbg: strain.cbg || 0,
                        type: parseStrainType(strain.type),
                        retailPrice: strain.retailPrice || 0,
                        wholeSalePrice: strain.wholeSalePrice || 0,
                        flavour: strain.flavour || '',
                        feelings: strain.feelings || '',
                        helpsWith: strain.helpsWith || '',
                        effects: strain.effects || '',
                        popularity: strain.popularity || 0,
                        batchNumber: strain.batchNumber || '',
                        isActive: strain.isActive ?? true,
                        isAvailable: strain.isAvailable ?? true,
                        stockQuantity: strain.stockQuantity || 100,
                    },
                });

                // Add multi-currency prices
                for (const currency of currencies) {
                    const rate = rates[currency];
                    const retailPrice = (strain.retailPrice || 10) * rate;
                    const wholeSalePrice = (strain.wholeSalePrice || 7) * rate;

                    await prisma.multiCurrencyPrice.upsert({
                        where: { Unique_ProductCurrency: { strainId: strain.id, currency } },
                        update: { retailPrice, wholeSalePrice },
                        create: { strainId: strain.id, currency, retailPrice, wholeSalePrice },
                    });
                }

                // Link to Portugal location
                await prisma.strainLocation.upsert({
                    where: { strainId_locationId: { strainId: strain.id, locationId: portugal.id } },
                    update: { isActive: true, isAvailable: true, stockQuantity: strain.stockQuantity || 100 },
                    create: { strainId: strain.id, locationId: portugal.id, isActive: true, isAvailable: true, stockQuantity: strain.stockQuantity || 100 },
                });

                console.log(`✓ ${strain.name}`);
            } catch (err: any) {
                console.error(`❌ ${strain.name}: ${err.message}`);
            }
        }

        console.log('\n🎉 Production data sync complete!');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
