'use client';

import axios from "axios";

import { useParams, useRouter } from "next/navigation";
import { CldUploadButton } from 'next-cloudinary';
import { useState } from "react";
import toast from "react-hot-toast";
import { UploadCloudIcon } from "lucide-react";

interface ChangeProfilePicProps {
    thisUserId : string
}

const ChangeProfilePic: React.FC<ChangeProfilePicProps> = ({
    thisUserId
}) => {

    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (result : any) => {
        try {
            setIsLoading(true)
            axios.patch(`/api/profile/${thisUserId}/profilepicture`, {
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
        <div className="p-4 rounded-md dark:bg-[#141414] dark:text-gray-200 bg-white flex justify-center">
            <CldUploadButton
            onUpload={handleImageUpload}
            uploadPreset="oblbw2xl"
            options={{ maxFiles : 1}}
            >
            <p className="flex justify-center text-sm font-bold dark:text-gray-200"> 
            <UploadCloudIcon className="mr-2 dark:text-gray-200"/> Profilbild bearbeiten </p>
            </CldUploadButton>
        </div>
     );
}
 
export default ChangeProfilePic;