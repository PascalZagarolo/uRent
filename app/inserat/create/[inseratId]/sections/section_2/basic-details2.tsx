'use client'

import { inserat } from "@/db/schema";

import { useState } from "react";
import DescriptionInserat from "../../../_components/input-fields/description-inserat";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryInseratCreation from "./_components/category";
import { render } from "react-dom";
import ExtraTypeLkwCreation from "./_components/extra-type-lkw";
import TransportExtraTypeCreation from "./_components/extra-type-transport";
import TrailerExtraTypeCreation from "./_components/extra-type-trailer";

interface BasicDetails2Props {
    thisInserat : typeof inserat.$inferSelect;
    currentSection : number;
    changeSection : (value : number) => void;
}

const BasicDetails2 = ({ thisInserat, currentSection, changeSection } : BasicDetails2Props) => {

    const [currentCategory, setCurrentCategory] = useState(thisInserat.category || "PKW");
    const [extraType, setExtraType] = useState("");


    const onSave = async () => {
        try {
          if(hasChanged) {
            const values = {
                
            }
           await axios.patch(`/api/inserat/${thisInserat?.id}`, values)
           toast.success("Hallo")
          }
          changeSection(currentSection + 1);
        } catch(e : any) {
            console.log(e);
            toast.error("Fehler beim Speichern der Änderungen");
        }
    }

    const onPrevious = () => {
        changeSection(currentSection - 1);
    }

    const hasChanged = false;

    const renderExtraType = () => {
        const extraTypes = {
            "LKW": <ExtraTypeLkwCreation currentValue={extraType} setCurrentValue={setExtraType}/>,
            "TRANSPORT": <TransportExtraTypeCreation currentValue={extraType} setCurrentValue={setExtraType}/>,
            "TRAILER": <TrailerExtraTypeCreation currentValue={extraType} setCurrentValue={setExtraType}/>
        };
    
        return extraTypes[currentCategory] || null;
    }

    return ( 
        
            <div className="h-full flex flex-col">
                <h3 className="text-lg font-semibold">
                    Grundlegende Angaben (2/2)
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Hier kannst du die grundlegenden Angaben zu deinem Inserat machen. <br/>
                        Gebe anderen Nutzern einen ersten Eindruck von deinem Inserat.
                    </p>
                </h3>
                <div className="mt-4">
                    <CategoryInseratCreation 
                    thisInserat={thisInserat}
                    currentCategory={currentCategory as any}
                    setCurrentCategory={setCurrentCategory}
                    />
                </div>
                <div className="mt-4">
                   {renderExtraType()}
                </div>
               
                <div className="flex flex-col mt-auto">
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer">
                       <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                    </span>
                    <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={onPrevious}>
                        Zurück
                    </Button>
                    <Button className="bg-indigo-800 text-gray-200 w-full  hover:bg-indigo-900 hover:text-gray-300"
                    onClick={onSave}
                    >
                        Fortfahren <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
                    </Button>
                    </div>
                </div>
            </div>
      
     );
}
 
export default BasicDetails2;