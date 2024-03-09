'use client'

import { Separator } from '@/components/ui/separator';
import { useSavedSearchParams } from '../../../store';
import LkwSearch from './category-data/lkw-search';
import PkwSearch from './category-data/pkw-search';
const CategorySearchRender = () => {

    const currentParams = useSavedSearchParams((state) => state.searchParams)

    return (
        <div className="w-full">
            <h3 className="font-semibold text-md flex items-center text-gray-100">
                {
                    {
                        'PKW' : "Pkw - ",
                        'LKW' : "Lkw - ",
                        'LAND' : "Landmaschinen - ",
                        'BAU' : "Bau - ",
                        'CARAVAN' : "Wohnmobil - ",
                        'TRAILOR' : "Anhänger - ",
                        'TRANSPORT' : "Transporter - "

                    }[currentParams['category']] 
                } Details
                <Separator
                    className="h-[0.5px] dark:bg-gray-100/20 w-2/3 ml-6"

                />
            </h3>
            <div className='mt-4'>
            {
                    {
                        'PKW' : <PkwSearch /> ,
                        'LKW' : <LkwSearch />,   
                        'TRAILOR' : "Anhänger - ",
                        'TRANSPORT' : "Transporter - "

                    }[currentParams['category']] 
                }

                {!currentParams['category'] && (
                    <div className='flex justify-center text-md font-semibold'>
                        Noch keine Kategorie ausgewählt..
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategorySearchRender;