'use client'

import { getSearchParamsFunction } from "@/actions/getSearchParams";

import ExistingFilterBubble from "./existing-filter-bubble";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const ExistingFilter = () => {

    const searchParams = getSearchParamsFunction();

    const isEmpty = Object.values(searchParams).every((value) => value === null);

    return (
        <div className="w-full px-2 border-[#202336] border-l-none border-r-none border-t-2 border-b-2 bg-[#1B1E2C] text-xs">
            {!isEmpty && (
                <div>
                <Accordion type="single" collapsible className="w-full border-none">
                    <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="border-none ">
                            <h3 className="text-xs font-semibold">
                            Suchfilter verwalten:
                        </h3></AccordionTrigger>
                        <AccordionContent className="border-none ">
                            <div className="mt-1 w-full flex flex-wrap gap-y-1 gap-x-1">
                                {Object.entries(searchParams)
                                    .filter(([key, value]) => value !== null)
                                    .map(([pKey, value]) => (
                                        <ExistingFilterBubble key={pKey} value={value} pKey={pKey} />
                                    ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
            )}
        </div>
    );
}

export default ExistingFilter;