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

    const [isLoading, setIsLoading] = useState(false);

    const oldImages: { id: string; url: string; position: number, wholeFile: any }[] = thisInserat?.images.map((image) => ({
        id: image.id,
        url: image.url,
        position: image.position,
    })) || []

    const hasChanged = JSON.stringify(selectedImages) !== JSON.stringify(oldImages);

    const router = useRouter();

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    const MAX_RETRIES = 3;

    const onSave = async (redirect?: boolean, previous?: boolean) => {
        try {
            
            if (isLoading) {
                console.log("isLoading")
                return;
                
            }
            setIsLoading(true);
            if (hasChanged) {
                const uploadData: { url: string, position: number }[] = [];

                for (const pImage of selectedImages) {
                    let returnedUrl = "";

                    if (pImage.wholeFile) {
                        returnedUrl = await retryUpload(pImage.wholeFile);

                        if (isValidUrl(returnedUrl)) {
                            setSelectedImages((prev) =>
                                prev.map((item) => item.id === pImage.id ? { ...item, url: returnedUrl, wholeFile: null } : item)
                            );
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

            if (redirect) {
                router.push(`/inserat/create/${thisInserat.id}`);
                router.refresh();
            } else if (previous) {
                const params = new URLSearchParams();
                params.set('sectionId', String(2));
                window.history.pushState(null, '', `?${params.toString()}`);
            } else {
                changeSection(currentSection + 1);
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
            const url = await handleUpload2(file);
            if (isValidUrl(url)) {
                return url;
            }
            console.log(`Upload attempt ${attempt} failed, retrying...`);
        }
        return "";
    };

    const handleUpload2 = async (file: File): Promise<string> => {
        try {
            console.log("Uploading image...");
            const url = "https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload";
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "oblbw2xl");

            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                console.log("Network response was not ok", response);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            return data.secure_url;
        } catch (e: any) {
            console.log("Upload error:", e);
            return "";
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to validate URLs
    const isValidUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch (_) {
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
                    <RenderContinue isLoading={isLoading} disabled={isLoading} onClick={() => onSave()} hasChanged={hasChanged} />
                </div>
            </div>
            {showDialog && <SaveChangesDialog open={showDialog} onChange={setShowDialog} onSave={onSave} />}
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={3} />}
        </>
    );
}

export default UploadImagesSection;