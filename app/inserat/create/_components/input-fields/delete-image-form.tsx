'use client';



import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Image } from "@prisma/client";

import { ImageIcon, Trash2Icon } from "lucide-react";
import ImageList from "./image-list";
import ImageListForm from "./image-list-form";


interface DeleteImageFormProps {
    images : Image[];
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center" >
                        <ImageIcon className="mr-2"/>Fotos & Anhänge entfernen
                        </DialogTitle>
                        
                    </DialogHeader>
                    <div>
                        {images.map((image) => (
                            <ImageListForm
                            image={image}
                            />
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
     );
}
 
export default DeleteImageForm;