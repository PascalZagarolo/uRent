'use client'


import { ImageIcon, PlusCircleIcon } from "lucide-react";

import { Image } from "@prisma/client";
import ImageList from "./image-list";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useState } from "react";


interface InseratImageUploadProps {
    images: Image[];

}

const InseratImageUpload: React.FC<InseratImageUploadProps> = ({


    images
}) => {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(false)

    const handleImageUpload = (result : any) => {
        try {
            setIsLoading(true)
            axios.post(`/api/inserat/${params.profileId}/image`, {
                image : result?.info?.secure_url
            })
            toast.success("Profilbild erfolgreich hochgeladen")
        } catch {
            toast.error("Fehler beim Upload")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mt-2">
            <h3 className="flex justify-center font-semibold text-xl items-center">
                <ImageIcon className="mr-2 " />
                Fotos und Anhänge


                <CldUploadButton
                    onUpload={handleImageUpload}
                    uploadPreset="oblbw2xl"
                    options={{ maxFiles: 1 }}
                >
                    
                        <PlusCircleIcon className="ml-4 h-4 w-4" />
                    
                </CldUploadButton>

                
            </h3>

            <p className="text-gray-800/50 font-semibold text-sm italic flex justify-center mt-2"> Noch keine Anhänge oder Fotos hinzugefügt... </p>
            <ImageList
                onEdit={() => { }}
                onReorder={() => { }}
                items={images || []}
            />

        </div>
    );
}

export default InseratImageUpload;