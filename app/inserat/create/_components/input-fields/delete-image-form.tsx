'use client';



import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";


import { ImageIcon, Trash2Icon } from "lucide-react";
import ImageList from "./image-list";
import ImageListForm from "./image-list-form";
import { images } from "@/db/schema";


interface DeleteImageFormProps {
    thisImages : typeof images.$inferSelect[];
}

const DeleteImageForm: React.FC<DeleteImageFormProps> = ({
    thisImages
}) => {

    const onClick = () => {

    }

    return ( 
        <div>
            <Dialog>
                <DialogTrigger>
                
                        <Trash2Icon className="h-4 w-4 text-rose-600"/>
                   
                </DialogTrigger>
                <DialogContent className="dark:bg-[#0F0F0F] border-none">
                    <DialogHeader>
                        <DialogTitle className="flex items-center" >
                        <ImageIcon className="mr-2"/>Fotos & Anhänge entfernen
                        </DialogTitle>
                        
                    </DialogHeader>
                    {thisImages.length === 0 ? (
                        <div>
                            <p className="text-gray-800/50 font-bold"> Noch keine Bilder hinzugefügt </p>
                        </div>
                    ) : (
                        <div>
                        {thisImages.map((image) => (
                            <ImageListForm
                            key={image.id}
                            thisImage={image}
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