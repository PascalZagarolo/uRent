'use client'

import { Button } from "@/components/ui/button";

import { businessImages } from "@/db/schema";
import axios from "axios";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { ImageIcon, Trash2Icon, TrashIcon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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



    const [currentImage, setCurrentImage] = useState(usedImages ? usedImages[0] : null);

    const [isLoading, setIsLoading] = useState(false);
    

    const onUpload = async () => {

    }







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
                                    src={currentImage?.url}


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
                                onClick={() => {setCurrentImage(null)}}
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
        </div>
    );
}

export default UploadBusinessPics;