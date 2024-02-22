'use client';



import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Images } from "@prisma/client";

import { ImageIcon, Trash2Icon } from "lucide-react";
import ImageList from "./image-list";
import ImageListForm from "./image-list-form";


interface DeleteImageFormProps {
    images : Images[];
}

const DeleteImageForm: React.FC<DeleteImageFormProps> = ({
    images
}) => {

    const onClick = () => {

    }

    return ( 
        <div>
            <Dialog>
                <DialogTrigger>
                
                        <Trash2Icon className="mr-8"/>
                   
                </DialogTrigger>
                <DialogContent className="dark:bg-[#0F0F0F] border-none">
                    <DialogHeader>
                        <DialogTitle className="flex items-center" >
                        <ImageIcon className="mr-2"/>Fotos & Anhänge entfernen
                        </DialogTitle>
                        
                    </DialogHeader>
                    {images.length === 0 ? (
                        <div>
                            <p className="text-gray-800/50 font-bold"> Noch keine Bilder hinzugefügt </p>
                        </div>
                    ) : (
                        <div>
                        {images.map((image) => (
                            <ImageListForm
                            key={image.id}
                            image={image}
                            />
                        ))}
                    </div>
                    )}
                    
                </DialogContent>
            </Dialog>
        </div>
     );
}
 
export default DeleteImageForm;