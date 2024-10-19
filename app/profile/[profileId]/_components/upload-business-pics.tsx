'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { businessImages } from "@/db/schema";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EditBusinessPics from "./edit-business-pics";
import { ImageIcon, Trash2Icon } from "lucide-react";

interface UploadBusinessPicsProps {
    usedImages: typeof businessImages.$inferSelect[];
    businessId: string;
    ownProfile: boolean;
}

const UploadBusinessPics: React.FC<UploadBusinessPicsProps> = ({
    usedImages,
    businessId,
    ownProfile
}) => {

    

    const [rightImages, setRightImages] = useState(usedImages);

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onUpload = (result: any) => {
        try {
            setIsLoading(true)
            axios.post(`/api/business/${businessId}/images`, {
                image: result?.info?.secure_url
            }).then(() => {
                router.refresh();
            })
            toast.success("Profilbild erfolgreich hochgeladen")
        } catch {
            toast.error("Fehler beim Upload")
        } finally {
            setIsLoading(false)
        }
    }

    
    

    useEffect(() => {
        setRightImages(usedImages)
    },[usedImages])


    return (
        <div>
            {usedImages.length > 0 && (
                <div>
                    <img src={usedImages[0].url}  alt="" className="w-full shadow-lg object-cover h-[240px]" />
                </div>
            )}
        </div>
    );
}

export default UploadBusinessPics;