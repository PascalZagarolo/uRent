'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Images } from "@prisma/client";
import axios from "axios";

import { Trash, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";



interface ImageListFormProps {
    image : Images
}

const ImageListForm: React.FC<ImageListFormProps> = ({
    image
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onClick = () => {
        try {
            setIsLoading(true);
            axios.delete(`/api/image/${image.id}`);
            toast.success("Bild erfolgreich gelöscht");
            setTimeout(() => {
                router.refresh()
            }, 1000)
        } catch {
            toast.error("Fehler beim Löschen des Bildes")
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <div key={image.id} className="mt-2">
            <div className="flex justify-start">
                <div className="flex">
                    <div className="flex mr-auto">
                        <Dialog>
                            <DialogTrigger>
                                <Trash className="flex items-center mr-8"/>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="flex items-center">
                                        <X className="text-rose-600 mr-2"/>Wirklich löschen ? 
                                    </DialogTitle>
                                    <p className="text-sm font-semibold text-gray-800/50"> gelöschte Anhänge können nicht wiederhergestellt werden </p>
                                </DialogHeader>
                                <div className="ml-auto mt-2">
                                    <DialogTrigger >
                                        <Button className="bg-rose-600 hover:bg-rose-600/80" onClick={onClick}>
                                        Löschen
                                        </Button>
                                    </DialogTrigger>

                                    <DialogTrigger >
                                        <Button className="ml-2" variant="ghost">
                                        Abbrechen
                                        </Button>
                                    </DialogTrigger>
                                    
                                    
                                    
                                </div>
                            </DialogContent>
                        </Dialog>
                        
                    </div>
                    <Image
                    src={image.url}
                    width={200}
                    height={200}
                    alt="pic"
                    className="flex justify-center"
                    />
                </div>
                
            </div>
        </div>
     );
}
 
export default ImageListForm;