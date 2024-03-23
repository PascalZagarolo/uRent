'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { images } from "@/db/schema";

import axios from "axios";

import { Trash, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";



interface ImageListFormProps {
    thisImage : typeof images.$inferSelect
}

const ImageListForm: React.FC<ImageListFormProps> = ({
    thisImage
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onClick = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/image/${thisImage?.id}`)
            toast.success("Bild erfolgreich gelöscht");
            router.refresh();
        } catch {
            toast.error("Fehler beim Löschen des Bildes")
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <div key={thisImage?.id} className="mt-2">
            <div className="flex justify-start">
                <div className="flex">
                    <div className="flex mr-auto">
                        <Dialog>
                            <DialogTrigger>
                                <Trash className="flex items-center mr-8"/>
                            </DialogTrigger>
                            <DialogContent className="dark:bg-[#0F0F0F] border-none">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center">
                                        <X className="text-rose-600 mr-2"/>Wirklich löschen ? 
                                    </DialogTitle>
                                    <p className="text-sm font-semibold text-gray-800/50 dark:text-gray-100"> gelöschte Anhänge können nicht wiederhergestellt werden </p>
                                </DialogHeader>
                                <div className="ml-auto mt-2">
                                    <DialogTrigger >
                                        <Button className="bg-rose-600 hover:bg-rose-600/80 dark:text-gray-100" onClick={onClick}>
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
                    <div>
                    <Image
                    src={thisImage?.url}
                    width={200}
                    height={200}
                    alt="pic"
                    className="flex justify-start  h-[100px] object-cover"
                    />
                    </div>
                </div>
                
            </div>
        </div>
     );
}
 
export default ImageListForm;