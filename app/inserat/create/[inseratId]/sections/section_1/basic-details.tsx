'use client'

import { inserat } from "@/db/schema";
import TitleInseratCreation from "./_components/title";
import { useState } from "react";
import DescriptionInserat from "../../../_components/input-fields/description-inserat";
import DescriptionInseratCreation from "./_components/description";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";

interface BasicDetailsProps {
    thisInserat : typeof inserat.$inferSelect;
}

const BasicDetails = ({ thisInserat } : BasicDetailsProps) => {

    const [currentTitle, setCurrentTitle] = useState(thisInserat.title || "");


    return ( 
        <div>
            <div>
                <h3 className="text-lg font-semibold">
                    Grundlegende Angaben (1/2)
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Hier kannst du die grundlegenden Angaben zu deinem Inserat machen. <br/>
                        Gebe anderen Nutzern einen ersten Eindruck von deinem Inserat.
                    </p>
                </h3>
                <div className="mt-4">
                    <TitleInseratCreation 
                    thisInserat={thisInserat}
                    currentTitle={currentTitle}
                    setCurrentTitle={setCurrentTitle}
                    />
                </div>
                <div className="mt-4">
                    <DescriptionInseratCreation thisInserat={thisInserat} />
                </div>
                <div className="mt-4 flex flex-col">
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer">
                       <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                    </span>
                    <div className="grid grid-cols-2">
                        <div>

                        </div>
                    <Button className="bg-indigo-800 text-gray-200 w-full mt-2 hover:bg-indigo-900 hover:text-gray-300">
                        Fortfahren <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
                    </Button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default BasicDetails;