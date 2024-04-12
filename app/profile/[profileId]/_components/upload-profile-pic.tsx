'use client';

import axios from "axios";

import { useParams, useRouter } from "next/navigation";
import { CldUploadButton } from 'next-cloudinary';
import { useState } from "react";
import toast from "react-hot-toast";
import { UploadCloudIcon } from "lucide-react";

const UploadProfilePic = () => {

    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (result : any) => {
        try {
            setIsLoading(true)
            axios.patch(`/api/profile/${params.profileId}/profilepicture`, {
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

    return ( 
        <div className="p-4 rounded-md dark:bg-[#191919] dark:border-none dark:text-gray-200 flex justify-center border-2 border-black ">
            <CldUploadButton
            onUpload={handleImageUpload}
            uploadPreset="oblbw2xl"
            options={{ maxFiles : 1}}
            >
            <p className="flex justify-center text-xs font-bold text-gray-900/90 dark:text-gray-200  "> 
            <UploadCloudIcon className="h-4 w-4 mr-2"/> Profilbild bearbeiten </p>
            </CldUploadButton>
        </div>
     );
}
 
export default UploadProfilePic;