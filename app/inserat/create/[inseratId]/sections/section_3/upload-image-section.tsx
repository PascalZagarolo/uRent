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




interface UploadImagesSectionProps {
    thisInserat: typeof inserat.$inferSelect | any;
    currentSection: number;
    changeSection: (value: number) => void;
}

const UploadImagesSection = ({ thisInserat, currentSection, changeSection }: UploadImagesSectionProps) => {

    const [selectedImages, setSelectedImages] = useState<{ id: string; imageUrl: string; position: number }[]>(
        thisInserat?.images.map((image) => ({
            id: image.id,
            url: image.url,
            position: image.position
        })) || []
    );

    const params = useParams();
    const router = useRouter();

    const onSave = async () => {
        try {
            if (hasChanged) {
                let uploadData : { url : string, position : number }[] = [];
                for (const pImage of selectedImages) {
                    const returnedUrl = handleUpload2(pImage)
                    uploadData.push({url : returnedUrl, position : pImage.position})
                }

                const values = {
                    images: uploadData
                }
                await axios.post(`/api/inserat/${thisInserat?.id}/image/bulkUpload`, values)
               
            }
            changeSection(currentSection + 1);
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Speichern der Änderungen");
        }
    }

    const handleUpload2 = (file: any) => {
        const url = "https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload";
        const formData = new FormData();

        let responseUrl = "";

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
                responseUrl = data.secure_url;
            })

        return responseUrl;
    };

    const onPrevious = () => {
        changeSection(currentSection - 1);
    }

    const hasChanged = false;



    return (

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
            <div className="mt-4">

            </div>

            <div className=" flex flex-col mt-auto">
                <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer">
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
        </div>

    );
}

export default UploadImagesSection;