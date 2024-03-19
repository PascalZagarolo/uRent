'use client'


import { ImageIcon, PlusCircleIcon } from "lucide-react";

import ImageList from "./image-list";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import DeleteImageForm from "./delete-image-form";
import { images } from "@/db/schema";




interface InseratImageUploadProps {
    thisImages: typeof images.$inferSelect[];

}

const InseratImageUpload: React.FC<InseratImageUploadProps> = ({
    thisImages
}) => {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleImageUpload = async (result: any) => {
        try {
            setIsLoading(true)
            axios.post(`/api/inserat/${params.inseratId}/image`, {
                image: result?.info?.secure_url
            }).then(() => {
                toast.success("Bild erfolgreich hochgeladen")
                router.refresh();
            })
             
        } catch {
            toast.error("Fehler beim Upload")
        } finally {
            setIsLoading(false)
        }
    }

    const onReorder = async (updateData : { id : string; position : number}[]) => {
        try {
            setIsLoading(true)
            await axios.put(`/api/inserat/${params.inseratId}/image/reorder`, {
                list : updateData
            }).then(() => {
                router.refresh();
            })
            
            
        } catch {
            toast.error("Fehler beim Reorder")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="">
            <h3 className="flex justify-center font-semibold text-md items-center">
                <ImageIcon className="mr-2 h-4 w-4" />
                Fotos und Anhänge *
                <CldUploadButton
                    onUpload={handleImageUpload}
                    uploadPreset="oblbw2xl"
                    options={{ maxFiles: 1 }}
                >
                    <PlusCircleIcon className="ml-4 h-4 w-4" />
                </CldUploadButton>
                <div className="ml-auto">
                    <DeleteImageForm 
                    thisImages = { thisImages }
                    />
                </div>
            </h3>
            <p className="flex text-sm justify-start text-gray-900/50  dark:text-gray-100"> Halte um die Reihenfolge der Fotos zu ändern </p>
            {

        thisImages.length > 0 ? (
                    <div className="mt-8 bg-white p-4 mr-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] rounded-md dark:bg-[#0F0F0F] w-full">
                        <ImageList
                            onEdit={() => { }}
                            onReorder={onReorder}
                            items={thisImages || []}
                            
                        />
                    </div>
                ) : (
                    <p className="text-gray-800/50 font-semibold text-sm italic flex justify-center mt-16 dark:text-gray-100/80"> Noch keine Anhänge oder Fotos hinzugefügt... </p>
                )
            }

        </div>
    );
}

export default InseratImageUpload;