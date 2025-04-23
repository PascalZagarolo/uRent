'use client'

import { CarFrontIcon, TruckIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";
import PkwSearchComponents from "./pkw-search-components";
import ConditionsSearchComponent from "./conditions-search-component";
import LkwSearchComponent from "./lkw-search-component";
import TrailerSearchComponent from "./trailer-search-component";
import TransportSearchComponent from "./transport-search-component";
import { useSavedSearchParams } from "@/store";
import { CategoryEnumRender } from "@/db/schema";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";




const CategoryOverview = () => {

    const params = useSearchParams();


    const currentObject = useSavedSearchParams((state) => state.searchParams)

    //@ts-ignore
    const currentCategory: typeof CategoryEnumRender = currentObject["thisCategory"];

    return (
        <div className="">
            {//@ts-ignore
                (currentCategory || currentObject["thisCategory"]) && (
                    <div className="">
                        <ConditionsSearchComponent />
                    </div>
                )}
                {//@ts-ignore
                (currentCategory || currentObject["thisCategory"]) && (
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem value="item-1" className="border-none mb-4">                
            <AccordionTrigger className=" mt-4 p-2">
                    {//@ts-ignore
                        (currentCategory || currentObject["thisCategory"]) && (

                            <div className="     text-gray-200 w-full">

                                <div className="w-full flex justify-start items-center">
                                    {
                                        {
                                            "PKW": <CarFrontIcon className="h-6 w-6 mr-2" />,
                                            "LKW": <TruckIcon className="h-6 w-6 mr-2" />,
                                            "TRAILER": <RiCaravanLine className="h-6 w-6 mr-2" />,
                                            "TRANSPORT": <PiVanFill className="h-6 w-6 mr-2" />,
                                            //@ts-ignore
                                        }[currentCategory]
                                    }

                                    <div className="ml-2 text-lg text-gray-200">
                                        {
                                            {
                                                "PKW": "Pkw",
                                                "LKW": "Lkw",
                                                "TRAILER": "Anhänger",
                                                "TRANSPORT": "Transporter",
                                                //@ts-ignore
                                            }[currentCategory]
                                        }
                                    </div>
                                </div>

                            </div>
                        )}







                </AccordionTrigger>
                 
                <AccordionContent className="border-t-none border-none">
                    <div className="p-2 ">
                        {
                            {
                                "PKW": <PkwSearchComponents />,


                                "LKW": <LkwSearchComponent />,

                                "TRAILER": <TrailerSearchComponent />,

                                "TRANSPORT": <TransportSearchComponent />,

                                //@ts-ignore
                            }[currentCategory]
                        }
                    </div>
                </AccordionContent>
            </AccordionItem>
                
                
            </Accordion>
            )}

        </div>
    );
}

export default CategoryOverview;