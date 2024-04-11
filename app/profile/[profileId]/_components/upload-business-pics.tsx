'use client'

import { businessImages } from "@/db/schema";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface UploadBusinessPicsProps {
    usedImages: typeof businessImages.$inferSelect[];
    businessId : string
}

const UploadBusinessPics: React.FC<UploadBusinessPicsProps> = ({
    usedImages,
    businessId
}) => {


    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onUpload = (result : any) => {
        try {
            setIsLoading(true)
            axios.post(`/api/business/${businessId}/images`, {
                image : result?.info?.secure_url
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

    console.log(usedImages[0].url)

    return (
        <div className="w-full flex gap-0.5">
            
                {usedImages.length > 0 ? (
                    <div className="w-1/2 p-1 h-full dark:bg-[#191919] rounded-md">
                        <Image 
                        alt="1. Bild"
                        width={1000}
                        height={1000}
                        src={usedImages[0].url}
                        className="w-full h-full object-cover"
                        />
                </div>
                ) : (
                    <div className="w-1/2 p-8 h-full dark:bg-[#191919] rounded-md">
                <CldUploadButton
            onUpload={onUpload}
            uploadPreset="oblbw2xl"
            options={{ maxFiles : 1}}
             className="w-full h-full"
            >
                    <p className="w-full h-full items-center flex justify-center text-sm dark:text-gray-200/70">
                        Lade Bilder von deiner Vermietung hoch..
                    </p>
                    </CldUploadButton>
                </div>
                )}
            
            <div className="w-1/2 space-y-0.5">
                {usedImages.length > 1 ? (
                    <div className="h-1/2 p-1 dark:bg-[#191919]">
                <Image 
                        alt="1. Bild"
                        width={1000}
                        height={1000}
                        src={usedImages[1].url}
                        className="w-full h-full object-cover"
                        />
                </div>
                ) : (
                    <div className="h-1/2 p-8 dark:bg-[#191919]">
                <CldUploadButton
            onUpload={onUpload}
            uploadPreset="oblbw2xl"
            options={{ maxFiles : 1}}
             className="w-full h-full"
            >
                    <p className="w-full h-full items-center flex justify-center text-sm dark:text-gray-200/70">
                        weitere Bilder...
                    </p>
                    </CldUploadButton>
                </div>
                )}
                <div className="h-1/2 p-8 dark:bg-[#191919]">
                <CldUploadButton
            onUpload={onUpload}
            uploadPreset="oblbw2xl"
            options={{ maxFiles : 1}}
             className="w-full h-full"
            >
                    <p className="w-full h-full items-center flex justify-center text-sm dark:text-gray-200/70">
                        weitere Bilder...
                    </p>
                    </CldUploadButton>
                </div>
            </div>
        </div>
    );
}

export default UploadBusinessPics;