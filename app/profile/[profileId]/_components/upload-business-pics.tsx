'use client'

import { Button } from "@/components/ui/button";
import { businessImages, userTable } from "@/db/schema";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ImageIcon, RotateCwIcon, SaveAllIcon, Trash2Icon, TrashIcon, X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { GrAddCircle } from "react-icons/gr";
import { cn } from "@/lib/utils";
import Avatar from "./avatar";
import BusinessHeaderAvatar from "./business-header/business-header-avatar";
import ProfilePicBusiness from "./business-header/profile-pic-business";
import ContactUser from "./business-header/contact-user";
import UserOptions from "./business-render/user-options";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/cropImage";
import { HiInformationCircle } from "react-icons/hi";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoCropSharp } from "react-icons/io5";
import { FaExchangeAlt } from "react-icons/fa";

interface UploadBusinessPicsProps {
    usedImages: typeof businessImages.$inferSelect[];
    userImage: string;
    businessId: string;
    ownProfile: boolean;
    currentUser: typeof userTable.$inferSelect
}

const UploadBusinessPics: React.FC<UploadBusinessPicsProps> = ({
    usedImages,
    businessId,
    ownProfile,
    userImage,
    currentUser
}) => {
    const [finalImage, setFinalImage] = useState(usedImages[0]?.url ? usedImages[0]?.url : null);
    const [currentImage, setCurrentImage] = useState<any>(usedImages[0] ? usedImages[0] : null);
    const [uploadedFile, setUploadedFile] = useState<any>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);


    

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImageSrc(reader.result as string);
            setShowDialog(true);
        });
        reader.readAsDataURL(acceptedFiles[0]);
        setUploadedFile(acceptedFiles[0]);
    }, []);

    const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const uploadCroppedImage = async () => {
        try {
            setIsLoading(true);
            // Validate that imageSrc is not null, undefined, or empty
            if (!imageSrc) {
                toast.error("Kein Bild zum Zuschneiden vorhanden");
                return;
            }
            
            // Also check for valid croppedAreaPixels
            if (!croppedAreaPixels) {
                toast.error("Bitte wählen Sie einen Bildbereich aus");
                return;
            }
            
            const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);

            // Convert blob to a local object URL so it can be shown immediately
            const previewUrl = URL.createObjectURL(cropped);

            // Save cropped blob and show preview
            setCroppedBlob(cropped);
            setCurrentImage({ url: previewUrl }); // Show locally
            setImageSrc(null); // Close cropper
        } catch (e) {
            console.error(e);
            toast.error("Fehler beim Zuschneiden des Bildes");
        } finally {
            setIsLoading(false);
        }
    };



    const onSave = async () => {
        // Check if we have a blob to upload and a valid currentImage
        if (!croppedBlob || !currentImage || !currentImage.url || !currentImage.url.startsWith("blob:")) {
            toast.error("Bitte zuerst ein Bild zuschneiden");
            return;
        }

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("file", croppedBlob);
            formData.append("upload_preset", "oblbw2xl");

            const response = await fetch("https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            const uploadedImageUrl = data.secure_url;
            setFinalImage(uploadedImageUrl)
            // Update the real image URL in currentImage
            setCurrentImage({ url: uploadedImageUrl });

            const values = { image: uploadedImageUrl };

            // Persist to your DB
            await axios.post(`/api/business/${businessId}/images`, values);

            toast.success("Bild erfolgreich gespeichert.");
            
        } catch (e) {
            console.error(e);
            toast.error("Fehler beim Speichern.");
            setFinalImage(usedImages[0]?.url ? usedImages[0]?.url : "")
        } finally {
            setIsLoading(false);
        }
    };





    const onImageClear = () => {
        setCurrentImage(null);
        setImageSrc(null);
        setUploadedFile(null);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
        setCroppedAreaPixels(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: { 'image/png': ['.jpeg', '.png', '.webp', '.jpg'] }
    });

    return (
        <div className="relative">
            {(!currentImage?.url && !ownProfile) && (
                <div className="w-full py-20 relative overflow-hidden rounded-none sm:rounded-t-md bg-gradient-to-b from-[#16161f] to-[#1a1a25]" />
            )}

            {(currentImage && ownProfile) && (
                <div>
                    <Button className="w-full h-[320px] relative overflow-hidden rounded-none sm:rounded-t-md group" onClick={() => { setShowDialog(true) }}>
                        <Image
                            src={finalImage || "/placeholder-banner.jpg"}
                            quality={100}
                            fill
                            style={{ objectFit: "cover" }}
                            className="shadow-lg hover:cursor-pointer transition-all duration-300 group-hover:scale-105"
                            alt="Banner Image"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white text-lg font-medium">Banner bearbeiten</span>
                        </div>
                    </Button>
                </div>
            )}

{(currentImage && !ownProfile) && (
                <div className="w-full h-[320px] relative overflow-hidden rounded-none sm:rounded-t-md">
                    <Image
                        src={currentImage?.url}
                        quality={100}
                        fill
                        style={{ objectFit: "cover" }}
                        className="shadow-lg"
                        alt="Banner Image"
                    />
                </div>
            )}

            {(!currentImage?.url && ownProfile) && (
                <div className={cn("text-gray-200/80 bg-gradient-to-b from-[#16161f] to-[#1a1a25] text-sm flex justify-center py-24 shadow-lg items-center border border-indigo-900/20",
                    isDragActive && "border-indigo-600/40 bg-indigo-900/10")}
                    {...getRootProps()}>
                    <input {...getInputProps()} />
                    <GrAddCircle className="w-4 h-4 mr-2 text-indigo-400" />
                    {isDragActive ? "Fotos hier ablegen.." : "Fotos hinzufügen oder reinziehen.."}
                </div>
            )}

            <Dialog open={showDialog} onOpenChange={(e) => setShowDialog(e)}>
                <DialogContent className="dark:bg-[#16161f] dark:border-indigo-900/30 flex flex-col space-y-0 gap-0">
                    <div className="mb-2">
                        <h3 className="text-lg font-semibold text-gray-200">Profilbanner bearbeiten</h3>
                    </div>

                    {imageSrc && (
                        <div className="relative w-full h-[300px] bg-black rounded-lg overflow-hidden">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={3 / 1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                    )}

                    {!imageSrc && currentImage?.url && (
                        <div className="pb-4 hover:cursor-pointer group" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Image
                                width={500}
                                height={150}
                                src={currentImage?.url}
                                className="w-full h-40 object-cover shadow-lg rounded-lg transition-all duration-300 group-hover:scale-105"
                                alt="Selected Image"
                            />
                        </div>
                    )}

                    {!imageSrc && currentImage?.url && (
                        <div className="flex flex-row items-center text-sm text-gray-200/60">
                            <HiInformationCircle
                                className="w-4 h-4 mr-2 text-indigo-400"
                            />
                            Klicke auf den Banner, um ihn zu bearbeiten
                        </div>
                    )}

                    {imageSrc && (
                        <div>
                            <Button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white w-full mt-4" onClick={uploadCroppedImage} disabled={isLoading}>
                                <IoCropSharp className="w-4 h-4 mr-2" />
                                Bild zuschneiden
                            </Button>
                            <div className="mt-2 flex flex-row items-center space-x-2">
                                <Button className="w-1/2 bg-[#16161f] hover:bg-indigo-900/20 text-gray-200 border border-indigo-900/30"  {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <FaExchangeAlt
                                        className="w-4 h-4 mr-2"
                                    />
                                    Bild ändern
                                </Button>
                                <Button className="w-1/2 bg-rose-600/90 hover:bg-rose-700 text-gray-200"
                                    onClick={() => {
                                        setImageSrc(null);
                                        setZoom(1);
                                        setCroppedAreaPixels(null);
                                    }}
                                >
                                    <X
                                        className="w-4 h-4 mr-2"
                                    />
                                    Bild entfernen
                                </Button>
                            </div>
                        </div>
                    )}

                    {!imageSrc && (
                        <div className="">
                            <Button className="text-gray-200 bg-[#16161f] hover:bg-indigo-900/20 w-full mt-4 border border-indigo-900/30" onClick={onImageClear} disabled={isLoading}>
                                <FaDeleteLeft className="w-4 h-4 mr-2" /> Banner entfernen
                            </Button>
                        </div>
                    )}

                    <DialogTrigger asChild>
                        {!imageSrc && croppedBlob && (
                            <div>
                                <Button
                                    className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-gray-200 w-full mt-2"
                                    onClick={onSave}
                                    disabled={isLoading}
                                >
                                    <SaveAllIcon className="w-4 h-4 mr-2" /> Änderungen speichern
                                </Button>
                            </div>
                        )}
                    </DialogTrigger>
                </DialogContent>
            </Dialog>

            {ownProfile ? (
                <div className="absolute bottom-[-40px] left-8">
                    <BusinessHeaderAvatar existingImageUrl={userImage} userId={currentUser?.id} />
                </div>
            ) : (
                <div className="absolute bottom-[-40px] left-8">
                    <ProfilePicBusiness imageUrl={userImage} />
                </div>
            )}

            {!ownProfile && (
                <div className="absolute bottom-[-20px] right-8 flex flex-row items-center space-x-4">
                    <ContactUser currentUser={currentUser} />
                </div>
            )}
        </div>
    );
};

export default UploadBusinessPics;
