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
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import RenderContinue from "../_components/render-continue";
import ShowPrivatizeDialog from "../_components/show-privatize-dialog";







interface UploadImagesSectionProps {
    thisInserat: typeof inserat.$inferSelect | any;
    currentSection: number;
    changeSection: (value: number) => void;
}

const UploadImagesSection = ({ thisInserat, currentSection, changeSection }: UploadImagesSectionProps) => {

    const [selectedImages, setSelectedImages] = useState<{ id: string; url: string; position: number, wholeFile: any }[]>(
        thisInserat?.images.map((image) => ({
            id: image.id,
            url: image.url,
            position: image.position,
        })) || []
    );  

    useEffect(() => {
        JSON.stringify(selectedImages) !== JSON.stringify(oldImages) ? setHasChanged(true) : setHasChanged(false)
    },[selectedImages])

    const [isLoading, setIsLoading] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const oldImages: { id: string; url: string; position: number, wholeFile: any }[] = thisInserat?.images.map((image) => ({
        id: image.id,
        url: image.url,
        position: image.position,
    })) || []

    const [hasChanged, setHasChanged] = useState(JSON.stringify(selectedImages) !== JSON.stringify(oldImages));

    const router = useRouter();

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);
    const [showPrivate, setShowPrivate] = useState(false);

    const showPrivateDialog = selectedImages?.length == 0;

    const MAX_RETRIES = 3;

    const onSave = async (redirect?: boolean, previous?: boolean, confirmDelete? : boolean) => {
        try {
            if (isLoading) {
                return setIsLoading(true);
            }

            setIsLoading(true);

            if(showPrivateDialog && !confirmDelete && thisInserat?.isPublished) {
                setShowPrivate(true);
                return
            }

            let uploadData : { url: string, position: number }[] = [];
        
            
            const oldData = [...selectedImages]; // Copy the current state, if something fails later..
    
            if (hasChanged) {
                setHasChanged(false);
               const updatedImages = [...selectedImages]; // Copy the current state
    
                for await (const pImage of selectedImages) {
                    let returnedUrl = "";
    
                    if (pImage.wholeFile) {
                        returnedUrl = await retryUpload(pImage.wholeFile);
    
                        if (isValidUrl(returnedUrl)) {
                            const index = updatedImages.findIndex((item) => item.id === pImage.id);
                            if (index !== -1) {
                                updatedImages[index] = { ...pImage, url: returnedUrl, wholeFile: null };
                                
                            }
                        } else {
                            console.log(`Failed to upload image after ${MAX_RETRIES} attempts.`);
                            toast.error("Image upload failed. Please try again.");
                            continue;
                        }
                    } else {
                        returnedUrl = pImage.url;
                    }
    
                    if (isValidUrl(returnedUrl)) {
                        uploadData.push({ url: returnedUrl, position: pImage.position });
                    }
                }
    
               
               
    
                const values = { updatedImages: uploadData };
                await axios.post(`/api/inserat/${thisInserat?.id}/image/bulkUpload`, values);
                router.refresh();
            }
    
            if (previous) {
                const params = new URLSearchParams();
                params.set('sectionId', String(2));
                window.history.pushState(null, '', `?${params.toString()}`);
            } else {

                if (uploadData?.some((image) => !isValidUrl(image.url))) {
                    setHasChanged(true);
                    setSelectedImages(oldData);
                    setIsLoading(false);
                    return toast.error("Bitte versuche es erneut...");
                } else {
                    router.refresh();
                    changeSection(4);
                }
            }
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Speichern der Änderungen");
        } finally {
            setIsLoading(false);
        }
    };
    
    

    const retryUpload = async (file: File): Promise<string> => {
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            
            const url = await handleUpload(file);
            if (isValidUrl(url)) {
                return url;
            } else {
                console.log(`Upload attempt ${attempt} failed, retrying...`);
                break;   
            }
        }
        return "";
    };

    const handleUpload = async (file: File): Promise<string> => {
        const url = "https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload";
        const formData = new FormData();
        
        formData.append("file", file);
        formData.append("upload_preset", "oblbw2xl");
    
        try {
            const response = await axios.post(url, formData);

            return response.data.secure_url;
    
        } catch (error) {
            console.error("Error during upload:", error);
            return "";
        } finally {
            setIsLoading(false);
        }
    };
    

    const isValidUrl = (url: string): boolean => {
        try {
            // Try creating a new URL to ensure it's a valid URL
            new URL(url);
            // Return false if the URL contains "blob:"
            return !url.includes("blob:");
        } catch (_) {
            // If new URL() fails, it’s an invalid URL
            return false;
        }
    };









   

    useEffect(() => {
        if (!hasChanged) return
        function handleBeforeUnload(event: BeforeUnloadEvent) {
            event.preventDefault();
            return (event.returnValue = '');
        }
        window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
        }
    }, [hasChanged])

   

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
                <div className="flex flex-row items-center">
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                    </span>
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer ml-auto" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 12)}>
                        Zur Ende springen <MdOutlineKeyboardDoubleArrowRight className="w-4 h-4 mr-2" />
                    </span>
                </div>
                <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 3)}>
                        Zurück
                    </Button>
                    <RenderContinue isLoading={isLoading || isTransitioning} disabled={isLoading || isTransitioning} onClick={() => onSave()} hasChanged={hasChanged} />
                </div>
            </div>
            {showDialog && <SaveChangesDialog open={showDialog} onChange={setShowDialog} onSave={onSave} />}
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={3} />}
            {showPrivate && <ShowPrivatizeDialog  open={showPrivate} onChange={setShowPrivate} onSave={() => onSave(undefined, undefined, true)}
                                text={"Du hast keine Bilder hochgeladen, oder deine Bilder entfernt."}
                />}
        </>
    );
}

export default UploadImagesSection;