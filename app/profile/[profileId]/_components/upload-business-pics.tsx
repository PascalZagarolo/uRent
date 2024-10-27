'use client'

import { Button } from "@/components/ui/button";
import { businessImages, userTable } from "@/db/schema";
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
import Avatar from "./avatar";
import BusinessHeaderAvatar from "./business-header/business-header-avatar";
import ProfilePicBusiness from "./business-header/profile-pic-business";
import ContactUser from "./business-header/contact-user";

interface UploadBusinessPicsProps {
    usedImages: typeof businessImages.$inferSelect[];
    userImage: string;
    businessId: string;
    ownProfile: boolean;
    currentUser : typeof userTable.$inferSelect
}

const UploadBusinessPics: React.FC<UploadBusinessPicsProps> = ({
    usedImages,
    businessId,
    ownProfile,
    userImage,
    currentUser
}) => {
    const [currentImage, setCurrentImage] = useState<any>(usedImages[0] ? usedImages[0] : null);
    const [uploadedFile, setUploadedFile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const onDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            setUploadedFile(file);
            const imageUrl = URL.createObjectURL(file);
            const imageObject = { ...file, url: imageUrl };
            setCurrentImage(imageObject as any);
            setShowDialog(true);
        });
    };

    const onImageClear = () => {
        setCurrentImage(null);
    };

    const router = useRouter();

    const onSave = async () => {
        try {
            if (ownProfile) {
                setIsLoading(true);
                const uploadUrl = await handleUpload();
                const values = { image: uploadUrl };
                await axios.post(`/api/business/${businessId}/images`, values);
                setShowDialog(false);
                toast.success("Bild erfolgreich gespeichert");
                router.refresh();
            }
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Speichern des Bildes");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async () => {
        try {
            setIsLoading(true);
            const url = "https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload";
            const formData = new FormData();
            formData.append("file", uploadedFile);
            formData.append("upload_preset", "oblbw2xl");

            const response = await fetch(url, { method: "POST", body: formData });
            const responseJson = await response.json();
            return responseJson?.url;
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Hochladen des Bildes");
        } finally {
            setIsLoading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        //@ts-ignore
        onDrop,
        maxFiles: 1,
        accept: { 'image/png': ['.jpeg', '.png', '.webp', '.jpg'] }
    });

    return (
        <div className="relative">
            {(usedImages[0]?.url && !ownProfile) && (
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full h-[320px] relative overflow-hidden">
                                <Image
                                    src={usedImages[0]?.url}
                                    quality={100}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="shadow-lg hover:cursor-pointer"
                                    alt="Banner Image"
                                />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="h-[320px] w-full">
                            <Image
                                src={usedImages[0]?.url}
                                quality={100}
                                fill
                                style={{ objectFit: "cover" }}
                                className="shadow-lg"
                                alt="Banner Image"
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            )}

            {(usedImages[0]?.url && ownProfile) && (
                <div>
                    <Button className="w-full h-[320px] relative overflow-hidden rounded-none rounded-t-md" onClick={() => { setShowDialog(true) }}>
                        <Image
                            src={usedImages[0]?.url}
                            quality={100}
                            fill
                            style={{ objectFit: "cover" }}
                            className="shadow-lg hover:cursor-pointer "
                            alt="Banner Image"
                        />
                    </Button>
                    {/* <div className="text-xs text-gray-200/60 mt-2 flex flex-row items-center">
                        <RotateCwIcon className="w-4 h-4 mr-2" />Klicke auf deinen Banner um ihn zu bearbeiten oder zu löschen
                    </div> */}
                </div>
            )}

            {!currentImage?.url && (
                <div>
                    <h3 className="text-lg font-semibold">Profilbanner verwalten</h3>
                    <div className={cn("text-gray-200/80 bg-[#272727] bg-indigo-600/15 text-sm flex justify-center py-20 shadow-lg items-center")}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <GrAddCircle className="w-4 h-4 mr-2" />
                        {isDragActive ? "Fotos hier ablegen.." : "Fotos hinzufügen oder reinziehen.."}
                    </div>
                </div>
            )}

            <Dialog open={showDialog} onOpenChange={(e) => { setShowDialog(e) }}>
                <DialogContent className="dark:bg-[#191919] dark:border-none">
                    <h3 className="text-lg font-semibold">Profilbanner bearbeiten</h3>
                    <p className="text-gray-200/60 text-xs">
                        Dein Profilbanner wird öffentlich auf deinem Profil angezeigt und ist für viele Nutzer das erste, was sie sehen.
                    </p>
                    <div className="mt-4">
                        {currentImage ? (
                            <Image
                                width={500}
                                height={500}
                                src={currentImage?.url}
                                className="w-full h-40 object-cover"
                                alt="Selected Image"
                            />
                        ) : (
                            <div className="bg-[#131313] shadow-lg w-full h-40 flex justify-center items-center">
                                <span className="text-sm text-gray-200/60">Kein Bild ausgewählt</span>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 flex space-x-4">
                        <Button className="text-gray-200 bg-[#222222] hover:bg-[#242424] shadow-lg w-1/2" {...getRootProps()} disabled={isLoading}>
                            <input {...getInputProps()} />
                            <RotateCwIcon className="w-4 h-4 mr-2" /> Banner ändern
                        </Button>
                        <Button className="text-gray-200 bg-rose-600 hover:bg-rose-700 w-1/2" onClick={onImageClear} disabled={isLoading}>
                            <X className="w-4 h-4 mr-2" /> Banner löschen
                        </Button>
                    </div>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-800 hover:bg-indigo-900 w-full mt-2" onClick={onSave} disabled={isLoading}>
                            <SaveAllIcon className="w-4 h-4 mr-2" /> Änderungen speichern
                        </Button>
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
                <div className="absolute bottom-[-20px] right-8">
                    <ContactUser
                        currentUser={currentUser}
                    />
                </div>
            )}
        </div>
    );
};

export default UploadBusinessPics;
