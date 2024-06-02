'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { inserat } from "@/db/schema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { PiHighlighterCircleFill } from "react-icons/pi";

interface HighlightInseratDialogProps {
    thisInserat : typeof inserat.$inferSelect;
}

const HighlightInseratDialog : React.FC<HighlightInseratDialogProps> = ({
    thisInserat
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const onClick = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/inserat/${thisInserat.id}/highlight`)
                .then(() => {
                    toast.success("Inserat erfolgreich hervorgehoben");
                    router.refresh();
                })
        } catch(error : any) {
            toast.error("Fehler beim Hervorheben des Inserats");
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <Dialog>
            <DialogTrigger className="dark:text-gray-200 text-xs hover:underline hover:cursor-pointer">
               
                Inserat hervorheben
                
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                    <div>
                        <h3 className="text-md font-semibold flex items-center">
                           <PiHighlighterCircleFill className="w-4 h-4 mr-2" /> Inserat hervorheben
                        </h3>
                        <div className="text-xs dark:text-gray-200/60">
                            <div>
                            Hebe Inserate hervor die Mietern besonders ins Auge stechen sollen.
                            </div> 
                            <div>
                            Mehr Informationen findest du <a className="font-semibold underline hover:cursor-pointer"
                            target="_blank" href="/faqs/plan-features"
                            > hier </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end items-center ">
                        <Button 
                        className="bg-indigo-800 hover:bg-indigo-900 dark:text-gray-200 hover:text-gray-300"
                        >
                            Hervorheben
                        </Button>
                        <Button 
                        className=" dark:text-gray-200 hover:text-gray-300"
                        variant="ghost"
                        
                        >
                            Abbrechen
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default HighlightInseratDialog;