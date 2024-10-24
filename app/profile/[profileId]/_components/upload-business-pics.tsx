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



    const [currentImage, setCurrentImage] = useState(usedImages[0]?.url ? usedImages[0]?.url : null);

    const [isLoading, setIsLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);



    const onDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
        const newImages = acceptedFiles.map((file: File) => {
            // Create a temporary URL for the file
            const imageUrl = URL.createObjectURL(file);
    
            // Log the file and the generated URL
            console.log('File:', file);
            console.log('Image URL:', imageUrl);
    
            // You can now use the URL to set the image for preview or other purposes
            setCurrentImage(imageUrl); // Assuming setCurrentImage is meant to handle the URL
            setShowDialog(true);
    
            // Do any additional processing if needed...
        });
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
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="w-full h-[240px] relative overflow-hidden">
                            <Image
                                src={usedImages[0].url}
                                quality={100}
                                fill
                                style={{ objectFit: "cover" }}
                                className="shadow-lg hover:cursor-pointer"
                                alt="Shitty Image Component i hate next/image"
                            />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="bg-[#191919] border-none">
                        <div>
                            <h3 className="text-lg font-semibold">
                                Banner bearbeiten
                            </h3>
                            <div className="mt-4">
                                <img
                                    src={currentImage}


                                    style={{ objectFit: "cover" }}
                                    className="shadow-lg w-full h-[240px] object-cover"
                                    alt="Shitty Image Component i hate next/image"
                                />
                            </div>
                            <div className="w-full flex-row  flex items-center mt-2 space-x-8">
                                <Button className="w-1/2 bg-[#222222] shadow-lg hover:bg-[#212121] text-gray-200 hover:text-gray-300">
                                    <ImageIcon className="w-4 h-4 mr-2" /> Bild ersetzen
                                </Button>
                                <Button className="w-1/2 bg-rose-600 text-gray-200 hover:bg-rose-700 hover:text-gray-300"
                                    onClick={() => { setCurrentImage(null) }}
                                >
                                    <Trash2Icon className="w-4 h-4 mr-2" /> Bild löschen
                                </Button>
                            </div>
                            <div className="mt-2">
                                <Button className="w-full bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300" disabled>
                                    Änderungen speichern
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {!usedImages[0] && (
                <div>
                    <div>
                        <h3 className="text-lg font-semibold">
                            Profilbanner verwalten
                        </h3>
                    </div>
                    <div className={cn(" text-gray-200/80 bg-[#272727] bg-indigo-600/15 text-sm  flex justify-center py-20 shadow-lg items-center")}
                        {...getRootProps()}>
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
            <Dialog open={showDialog} onOpenChange={(e) => {setShowDialog(e)}}>
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
                                    <Image 
                                    width={500}
                                    height={500}
                                    src={currentImage}
                                     className="w-full h-40 object-cover"
                                     alt="Shitty Image Component i hate next/image"
                                    />
                                </div>
                                <div>
                                    <div className="mt-4">
                                        <div className="flex flex-row items-center space-x-4">
                                            <Button className="text-gray-200 bg-[#222222] hover:bg-[#242424] shadow-lg w-1/2 items-center">
                                                <RotateCwIcon className="w-4 h-4 mr-2" />Banner ändern
                                            </Button>
                                            <Button className="text-gray-200 hover:text-gray-300 bg-rose-600 hover:bg-rose-700 w-1/2 items-center">
                                               <X className="w-4 h-4 text-gray-200 mr-2" /> Banner löschen
                                            </Button>
                                        </div>
                                        <div className="mt-2">
                                            <Button className="bg-indigo-800 hover:bg-indigo-900 w-full text-gray-200 hover:text-gray-300 items-center">
                                             <SaveAllIcon className="w-4 h-4 mr-2" />  Änderungen speichern
                                            </Button>
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