'use client'

import { inserat } from "@/db/schema";

import { useEffect, useState } from "react";
import DescriptionInserat from "../../../_components/input-fields/description-inserat";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import UploadImagesCreation from "./_components/upload-image";
import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import { useRouter } from "next/navigation";
import SaveChangesDialog from "../_components/save-changes-dialog";
import { cn } from "@/lib/utils";
import SaveChangesPrevious from "../_components/save-changes-previous";






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

    const router = useRouter();

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    const onSave = async (redirect? : boolean, previous?: boolean) => {
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
                                return { ...item, url: returnedUrl, wholeFile: null };
                            }
                            return item;
                        }))
                        
                    }

                    uploadData.push({ url: returnedUrl, position: pImage.position });
                }
    
                const values = {
                    updatedImages: uploadData
                };
                console.log(values)
                await axios.post(`/api/inserat/${thisInserat?.id}/image/bulkUpload`, values);
                router.refresh();
            }
            if(redirect) {
                router.push(`/inserat/create/${thisInserat.id}`);
                router.refresh();
              } else if (previous) {
                
                const params = new URLSearchParams("")
                params.set('sectionId', String(2))
                window.history.pushState(null, '', `?${params.toString()}`)
            } else {
                changeSection(currentSection + 1);
              }
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
            console.log(data.secure_url)
            return data.secure_url;  // Return the secure_url directly
        } catch (e: any) {
            console.log(e);
            return ""; // Return an empty string if there's an error
        }
    };
    

    const onPrevious = () => {
        changeSection(currentSection - 1);
    }


    const hasChanged = 
    selectedImages.some((image) => image.wholeFile !== null) || 
    thisInserat?.images.length !== selectedImages.length ||
    //check if images were deleted 
    thisInserat?.images.some((image, index) => {
        return !selectedImages.some(selectedImage => selectedImage.id === image.id);
    });
    //check if images were added
    selectedImages.some(selectedImage => {
        return !thisInserat?.images.some(image => image.id === selectedImage.id);
    });
    //check if position were changed
    selectedImages.some(selectedImage => {
        return !thisInserat?.images.some(image => image.position === selectedImage.position);
    })

    useEffect(() => {
        if(!hasChanged) return
        function handleBeforeUnload(event : BeforeUnloadEvent) {
            event.preventDefault();
            return(event.returnValue = '');
        }
        window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });
        
        return() => {
            window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
        }
    },[hasChanged])

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
            <div className={cn("mt-4", selectedImages?.length > 2 && "mb-4")}>
                <UploadImagesCreation
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    existingSubscription={thisInserat?.user?.subscription}
                />
            </div>
            

            
        </div>
        <div className=" flex flex-col mt-auto">
                <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}
>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                </span>
                <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 3)}>
                        Zurück
                    </Button>
                    <Button className="bg-indigo-800 text-gray-200 w-full  hover:bg-indigo-900 hover:text-gray-300"
                        onClick={() => onSave()}
                    >
                        Speichern & Fortfahren <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
            {showDialog && <SaveChangesDialog  open={showDialog} onChange={setShowDialog} onSave={onSave}/>}
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={3}/>}
        </>
    );
}

export default UploadImagesSection;