'use client'

import { useSavedSearchParams } from "@/store";
import { X } from "lucide-react";

import { useState } from "react";
import qs from 'query-string';
import { useRouter } from "next/navigation";


interface ExistingFilterBubbleProps {
    key: string;
    value: string;
}

const ExistingFilterBubble: React.FC<ExistingFilterBubbleProps> = ({
    value,
    key
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const onClickDelete = () => {
        try {
            console.log(1)
            setIsLoading(true);
            console.log(1)
            deleteSearchParams(key);
            console.log(1)
            onRedirect();
        } catch(e : any) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    const onRedirect = () => {
        const {//@ts-ignore
            thisCategory, ...filteredValues} = searchParams;

        //@ts-ignore
        const usedStart = filteredValues.periodBegin;
        let usedEnd = null;
        console.log(1)
    //@ts-ignore
        if(filteredValues.periodEnd){
        //@ts-ignore
        usedEnd = filteredValues.periodEnd;
        } else {
            //@ts-ignore
            if(filteredValues.periodBegin) {
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
                periodBegin: usedStart ? usedStart : null,
                //@ts-ignore
                periodEnd: usedEnd ? usedEnd : null,
                //@ts-ignore
                type: filteredValues.thisType,
                ...filteredValues
            },

        }, { skipEmptyString: true, skipNull: true })
        
        
        router.push(url);
    }

    return (


        <div className="p-1.5 font-semibold text-xs rounded-md bg-[#272b42] w-content flex items-center gap-x-0.5 group">
            <div className="group-hover:underline">
                {value}
            </div>
            <div className="hover:cursor-pointer" onClick={onClickDelete}>
                <X className="w-4 h-4" />
            </div>
        </div>

    );
}

export default ExistingFilterBubble;