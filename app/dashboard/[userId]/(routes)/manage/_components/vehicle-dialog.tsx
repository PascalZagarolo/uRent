'use client'


import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inserat } from "@/db/schema";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdAddToPhotos } from "react-icons/md";

interface VehicleDialogProps {
    thisInserat: typeof inserat.$inferSelect
}
const VehicleDialog: React.FC<VehicleDialogProps> = ({
    thisInserat
}) => {

    const [currentTitle, setCurrentTitle] = useState<string>("");
    const [currentImage, setCurrentImage] = useState<string>("");
    const [currentRegistration, setCurrentRegistration] = useState<string>("");

    const router = useRouter();

    const handleImageUpload = (result : any) => {
        setCurrentImage(result?.info?.secure_url)
    }

    const onSubmit = async () => {
        const values = {
            title : currentTitle,
            registration : currentRegistration
        }
        try {
            await axios.post(`/api/inserat/${thisInserat.id}/vehicle`, values)
                .then(() => {
                    router.refresh();
                })
            toast.success("Fahrzeug erfolgreich hinzugefügt");

        } catch {
            toast.error("Fehler beim Upload");
        }
    }

    return (
        <>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <MdAddToPhotos className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0F0F0F] border-none">
                <DialogHeader>
                    <h3 className="flex items-center">
                        <MdAddToPhotos className="w-4 h-4 mr-2" />    Fahrzeug hinzufügen
                    </h3>
                </DialogHeader>
                <div>
                    <h1 className="text-sm flex">
                        <p className="font-semibold ">{thisInserat.title}</p>
                    </h1>
                    
                    <div className="mt-4">
                        <Label>
                            Titel *
                        </Label>
                        <Input
                            className="dark:bg-[#080808] dark:border-none mt-2"
                            onChange={(e) => {
                                setCurrentTitle(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div>

                    <div className="mt-2">
                        <Label>
                            Kennzeichen
                        </Label>
                        <Input
                            className="dark:bg-[#080808] dark:border-none mt-2"
                            onChange={(e) => {
                                setCurrentRegistration(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div>

                </div>
                <div className="ml-auto">
                    <DialogTrigger asChild>
                    <Button variant="ghost" className="bg-[#080808] hover:bg-[#151515]" disabled={!currentTitle} onClick={onSubmit}>
                        Fahrzeug hinzufügen
                    </Button>
                    </DialogTrigger>
                </div>
            </DialogContent>
        </Dialog>
        
        
        
        </>
    );
}

export default VehicleDialog;