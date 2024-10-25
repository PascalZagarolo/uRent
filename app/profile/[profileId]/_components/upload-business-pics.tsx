'use client'

import { Button } from "@/components/ui/button";

import { businessImages } from "@/db/schema";
import axios from "axios";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { ImageIcon, RotateCwIcon, SaveAllIcon, Trash2Icon, TrashIcon, X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { GrAddCircle } from "react-icons/gr";
import { cn } from "@/lib/utils";

interface UploadBusinessPicsProps {
    usedImages: typeof businessImages.$inferSelect[];
    businessId: string;
    ownProfile: boolean;
}

const UploadBusinessPics: React.FC<UploadBusinessPicsProps> = ({
    usedImages,
    businessId,
    ownProfile
}) => {



    const [currentImage, setCurrentImage] = useState<any>(usedImages[0] ? usedImages[0] : null);
    const [uploadedFile, setUploadedFile] = useState<any>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);



    const onDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
        const newImages = acceptedFiles.map((file: File) => {
            // Create a temporary URL for the file
            setUploadedFile(file);
            const imageUrl = URL.createObjectURL(file);

            // Log the file and the generated URL

            const imageObject = { ...file, url: imageUrl };

            // You can now use the URL to set the image for preview or other purposes
            setCurrentImage(imageObject as any); // Assuming setCurrentImage is meant to handle the URL
            setShowDialog(true);

            // Do any additional processing if needed...
        });
    };

    const onImageClear = () => {
        setCurrentImage(null);
    }

    const router = useRouter();

    const onSave = async () => {
        try {
            setIsLoading(true);
            const uploadUrl = await handleUpload();

            const values = {
                image: uploadUrl
            }
            await axios.post(`/api/business/${businessId}/images`, values)
            setShowDialog(false);
            toast.success("Bild erfolgreich gespeichert");
            router.refresh()
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Speichern des Bildes");
        } finally {
            setIsLoading(false);
        }
    }

    const handleUpload = async (acceptedFiles?: any) => {
        try {
            setIsLoading(true);
            const url = "https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload";
            const formData = new FormData();

            let file: any;
            let imageUrl: string;

            file = uploadedFile;

            formData.append("file", file);
            formData.append("upload_preset", "oblbw2xl");
            const response = await fetch(url, {
                method: "POST",
                body: formData
            })
            const responseJson = await response.json();
            imageUrl = responseJson?.url;
            return imageUrl;
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Hochladen des Bildes");
        } finally {
            setIsLoading(false);
        }
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,

    } = useDropzone({
        //@ts-ignore
        onDrop, maxFiles: 1, accept: {
            'image/png': ['.jpeg', '.png', '.webp', '.jpg'],
        }
    });



    return (
        <div>

            {usedImages[0] && (

                <div>
                    <Button className="w-full h-[240px] relative overflow-hidden" onClick={() => { setShowDialog(true) }}>
                        <Image
                            src={usedImages[0]?.url}
                            quality={100}
                            fill
                            style={{ objectFit: "cover" }}
                            className="shadow-lg hover:cursor-pointer"
                            alt="Shitty Image Component i hate next/image"
                        />
                    </Button>
                    <div className="text-xs text-gray-200/60 mt-2 flex flex-row items-center">
                        <RotateCwIcon className="w-4 h-4 mr-2" />Klicke auf deinen Banner um ihn zu bearbeiten oder zu löschen
                    </div>
                </div>


            )}

            {!currentImage?.url && (
                <div>
                    <div>
                        <h3 className="text-lg font-semibold">
                            Profilbanner verwalten
                        </h3>
                    </div>
                    <div className={cn(" text-gray-200/80 bg-[#272727] bg-indigo-600/15 text-sm  flex justify-center py-20 shadow-lg items-center")}
                        {...getRootProps()} >
                        <input {...getInputProps()} />
                        <GrAddCircle className="w-4 h-4 mr-2" />
                        {isDragActive ? (
                            "Fotos hier ablegen.."
                        ) : (
                            "Fotos hinzufügen oder reinziehen.."
                        )}
                    </div>
                </div>
            )}
            <Dialog open={showDialog} onOpenChange={(e) => { setShowDialog(e) }}>
                <DialogContent className="dark:bg-[#191919] dark:border-none">
                    <div>
                        <div>
                            <h3 className="text-lg font-semibold">
                                Profilbanner bearbeiten
                            </h3>
                            <p className="text-gray-200/60 text-xs">
                                Dein Profilbanner wird öffentlich auf deinem Profil angezeigt und ist für viele Nutzer, das erste was sie sehen.
                            </p>
                        </div>
                        <div className="mt-4">
                            {currentImage ? (
                                <Image
                                    width={500}
                                    height={500}
                                    src={currentImage?.url}
                                    className="w-full h-40 object-cover"
                                    alt="Shitty Image Component i hate next/image"
                                />
                            ) : (
                                <div className="bg-[#131313] shadow-lg w-full h-40">
                                    <span className="text-sm text-gray-200/60 flex justify-center items-center h-full">
                                        Kein Bild ausgewählt
                                    </span>
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="mt-4">
                                <div className="flex flex-row items-center space-x-4">
                                    <Button className="text-gray-200 bg-[#222222] hover:bg-[#242424] shadow-lg w-1/2 items-center" {...getRootProps()} disabled={isLoading}>
                                        <input {...getInputProps()} />
                                        <RotateCwIcon className="w-4 h-4 mr-2" /> Banner ändern
                                    </Button>
                                    <Button className="text-gray-200 hover:text-gray-300 bg-rose-600 hover:bg-rose-700 w-1/2 items-center" disabled={isLoading}
                                        onClick={onImageClear}
                                    >
                                        <X className="w-4 h-4 text-gray-200 mr-2" /> Banner löschen
                                    </Button>
                                </div>
                                <div className="mt-2">
                                    <DialogTrigger asChild>
                                        <Button className="bg-indigo-800 hover:bg-indigo-900 w-full text-gray-200 hover:text-gray-300 items-center" onClick={onSave} disabled={isLoading}>
                                            <SaveAllIcon className="w-4 h-4 mr-2" />  Änderungen speichern
                                        </Button>
                                    </DialogTrigger>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UploadBusinessPics;