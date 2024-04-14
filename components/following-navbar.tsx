"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import { inserat } from "@/db/schema";

interface FloatingNavProps {
    navItems?: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    thisInserat : typeof inserat.$inferSelect;
    className?: string;

}

export const FloatingNav: React.FC<FloatingNavProps> = ({
    navItems,
    thisInserat,
    className,
}) => {

    const necessaryFields = {
        description : thisInserat.description?.length > 0 || false,
        price : !!thisInserat.price,
        date : (thisInserat.end && thisInserat.begin) !== null || thisInserat.annual,
        images : thisInserat.images?.length > 0,
        title : thisInserat.title.length > 0,
        category : thisInserat.category != null,
        location : thisInserat.address?.locationString != null,
        postalCode : thisInserat.address?.postalCode != null,
        
    }

    
    function getMissing() : string {
        for (const key in necessaryFields) {
            //@ts-ignore
            if (necessaryFields[key] === false) {
                
                return key;
            }
        }
        return "";
    }

    let trueAttributes = 0;

for (const key in necessaryFields) {
    //@ts-ignore
    if (necessaryFields[key] === true) {
        trueAttributes++;
    }
}

    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.05) {
                setVisible(false);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    `flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent  
          rounded-md dark:bg-[#191919] bg-white 
          shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] 
          z-[5000] pr-2 pl-2 py-4  items-center justify-center space-x-4`,
                    className
                )}
            >

                <div className="w-[400px] flex justify-center items-center">
                    <div className="w-full">
                        <Progress className="w-full dark:bg-[#1C1C1C]" 
                        value={(trueAttributes / Object.keys(necessaryFields).length) * 100} />
                        <div className="flex justify-center w-full text-xs mt-2">
                            {trueAttributes} / {Object.keys(necessaryFields).length} Pflichtfelder ausgefüllt
                        </div>
                        {trueAttributes === Object.keys(necessaryFields).length ? (
                            <p className="w-full text-xs flex justify-center text-emerald-600">Bereit zur Veröffentlichung</p>
                        ) : (
                            (
                                <p className="w-full text-xs flex justify-center dark:text-gray-100/70">Noch nicht zur Veröffentlichung bereit</p>
                            )
                        )}
                        {trueAttributes !== Object.keys(necessaryFields).length && (
                            <p className="flex justify-center text-xs text-rose-600 mt-2 font-semibold">
                                {
                                    {
                                        "description" : "Bitte füge eine Beschreibung hinzu",
                                        "price" : "Bitte gebe einen Preis an",
                                        "date" : "Bitte gebe ein Datum/ oder Datumstyp an",
                                        "images" : "Bitte füge Bilder deinem Inserat bei",
                                        "title" : "Bitte füge deinem Inserat ein Titel hinzu",
                                        "category" : "Bitte geben deinem Inserat eine Kategorie",
                                        "location" : "Bitte füge deinem Inserat eine Addresse hinzu",
                                        "postalCode" : "Bitte gebe deinem Inserat eine passende PLZ",         
                                    }[getMissing()]
                                }
                            </p>
                        ) }
                    </div>
                </div>


            </motion.div>
        </AnimatePresence>
    );
};
