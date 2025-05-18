'use server'



import db from '../db/drizzle';
import { brandEnum, carBrandsData } from '../db/schema';

// Type for carBrands insert
export type CarBrandInsert = { name: string };

// All brands from the enum
export const carBrandsSeedData: CarBrandInsert[] = brandEnum.enumValues.map((name) => ({ name }));

async function insertCarBrands() {
  console.log(carBrandsSeedData)
  await db.insert(carBrandsData).values(carBrandsSeedData as any);

}

// If you want to run this file directly:
if (require.main === module) {
  insertCarBrands().catch(console.error);
}
