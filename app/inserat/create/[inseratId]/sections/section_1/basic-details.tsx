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
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import RenderContinue from "../_components/render-continue";
import ShowPrivatizeDialog from "../_components/show-privatize-dialog";

interface BasicDetailsProps {
    thisInserat : typeof inserat.$inferSelect;
    currentSection : number;
    changeSection : (value : number) => void;
}

const BasicDetails = ({ thisInserat, currentSection, changeSection } : BasicDetailsProps) => {

    const [currentTitle, setCurrentTitle] = useState(thisInserat.title || "");
    const [currentDescription, setCurrentDescription] = useState(thisInserat.description || "");
    const [isLoading, setIsLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showPrivate, setShowPrivate] = useState(false);

    const showPrivateDialog = (currentTitle?.trim() == "" || currentDescription?.trim() == "") && thisInserat?.isPublished;

    const onSave = async (redirect? : boolean, confirmDelete? : boolean) => {
        try {
            setIsLoading(true);

        if(showPrivateDialog && !confirmDelete) {
            setShowPrivate(true);
            return
        }

          if(hasChanged || showPrivateDialog && confirmDelete) {
            const values = {
                title : currentTitle?.trim() != "" ? currentTitle?.trim() : "",
                description : currentDescription?.trim() != "" ? currentDescription?.trim() : null
            }
            console.log(values)
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
        } finally {
            setIsLoading(false);
        }
    }

    const router = useRouter();
    const hasChanged = (
        String(currentTitle ?? "")?.trim() != String(thisInserat.title ?? "")?.trim() ||
        String(currentDescription ?? "")?.trim() != String(thisInserat.description ?? "")?.trim()
    );

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
                    <div className="flex flex-row items-center">
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}>
                       <ArrowLeft className="w-4 h-4 mr-2"  /> Zu deiner Inseratsübersicht
                    </span>
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer ml-auto" onClick={() => changeSection(12)}>
                        Zur Ende springen <MdOutlineKeyboardDoubleArrowRight  className="w-4 h-4 mr-2"  />
                    </span>
                    </div>
                    <div className="grid grid-cols-2">
                    <div/>
                    <RenderContinue isLoading={isLoading} disabled={isLoading} onClick={() => onSave()} hasChanged={hasChanged} />
                    </div>
                </div>
                {showDialog && <SaveChangesDialog  open={showDialog} onChange={setShowDialog} onSave={onSave}/>}
                {showPrivate && <ShowPrivatizeDialog  open={showPrivate} onChange={setShowPrivate} onSave={() => onSave(undefined, true)}
                                text={
                                    currentTitle?.trim() == "" ? 
                                    "Du hast den Titel deines Inserats entfernt." :
                                    "Du hast die Beschreibung deines Inserats entfernt."
                                }
                />}
            </>
     );
}
 
export default BasicDetails;