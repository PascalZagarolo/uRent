'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { images } from "@/db/schema";

import axios from "axios";

import { Trash, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";



interface ImageListFormProps {
    thisImage : typeof images.$inferSelect;
    pushSelected : (imageId : string) => void;
    deleteSelected : (imageId : string) => void;
    isSelected : boolean;
}

const ImageListForm: React.FC<ImageListFormProps> = ({
    thisImage,
    pushSelected,
    isSelected,
    deleteSelected
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    

    return ( 
        <div key={thisImage?.id} className="mt-2">
            <div className="flex justify-start">
                <div className="flex">
                    <div className="flex mr-auto">
                        <Dialog>
                            <div className="p-4">
                                <Checkbox 
                                onCheckedChange={(e) => {e ? pushSelected(thisImage?.id) : deleteSelected(thisImage?.id)}}
                                checked={isSelected}
                                />
                            </div>
                            
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