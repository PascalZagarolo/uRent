'use client';

import axios from "axios";

import { useParams, useRouter  } from "next/navigation";
import { CldUploadButton } from 'next-cloudinary';
import { useState } from "react";
import toast from "react-hot-toast";
import { ImageIcon } from "lucide-react";




const UploadImage = ({
    
}) => {

    const params = useParams();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (result : any) => {
        try {
            setIsLoading(true)
            axios.post(`/api/message/${params.conversationId}/image`, {
                image : result?.info?.secure_url
            })
            toast.success("Bild erfolgreich gesendet")
        } catch {
            toast.error("Fehler beim Upload")
        } finally {
            setIsLoading(false)
            setTimeout(() => {
                router.refresh()  
            }, 1000)
        }
    }

    return ( 
        <div>
            <CldUploadButton
            onUpload={handleImageUpload}
            uploadPreset="oblbw2xl"
            options={{ maxFiles : 1}}
            >
            <div className="mr-2">
                
                    <ImageIcon className="text-black" />
                
            </div>
            </CldUploadButton>
        </div>
     );
}
 
export default UploadImage;