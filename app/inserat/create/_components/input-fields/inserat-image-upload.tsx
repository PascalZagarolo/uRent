'use client'


import { ImageIcon, PlusCircleIcon } from "lucide-react";

import ImageList from "./image-list";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import DeleteImageForm from "./delete-image-form";
import { images, inserat, userSubscription } from "@/db/schema";
import { useDropzone } from "react-dropzone";




interface InseratImageUploadProps {
    thisImages: typeof images.$inferSelect[];
    existingSubscription? : typeof userSubscription.$inferSelect;

}

const InseratImageUpload: React.FC<InseratImageUploadProps> = ({
    thisImages,
    existingSubscription
}) => {

    let maxPicsize = 8;

    if (existingSubscription?.subscriptionType === "PREMIUM") {
        maxPicsize = 12;
    } else if(existingSubscription?.subscriptionType === "ENTERPRISE") {
        maxPicsize = 20;
    }

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

    const onReorder = async (updateData: { id: string; position: number }[]) => {
        try {
            setIsLoading(true)
            await axios.put(`/api/inserat/${params.inseratId}/image/reorder`, {
                list: updateData
            }).then(() => {
                router.refresh();
            })
            setTimeout(() => {
                router.refresh();
            })
        } catch {
            toast.error("Fehler beim Reorder")
        } finally {
            setIsLoading(false)
        }
    }


    const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
        acceptedFiles.forEach((file: any) => {
            setSelectedImages((prevState) => [...prevState, file]);
            handleUpload2(file);
        });


    }, []);



    const [selectedImages, setSelectedImages] = useState(thisImages);
    const [isUploaded, setIsUploaded] = useState(false);

    useEffect(() => {
        router.refresh();
    }, [selectedImages])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop, maxFiles: maxPicsize - thisImages.length, accept: {
            'image/png': ['.jpeg', '.png', '.webp', '.jpg'],
        }
    });


    const handleUpload2 = (file: any) => {
        const url = "https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload";
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", "oblbw2xl");
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                axios.post(`/api/inserat/${params.inseratId}/image`, {
                    image: data.secure_url
                })

            }).then(() => {router.refresh()})
    };

    return (
        <div className="">
            <h3 className="flex justify-center font-semibold text-md items-center">
                <ImageIcon className="mr-2 h-4 w-4" />
                Fotos und Anhänge ({thisImages.length}/{maxPicsize}) *
                
                <div className="ml-auto">
                    <DeleteImageForm
                        thisImages={thisImages}
                    />
                </div>
            </h3>
            <p className="flex text-sm justify-start text-gray-900/50  dark:text-gray-100"> Halte um die Reihenfolge der Fotos zu ändern </p>
            {


                <div className="mt-8 bg-white p-4 mr-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] rounded-md dark:bg-[#171717] w-full">
                    <ImageList
                        onEdit={() => { }}
                        onReorder={onReorder}
                        items={thisImages || []}

                    />
                    {thisImages.length < maxPicsize && (

                        <div className="text-gray-800/50  text-sm mt-4 flex justify-center py-20 border-dashed border
                             dark:text-gray-100/80 dark:border-gray-500" {...getRootProps()}>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                "Fotos hier ablegen.."
                            ) : (
                                "Fotos hinzufügen oder reinziehen.."
                            ) }
                            </div>

                    )}
                </div>



            }

        </div>
    );
}

export default InseratImageUpload;