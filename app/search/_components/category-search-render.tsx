'use client'

import { Separator } from '@/components/ui/separator';
import { useSavedSearchParams } from '../../../store';
import LkwSearch from './category-data/lkw-search';
import PkwSearch from './category-data/pkw-search';
import TransportSearch from './category-data/transport-search';
import TrailerSearch from './category-data/trailer-search';
import { CategoryEnumRender } from '@/db/schema';
const CategorySearchRender = () => {

    const currentParams = useSavedSearchParams((state) => state.searchParams)
//@ts-ignore
   const currentCategory : typeof CategoryEnumRender = currentParams['thisCategory'] 
    return (
        <div className="w-full">
            <h3 className="font-semibold text-md flex items-center dark:text-gray-100">
                {
                    {
                        'PKW' : "Pkw - ",
                        'LKW' : "Lkw - ",
                        'TRAILOR' : "Anhänger - ",
                        'TRANSPORT' : "Transporter - "
//@ts-ignore
                    }[currentCategory] 
                } Details
                <Separator
                    className="h-[0.5px] dark:bg-gray-100/20  w-1/3 sm:w-2/3 ml-6"

                />
            </h3>
            <div className='mt-4'>
            {
                    {
                        'PKW' : <PkwSearch /> ,
                        'LKW' : <LkwSearch />,   
                        'TRAILER' : <TrailerSearch />,
                        'TRANSPORT' : <TransportSearch />
//@ts-ignore
                    }[currentCategory] 
                }

                {//@ts-ignore
                !currentParams['thisCategory'] && (
                    <div className='flex justify-center text-md font-semibold'>
                        Noch keine Kategorie ausgewählt..
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategorySearchRender;