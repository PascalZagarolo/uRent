'use client'

import { inserat } from "@/db/schema";
import TitleInseratCreation from "./_components/title";
import { useEffect, useState } from "react";
import DescriptionInserat from "../../../_components/input-fields/description-inserat";
import DescriptionInseratCreation from "./_components/description";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { switchSectionOverview } from '../../../../../../hooks/inserat-creation/useRouterHistory';
import SaveChangesDialog from "../_components/save-changes-dialog";

interface BasicDetailsProps {
    thisInserat : typeof inserat.$inferSelect;
    currentSection : number;
    changeSection : (value : number) => void;
}

const BasicDetails = ({ thisInserat, currentSection, changeSection } : BasicDetailsProps) => {

    const [currentTitle, setCurrentTitle] = useState(thisInserat.title || "");
    const [currentDescription, setCurrentDescription] = useState(thisInserat.description || "");
    const [showDialog, setShowDialog] = useState(false);

    

    const onSave = async (redirect? : boolean) => {
        try {
          if(hasChanged) {
            const values = {
                title : currentTitle,
                description : currentDescription
            }
            await axios.patch(`/api/inserat/${thisInserat?.id}`, values)
            router.refresh();
          }
          if(redirect) {
            router.push(`/inserat/create/${thisInserat.id}`);
            router.refresh();
          } else {
            changeSection(currentSection + 1);
          }
          
          
        } catch(e : any) {
            console.log(e);
            toast.error("Fehler beim Speichern der Änderungen");
        }
    }

    const router = useRouter();
    const hasChanged = currentTitle !== thisInserat.title || currentDescription !== thisInserat.description;

    useEffect(() => {
        if(!hasChanged) return
        function handleBeforeUnload(event : BeforeUnloadEvent) {
            event.preventDefault();
            return(event.returnValue = '');
        }
        window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });
        
        return() => {
            window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
        }
    },[hasChanged])

    return ( 
        <>
            <div className="flex flex-col  h-full">
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
                    <DescriptionInseratCreation thisInserat={thisInserat} currentDescription={currentDescription} setCurrentDescription={setCurrentDescription} />
                </div>
               
                
            </div>
            <div className="sm:mt-auto flex flex-col mt-8">
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}>
                       <ArrowLeft className="w-4 h-4 mr-2"  /> Zu deiner Inseratsübersicht
                    </span>
                    <div className="grid grid-cols-2">
                    <div/>
                    <Button className="bg-indigo-800 text-gray-200 w-full mt-2 hover:bg-indigo-900 hover:text-gray-300"
                    onClick={() => onSave()}
                    >
                       Speichern & Fortfahren <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
                    </Button>
                    </div>
                </div>
                {showDialog && <SaveChangesDialog  open={showDialog} onChange={setShowDialog} onSave={onSave}/>}
            </>
     );
}
 
export default BasicDetails;