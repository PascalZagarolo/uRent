'use client'

import { useSavedSearchParams } from "@/store";
import { X } from "lucide-react";

import { useState } from "react";
import qs from 'query-string';
import { useRouter } from "next/navigation";
import { format } from "date-fns";


interface ExistingFilterBubbleProps {
    pKey: string;
    value: string;
}

const ExistingFilterBubble: React.FC<ExistingFilterBubbleProps> = ({
    value,
    pKey
}) => {

    

    const [isLoading, setIsLoading] = useState(false);
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    console.log(searchParams)

    const displayKey = (usedKey: string, usedValue: string): string => {
        
        let formattedDate;

        switch (usedKey) {
            case 'periodBegin':
                formattedDate = format(new Date(usedValue), 'dd.MM.yyyy');
                return `Von ${formattedDate}`;
            case 'periodEnd':
                formattedDate = format(new Date(usedValue), 'dd.MM.yyyy');
                return `Bis ${formattedDate}`;
            case 'start' :
                return `Ab ${usedValue} €`;
            case 'end' :
                return `Bis ${usedValue} €`;
            case 'doors' :
                return `Ab ${usedValue} Türen`;
            case 'doorsMax' : 
                return `Bis ${usedValue} Türen`;
            case 'initial' : 
                return 'Baujahr ab ' + format(new Date(usedValue), 'dd.MM.yyyy');
            case 'initialMax' :
                return 'Baujahr bis ' + format(new Date(usedValue), 'dd.MM.yyyy');
            case 'power' :
                return 'ab ' + usedValue + 'PS';
            case 'powerMax' :
                return 'bis ' + usedValue + 'PS';
            default:
                return usedValue;
        }
    }

    const router = useRouter();

    const onClickDelete = () => {
        try {
            setIsLoading(true);
           
            deleteSearchParams(pKey);

            onRedirect();
        } catch (e: any) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    const onRedirect = () => {
        
        let pFilteredValues = searchParams;
        delete pFilteredValues[pKey.toString().trim()];

        const {
                //@ts-ignore            
            thisCategory, ...filteredValues } = pFilteredValues;

            console.log(filteredValues)
        //@ts-ignore
        const usedStart = filteredValues.periodBegin;
        let usedEnd = null;
        
        //@ts-ignore
        if (filteredValues.periodEnd) {
            //@ts-ignore
            usedEnd = filteredValues.periodEnd;
        } else {
            //@ts-ignore
            if (filteredValues.periodBegin) {
                //@ts-ignore
                usedEnd = filteredValues.periodBegin;
            }
        }
        const url = qs.stringifyUrl({
            url: process.env.NEXT_PUBLIC_BASE_URL,
            //@ts-ignore
            query: {
                //@ts-ignore
                category: thisCategory,
                //@ts-ignore
                periodBegin: filteredValues.periodBegin,
                //@ts-ignore
                periodEnd: filteredValues.periodEnd,
                //@ts-ignore
                type: filteredValues.thisType,
                ...filteredValues
            },

        }, { skipEmptyString: true, skipNull: true })

        console.log(url)
        router.push(url);
    }

    return (
        <div className="p-1.5 font-semibold text-xs rounded-md bg-[#272b42] w-content flex items-center gap-x-0.5 group">
            <div className=" group-hover:text-gray-200/60">
                {displayKey(pKey, value)}
            </div>
            <div className="hover:cursor-pointer" onClick={onClickDelete}>
                <X className="w-4 h-4" />
            </div>
        </div>
    );
}
export default ExistingFilterBubble;