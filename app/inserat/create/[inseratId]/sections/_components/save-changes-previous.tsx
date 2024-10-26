import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AlertCircleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface SaveChangesPreviousProps {
    open: boolean
    onChange: (value: boolean) => void;
    onSave: (value : boolean) => void;
    currentIndex?: number;
}

const SaveChangesPrevious = ({
    open,
    onChange,
    onSave,
    currentIndex
}: SaveChangesPreviousProps) => {


    const router = useRouter();

    const params = useParams();

    const onLeave = () => {
        if(currentIndex) {
            const params = new URLSearchParams("")
            params.set('sectionId', String(currentIndex - 1))
            window.history.pushState(null, '', `?${params.toString()}`)
        } else {
            router.push(`/inserat/create/${params.inseratId}`)
        }
    }

    return (
        <Dialog open={open} onOpenChange={(e) => { onChange(e) }}>
            <DialogContent className="border-none bg-[#191919]">
                <div>
                    <div>
                        <h3 className="text-lg font-semibold flex flex-row items-center">
                            <AlertCircleIcon className="w-4 h-4 mr-2" />  Du hast ungespeicherte Änderungen
                        </h3>
                        <p className="text-xs text-gray-200/60">
                            Möchtest du die Änderungen speichern bevor du fortfährst?
                        </p>
                    </div>
                    <div className="flex flex-row items-center justify-end ml-auto text-sm mt-4">
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300 shadow-lg" onClick={() => {onSave(true)}}>
                                Änderungen speichern
                            </Button>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                            <Button className=" text-gray-200 hover:text-gray-300 " variant="ghost" onClick={onLeave} >
                                Abschnitt verlassen
                            </Button>
                        </DialogTrigger>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SaveChangesPrevious;