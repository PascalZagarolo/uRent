import db from '../db/drizzle';
import { carModels } from '../db/schema';
import { mercedesBenzModels } from './car-modals-by-brand/mercedes';

// Type for carModels insert
// @ts-ignore
// eslint-disable-next-line
export type CarModelInsert = typeof carModels.$inferInsert;

// Mercedes_Benz models


// Main array of car models to insert
export const carModelsData: CarModelInsert[] = [
  {
    category: 'PKW',
    modelName: 'Model X',
    brand: 'Tesla',
    series: '2023',
  },
  {
    category: 'Sedan',
    modelName: 'Model S',
    brand: 'Tesla',
    series: '2022',
  },
  // Add more car models as needed
  ...mercedesBenzModels,
];

export async function insertCarModels() {
  await db.insert(carModels).values(carModelsData);
  console.log('Inserted car models!');
}

// If you want to run this file directly:
if (require.main === module) {
  insertCarModels().catch(console.error);
}
