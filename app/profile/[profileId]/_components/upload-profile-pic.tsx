'use client';

import axios from "axios";

import { useParams, useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FiUpload } from "react-icons/fi";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdSaveAlt } from "react-icons/md";
import Image from "next/image";
import { SaveIcon } from "lucide-react";

interface UploadProfilePicProps {
    existingImageUrl: string;
    userId : string;
}

const UploadProfilePic: React.FC<UploadProfilePicProps> = ({
    existingImageUrl,
    userId,
}) => {
    
    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState<any>([]);
    const [currentUrl, setCurrentUrl] = useState("");

    const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
        try {
            setIsLoading(true);
            acceptedFiles.forEach((file: any) => {
                setSelectedImages((prevState) => [...prevState, file]);

            });

            handleUpload(acceptedFiles);
        } catch (e: any) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, []);


    const handleUpload = (acceptedFiles?: any) => {
        try {
            setIsLoading(true);
            const url = "https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload";
            const formData = new FormData();

            let file: any;

            if (acceptedFiles) {
                file = acceptedFiles[0];

            } else {
                file = selectedImages[0];

            }
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
                    setCurrentUrl(data.secure_url);
                });
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
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop, maxFiles: 1 });



    const handleDeleteImage = () => {
        try {
            const usedParam = userId ? userId : params.profileId
            setIsLoading(true)
            axios.patch(`/api/profile/${usedParam}/profilepicture`, {
                image: null
            }).then(() => {
                router.refresh();
            })
            toast.success("Profilbild entfernt")
        } catch {
            toast.error("Fehler beim Upload")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteImageCurrent = () => {
        setCurrentUrl("");
    }

    const onUploadConfirm = () => {
        try {
            const usedParam = userId ? userId : params.profileId;
            setIsLoading(true);
            axios.patch(`/api/profile/${usedParam}/profilepicture`, {
                image: currentUrl
            }).then(() => {
                router.refresh();
                toast.success("Profilbild gespeichert")
            })
        } catch (error: any) {
            toast.error("Fehler beim Upload")
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="">
            <Dialog>
                <DialogTrigger>
                    <Button className="dark:bg-[#191919] p-4 dark:text-gray-200 dark:hover:bg-[#171717] dark:hover:text-gray-300">
                        <FiUpload className="w-4 h-4 mr-2" />  Profilbild bearbeiten
                    </Button>
                </DialogTrigger>
                <DialogContent className="dark:border-none dark:bg-[#191919]">
                    <div>
                        <div className="flex justify-center">
                            {currentUrl ? (
                                <div className=" mt-2 dark:bg-[#1C1C1C] rounded-full border border-dashed
                                        dark:text-gray-200/90 items-center text-xs flex w-[160px] h-[160px] justify-center" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Image 
                                src={currentUrl}
                                width={160}
                                height={160}
                                className="rounded-full w-full h-full object-cover"
                                alt="Profilbild"
                                />
                            </div>
                            ) : (
                                <div className="p-4 mt-2 dark:bg-[#1C1C1C] rounded-full border border-dashed
                                        dark:text-gray-200/90 items-center text-xs flex w-[160px] h-[160px] justify-center" {...getRootProps()}>
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p>Ziehe hier rein</p>
                                ) : (
                                    <p>Ziehe Bilder rein oder klicke hier</p>
                                )}
                            </div>
                            )}

                        </div>
                        <div className="text-sm hover:underline flex justify-center mt-2"
                        {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            Profilbild ändern
                        </div>
                        <div className="mt-4 w-full">
                            
                                <Button className="w-full bg-rose-800 hover:bg-rose-900
                             text-gray-200 hover:text-gray-300"
                                    onClick={handleDeleteImageCurrent}>
                                    <FaDeleteLeft className="w-4 h-4 mr-2" /> Profilbild entfernen
                                </Button>
                            
                            <DialogTrigger asChild>
                                <Button className="w-full bg-[#131313] hover:bg-[#111111]
                             text-gray-200 hover:text-gray-300 mt-2"
                             disabled={isLoading || currentUrl === existingImageUrl}
                                    onClick={onUploadConfirm}>
                                    <MdSaveAlt  className="w-4 h-4 mr-2" /> Profilbild speichern
                                </Button>
                            </DialogTrigger>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UploadProfilePic;