import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AlertCircleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface ShowPrivatizeDialogProps {
    open: boolean
    onChange: (value: boolean) => void;
    onSave: () => void;
    text?: string;

}

const ShowPrivatizeDialog = ({
    open,
    onChange,
    onSave,
    text

}: ShowPrivatizeDialogProps) => {



    return (
        <Dialog open={open} onOpenChange={(e) => { onChange(e) }}>
            <DialogContent className="border-none bg-[#191919]">
                <div>
                    <div>
                        <h3 className="text-lg font-semibold flex flex-row items-center">
                            <AlertCircleIcon className="w-4 h-4 mr-2" />  Du bist gerade dabei Pflichtfelder zu entfernen
                        </h3>
                        <p className="text-xs text-gray-200/60">
                            Wenn du deine Änderungen speicherst werden Pflichtfelder deines Inserats entfernt & dein Inserat wird privat geschaltet.
                        </p>
                    </div>
                    {text && (
                        <div className="py-4">
                            Grund für die Änderung:
                            <div className="text-sm text-rose-600 font-semibold ">
                                - {text}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-row items-center justify-end ml-auto text-sm mt-4">
                        <DialogTrigger asChild>
                            <Button className="bg-rose-600 hover:bg-rose-800 text-gray-200 hover:text-gray-300 shadow-lg" onClick={onSave}>
                                Änderungen speichern
                            </Button>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                            <Button className=" text-gray-200 hover:text-gray-300 " variant="ghost" onClick={() => onChange(false)} >
                                Abbrechen
                            </Button>
                        </DialogTrigger>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ShowPrivatizeDialog;