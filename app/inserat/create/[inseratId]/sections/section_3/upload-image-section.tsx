'use client'

import { inserat } from "@/db/schema";

import { useState } from "react";
import DescriptionInserat from "../../../_components/input-fields/description-inserat";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import UploadImagesCreation from "./_components/upload-image";
import { set } from 'date-fns';
import { useParams, useRouter } from "next/navigation";
import { switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";




interface UploadImagesSectionProps {
    thisInserat: typeof inserat.$inferSelect | any;
    currentSection: number;
    changeSection: (value: number) => void;
}

const UploadImagesSection = ({ thisInserat, currentSection, changeSection }: UploadImagesSectionProps) => {

    const [selectedImages, setSelectedImages] = useState<{ id: string; url: string; position: number, wholeFile : any }[]>(
        thisInserat?.images.map((image) => ({
            id: image.id,
            url: image.url,
            position: image.position,
        })) || []
    );



    const onSave = async () => {
        try {
            if (hasChanged) {
                let uploadData: { url: string, position: number }[] = [];
    
                for (const pImage of selectedImages) {
                    let returnedUrl: string = pImage.url;
    
                    if (pImage.wholeFile) {
                        returnedUrl = await handleUpload2(pImage.wholeFile);
                        setSelectedImages((prev) => prev.map((item) => {
                            if (item.id === pImage.id) {
                                //remove wholeFile from item , so data doesnt get uploaded twice
                                return { ...item, imageUrl: returnedUrl, wholeFile: null };
                            }
                            return item;
                        }))
                        
                    }

                    uploadData.push({ url: returnedUrl, position: pImage.position });
                }
    
                const values = {
                    updatedImages: uploadData
                };
    
                await axios.post(`/api/inserat/${thisInserat?.id}/image/bulkUpload`, values);
            }
            changeSection(currentSection + 1);
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Speichern der Änderungen");
        }
    };
    
    const handleUpload2 = async (file: any) => {
        try {
            const url = "https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload";
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "oblbw2xl");
    
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            return data.secure_url;  // Return the secure_url directly
        } catch (e: any) {
            console.log(e);
            return ""; // Return an empty string if there's an error
        }
    };
    

    const onPrevious = () => {
        changeSection(currentSection - 1);
    }

    const hasChanged = true;



    return (
<>
        <div className="h-full flex flex-col">
            <h3 className="text-lg font-semibold">
                Fahrzeug Bilder
                <p className="text-xs text-gray-200/60 font-medium text-left">
                    Lade Bilder von deinem Fahrzeug hoch. <br />
                    Wähle Bilder aus, die dein Fahrzeug gut repräsentieren.
                </p>
            </h3>
            <div className="mt-4">
                <UploadImagesCreation
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    existingSubscription={thisInserat?.user?.subscription}
                />
            </div>
            

            
        </div>
        <div className=" flex flex-col mt-auto">
                <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer" onClick={switchSectionOverview}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                </span>
                <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={onPrevious}>
                        Zurück
                    </Button>
                    <Button className="bg-indigo-800 text-gray-200 w-full  hover:bg-indigo-900 hover:text-gray-300"
                        onClick={onSave}
                    >
                        Fortfahren <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </>
    );
}

export default UploadImagesSection;