'use client'


import { ImageIcon, PlusCircleIcon } from "lucide-react";


import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { images, inserat, userSubscription } from "@/db/schema";
import { useDropzone } from "react-dropzone";
import DeleteImageForm from "@/app/inserat/create/_components/input-fields/delete-image-form";
import ImageList from "@/app/inserat/create/_components/input-fields/image-list";

import { v4 as uuidv4 } from 'uuid';
import ImageListCreation from "./upload-image-list";
import DeleteImagesCreation from "./delete-images";
import { GrAddCircle } from "react-icons/gr";
import { cn } from "@/lib/utils";




interface UploadImagesCreationProps {
    selectedImages : any[];
    setSelectedImages : (value : any) => void;
    existingSubscription? : typeof userSubscription.$inferSelect;

}

const UploadImagesCreation: React.FC<UploadImagesCreationProps> = ({
    selectedImages,
    setSelectedImages,
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

    


    const onDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
        console.log("Files dropped:", acceptedFiles, rejectedFiles);
        

        if (selectedImages.length + acceptedFiles.length > maxPicsize) {
            toast.error(`Maximale Anzahl an Bildern ist ${maxPicsize}.`);
            return;
        }
    
        const newImages = acceptedFiles.map((file: File) => {
            const usedId = uuidv4(); // Generate a new UUID for each image
            return {
                id: usedId,
                url: URL.createObjectURL(file),
                position: selectedImages.length,
                wholeFile : file 
            };
        });
    
        // Update the state with the new images
        setSelectedImages((prevState) => [...prevState, ...newImages]);
    };
    



   
    

    

    const {
        getRootProps,
        getInputProps,
        isDragActive,

    } = useDropzone({
        //@ts-ignore
        onDrop, maxFiles: maxPicsize - selectedImages.length, accept: {
            'image/png': ['.jpeg', '.png', '.webp', '.jpg'],
        }
    });


    

    return (
        <div className="">
            <h3 className="flex justify-center font-semibold text-sm items-center">
                <ImageIcon className="mr-2 h-4 w-4" />
                Fotos und Anhänge ({selectedImages.length}/{maxPicsize}) *
                
                <div className="ml-auto">
                    <DeleteImagesCreation 
                    thisImages={selectedImages}
                    setImages={setSelectedImages}
                    />
                </div>
            </h3>
            
            <p className="flex  justify-start text-gray-900/50  dark:text-gray-200/60 text-xs"> Halte um die Reihenfolge der Fotos zu ändern </p>
            {


                <div className="mt-4 bg-white px-4 py-2 mr-8  rounded-md dark:bg-[#222222] shadow-lg w-full">
                    <ImageListCreation
                        
                        onReorder={setSelectedImages}
                        items={selectedImages || []}

                    />
                    {selectedImages.length < maxPicsize && (

                        <div className={cn(" text-gray-200/80 bg-[#272727] bg-indigo-600/15 text-sm  flex justify-center py-20 shadow-lg items-center" , selectedImages?.length > 0 && "mt-4 mb-4")}
                        {...getRootProps()}>
                            <input {...getInputProps()} />
                            <GrAddCircle className="w-4 h-4 mr-2" />
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

export default UploadImagesCreation;