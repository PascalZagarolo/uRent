'use client'

import { useSavedSearchParams } from '../../../store';
import LkwSearch from './category-data/lkw-search';
import PkwSearch from './category-data/pkw-search';
import TransportSearch from './category-data/transport-search';
import TrailerSearch from './category-data/trailer-search';
import { CategoryEnumRender } from '@/db/schema';
import { Car, Truck, Truck as TruckIcon, Box } from 'lucide-react';

type CategoryType = 'PKW' | 'LKW' | 'TRAILER' | 'TRANSPORT';

const CategorySearchRender = () => {
    const currentParams = useSavedSearchParams((state) => state.searchParams);
    //@ts-ignore
    const currentCategory = currentParams['thisCategory'] as CategoryType | undefined;
    
    const categoryLabels: Record<CategoryType, string> = {
        'PKW': "Pkw",
        'LKW': "Lkw",
        'TRAILER': "Anhänger",
        'TRANSPORT': "Transporter",
    };
    
    const categoryIcons: Record<CategoryType, JSX.Element> = {
        'PKW': <Car className="w-5 h-5" />,
        'LKW': <Truck className="w-5 h-5" />,
        'TRAILER': <Box className="w-5 h-5" />,
        'TRANSPORT': <TruckIcon className="w-5 h-5" />,
    };
    
    return (
        <div className="w-full space-y-5">
            {currentCategory && (
                <>
                    <div className="flex items-center space-x-2">
                       
                        <h3 className="text-md font-semibold text-gray-100">
                            {categoryLabels[currentCategory]} Details
                        </h3>
                    </div>
                    <div className="mt-2">
                        {
                            {
                                'PKW': <PkwSearch />,
                                'LKW': <LkwSearch />,   
                                'TRAILER': <TrailerSearch />,
                                'TRANSPORT': <TransportSearch />
                            }[currentCategory]
                        }
                    </div>
                </>
            )}

            {!currentParams['thisCategory'] && (
                <div className="flex flex-col items-center justify-center p-6 rounded-md bg-[#1e1e2a]/50 border border-indigo-900/20 text-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-indigo-900/20 text-indigo-400 mb-3">
                        <Car className="w-6 h-6" />
                    </div>
                    <h3 className="text-md font-semibold text-gray-200 mb-1">
                        Keine Kategorie ausgewählt
                    </h3>
                    <p className="text-sm text-gray-400">
                        Bitte wählen Sie eine Fahrzeugkategorie aus der obigen Liste aus.
                    </p>
                </div>
            )}
        </div>
    );
}

export default CategorySearchRender;