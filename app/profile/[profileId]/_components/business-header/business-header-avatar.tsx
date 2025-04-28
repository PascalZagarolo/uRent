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
import { ImageIcon, XIcon } from "lucide-react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/cropImage"; // ⬅️ Utility we'll add next
import { FaExchangeAlt } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { HiInformationCircle } from "react-icons/hi";

interface BusinessHeaderAvatarProps {
    existingImageUrl: string;
    userId: string;
}

const BusinessHeaderAvatar: React.FC<BusinessHeaderAvatarProps> = ({
    existingImageUrl,
    userId,
}) => {


    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });

    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [currentUrl, setCurrentUrl] = useState(existingImageUrl);

    const onDrop = useCallback((acceptedFiles: any[]) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImageSrc(reader.result as string);
        });
        reader.readAsDataURL(acceptedFiles[0]);
    }, []);

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const uploadCroppedImage = async () => {
        try {
            setIsLoading(true);
            const croppedBlob = await getCroppedImg(imageSrc!, croppedAreaPixels);
            const formData = new FormData();
            formData.append("file", croppedBlob);
            formData.append("upload_preset", "oblbw2xl");

            const response = await fetch("https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            setCurrentUrl(data.secure_url);
            setImageSrc(null); // Close cropper
        } catch (e) {
            console.error(e);
            toast.error("Fehler beim Hochladen des Bildes");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteImageCurrent = () => {
        setCurrentUrl("");
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': [],
        }
    });

    const onUploadConfirm = () => {
        try {
            const usedParam = userId ? userId : params.profileId;
            setIsLoading(true);
            axios.patch(`/api/profile/${usedParam}/profilepicture`, {
                image: currentUrl,
            }).then(() => {
                router.refresh();
                toast.success("Profilbild gespeichert");
            });
        } catch (error) {
            toast.error("Fehler beim Upload");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <div className="relative sm:h-[132px] sm:w-[132px] h-[80px] w-[80px] shadow-lg rounded-full overflow-hidden group cursor-pointer border-2 border-indigo-900/30">
                        <img
                            src={existingImageUrl || "/placeholder-person.jpg"}
                            className="rounded-full object-cover sm:h-[132px] h-[80px] sm:w-[132px] w-[80px] transition-all duration-300 group-hover:scale-110"
                            alt="Person"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                            <span className="text-white text-xl sm:text-2xl"><ImageIcon className="w-6 h-6" /></span>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="dark:border-indigo-900/30 dark:bg-[#16161f]">
                    <div className="flex flex-col items-center">

                        {!imageSrc && (
                            <div {...getRootProps()} 
                            className={cn(
                                "p-4 rounded-full text-gray-300 text-center flex items-center justify-center h-[200px] cursor-pointer border-2 border-dashed border-indigo-900/30",
                                imageSrc && "dark:bg-[#1C1C1C]",
                                isDragActive && "border-indigo-600/40 bg-indigo-900/10"
                            )}>
                                <input {...getInputProps()} />
                                {currentUrl ? (
                                    <div className="flex flex-col items-center">
                                        <Image
                                            src={currentUrl}
                                            width={160}
                                            height={160}
                                            className="rounded-full object-cover w-[160px] border-2 border-indigo-900/30"
                                            alt="Profilbild"
                                        />
                                        <p className="text-sm flex flex-row items-center text-gray-200/60 w-full mt-2">
                                            <HiInformationCircle 
                                             className="w-4 h-4 mr-2 text-indigo-400"
                                            />
                                            Klicke auf das Bild, um es zu ändern
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-200 text-center">Bild hochladen <br /> oder <br /> hinein ziehen</p>
                                )}
                            </div>
                        )}

                        {imageSrc && (
                            <div className="relative w-[250px] h-[250px] bg-black rounded-full overflow-hidden">
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                            </div>
                        )}

                        {imageSrc && (
                            <Button className="mt-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 w-full text-white" onClick={uploadCroppedImage} disabled={isLoading}>
                                <FiUpload className="mr-2" /> Bild zuschneiden
                            </Button>
                        )}
                        {imageSrc && (
                            <div className="flex flex-row items-center mt-2 space-x-2 w-full">
                                <Button {...getRootProps()}
                                    className="bg-[#16161f] hover:bg-indigo-900/20 text-gray-200 border border-indigo-900/30 w-1/2">
                                    <input {...getInputProps()} />
                                    <FaExchangeAlt
                                        className="w-4 h-4 mr-2"
                                    />
                                    Bild ändern
                                </Button>
                                <Button
                                    onClick={() => {
                                        setImageSrc("");
                                        setCroppedAreaPixels(null);
                                        setZoom(1)
                                    }}
                                    className="w-1/2 bg-rose-600/90 hover:bg-rose-700 text-gray-200">
                                    <XIcon
                                        className="w-4 h-4 mr-2"
                                    />
                                    Bild entfernen
                                </Button>
                            </div>
                        )}

                        {!imageSrc && (
                            <div className="mt-4 w-full">
                                <Button className="w-full bg-[#16161f] hover:bg-indigo-900/20 text-gray-200 border border-indigo-900/30" onClick={handleDeleteImageCurrent}>
                                    <FaDeleteLeft className="mr-2" /> Profilbild entfernen
                                </Button>
                                <DialogTrigger asChild>
                                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white mt-2" onClick={onUploadConfirm} disabled={isLoading || currentUrl === existingImageUrl}>
                                        <MdSaveAlt className="mr-2" /> Profilbild speichern
                                    </Button>
                                </DialogTrigger>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BusinessHeaderAvatar;
