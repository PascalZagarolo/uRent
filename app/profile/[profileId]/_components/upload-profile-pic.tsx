'use client';

import axios from "axios";

import { useParams } from "next/navigation";
import { CldUploadButton } from 'next-cloudinary';
import { useState } from "react";
import toast from "react-hot-toast";

const UploadProfilePic = () => {

    const params = useParams();

    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (result : any) => {
        try {
            setIsLoading(true)
            axios.patch(`/api/profile/${params.profileId}/profilepicture`, {
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
        <div>
            <CldUploadButton
            onUpload={handleImageUpload}
            uploadPreset="oblbw2xl"
            options={{ maxFiles : 1}}
            >
            <p className="flex justify-center text-sm font-bold text-gray-800/80 mt-2"> Profilbild bearbeiten </p>
            </CldUploadButton>
        </div>
     );
}
 
export default UploadProfilePic;