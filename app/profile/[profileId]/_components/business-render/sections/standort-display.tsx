'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { businessAddress } from "@/db/schema";
import { cn } from "@/lib/utils";

import axios from "axios";
import { CheckIcon, ImageIcon, MapPinIcon, TrashIcon, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { FaExchangeAlt, FaRegEdit } from "react-icons/fa";
import { IoMdInformationCircleOutline, IoMdLocate } from "react-icons/io";

interface StandortDisplayProps {
    thisStandort: typeof businessAddress.$inferSelect;
    ownProfile: boolean;
}

const StandortDisplay: React.FC<StandortDisplayProps> = ({
    thisStandort,
    ownProfile
}) => {
    const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
        try {
            setIsLoading(true);
            setDeleteImage(false);
            acceptedFiles.forEach((file: any) => {
                setSelectedImage(file);
            });
        } catch (e: any) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const [selectedImage, setSelectedImage] = useState();
    const [isUploaded, setIsUploaded] = useState(false);

    const [currentTitle, setCurrentTitle] = useState(thisStandort?.title);
    const [currentStreet, setCurrentStreet] = useState(thisStandort?.street);
    const [currentCity, setCurrentCity] = useState(thisStandort?.city);
    const [currentPostalCode, setCurrentPostalCode] = useState<string>(String(thisStandort?.postalCode));
    const [isLoading, setIsLoading] = useState(false);
    const [isPrimary, setIsPrimary] = useState(thisStandort?.isPrimary);

    const [shownImage, setShownImage] = useState<string>(thisStandort?.image);
    
    const [deleteImage, setDeleteImage] = useState(false);

    const router = useRouter();

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({ onDrop, maxFiles: 1 });



    const handleUpload = async (acceptedFiles?: any) => {
        try {
            setIsLoading(true);
            const url = "https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload";
            const formData = new FormData();

            let file: any;

            if (acceptedFiles) {
                file = acceptedFiles[0];

            } else {
                file = selectedImage;

            }
            formData.append("file", file);
            formData.append("upload_preset", "oblbw2xl");
            const response = await fetch(url, {
                method: "POST",
                body: formData
            })
            const formattedResponse = await response.json();
            return formattedResponse.secure_url;

        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Hochladen des Bildes");
        } finally {
            setIsLoading(false);
        }
    };

    const onEdit = async () => {
        try {
            let url;

            if (selectedImage) {
                console.log("selectedImage", selectedImage);
                url = await handleUpload();
            } else if (deleteImage) {
                url = null;
            }
            else {
                url = thisStandort?.image;
            }
            console.log(url)
            const values = {
                street: currentStreet,
                city: currentCity,
                postalCode: Number(currentPostalCode),
                image: url,
                title: currentTitle
            }

            setSelectedImage(undefined);
            await axios.patch(`/api/businessAddress/${thisStandort.id}`, values)
            router.refresh();

            toast.success("Standort erfolgreich geändert");

        } catch {
            toast.error("Fehler beim Speichern");
        }
    }

    const onDelete = async () => {
        setDeleteImage(true);
        setSelectedImage(undefined);
    }

    const onPrimary = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/businessAddress/${thisStandort.id}/primary`).then(() => {
                router.refresh();
            })
            setIsPrimary(true);
            toast.success("Standort erfolgreich als primär festgelegt");
        } catch {
            toast.success("Fehler beim festlegen des primären Standortes");
        } finally {
            setIsLoading(false);
        }
    }

    const onDeleteImage = () => {
        setSelectedImage(undefined);
        setShownImage("");
        setIsUploaded(false);

    }

    return (
        <Dialog>
            <AlertDialog>
                <div className={cn("dark:bg-gradient-to-b from-[#1a1a25] to-[#1a1a25]/90 mt-4 rounded-lg border border-indigo-900/20 shadow-lg")}>

                    {thisStandort?.image ? (
                        <Image src={thisStandort?.image}
                            alt=""
                            width={500}
                            height={500}
                            className="w-full object-cover h-[160px] rounded-t-lg"
                        />
                    ) : (
                        <div className="w-full h-[160px] bg-[#1a1a25] rounded-t-lg flex items-center justify-center">
                            <IoMdLocate className="w-12 h-12 text-indigo-400/30" />
                        </div>
                    )}
                    <div className="sm:flex p-4 items-center">
                        <div className="flex items-center gap-x-2">
                            {thisStandort?.isPrimary && (
                                <div className="flex items-center gap-x-1 bg-indigo-900/20 px-2 py-1 rounded-md">
                                    <CheckIcon className="w-3 h-3 text-indigo-400" />
                                    <span className="text-xs text-indigo-400">Primär</span>
                                </div>
                            )}
                            <div className="text-base font-semibold text-gray-200 w-full break-all line-clamp-1">
                                {thisStandort?.title}
                            </div>
                        </div>
                        {ownProfile && (
                            <div className="flex space-x-2 justify-end ml-auto mt-2 sm:mt-0">
                                <DialogTrigger asChild>
                                    <Button className="hover:bg-indigo-900/20 transition-all duration-300" variant="ghost" size="sm">
                                        <FaRegEdit className="w-4 h-4 text-indigo-400" />
                                    </Button>
                                </DialogTrigger>
                                <AlertDialogTrigger asChild>
                                    <Button className="hover:bg-rose-900/20 transition-all duration-300" variant="ghost" size="sm">
                                        <TrashIcon className="w-4 h-4 text-rose-400" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="dark:bg-[#1a1a25] dark:border-indigo-900/30">
                                    <div>
                                        <h1 className="flex items-center text-gray-200">
                                            <X className="w-4 h-4 mr-2 text-rose-400" /> Standort löschen?
                                        </h1>
                                        <p className="text-xs text-gray-200/60 mt-1">
                                            Diese Aktion kann nicht rückgängig gemacht werden.
                                        </p>
                                        <div className="mt-4 w-full flex justify-end gap-x-2">
                                            <AlertDialogCancel className="dark:border-indigo-900/30 hover:bg-indigo-900/20">
                                                Abbrechen
                                            </AlertDialogCancel>
                                            <AlertDialogAction className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-gray-200
                                                transition-all duration-300 hover:shadow-rose-900/20"
                                                onClick={onDelete}>
                                                Löschen
                                            </AlertDialogAction>
                                        </div>
                                    </div>
                                </AlertDialogContent>
                            </div>
                        )}
                    </div>
                    <div className="flex p-4 pt-0 items-center">
                        <MapPinIcon className="h-4 w-4 mr-2 text-indigo-400" />
                        <div className="sm:text-sm text-xs font-semibold text-gray-200/95">
                            {thisStandort?.street}, {thisStandort?.postalCode} {thisStandort?.city}
                        </div>
                    </div>
                </div>
                <DialogContent className="dark:bg-[#1a1a25] dark:border-indigo-900/30">
                    <div>
                        <h1 className="font-semibold text-gray-200 flex items-center">
                            <MapPinIcon className="w-4 h-4 mr-2 text-indigo-400" /> Standort bearbeiten
                        </h1>

                        <div className="mt-4">
                            <div>
                                <Label className="flex gap-x-2 items-center text-gray-200">
                                    <ImageIcon className="w-4 h-4 text-indigo-400" /> Foto
                                </Label>
                                <p className="text-xs text-gray-200/60 mt-1">
                                    Lade, falls gewünscht ein Bild von deinem Standort hoch
                                </p>

                                {((selectedImage || thisStandort?.image) && !deleteImage) ? (
                                    <>
                                        <Image src={
                                            selectedImage ? URL.createObjectURL(selectedImage) : thisStandort?.image
                                        }
                                            alt=""
                                            width={500}
                                            height={500}
                                            className="w-full object-cover h-[160px] mt-2 rounded-lg border border-indigo-900/30 hover:border-indigo-400/30 transition-all duration-300"
                                        />

                                        <div className="flex flex-row items-center w-full space-x-4 mt-2">
                                            <Button className="bg-[#1a1a25] hover:bg-indigo-900/20 w-1/2 border border-indigo-900/30 
                                                transition-all duration-300 hover:border-indigo-400/30" variant="ghost"
                                                {...getRootProps()}
                                            >
                                                <input {...getInputProps()} />
                                                <FaExchangeAlt className="w-4 h-4 mr-2 text-indigo-400" /> Bild ändern
                                            </Button>

                                            <Button className="w-1/2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-gray-200
                                                transition-all duration-300 hover:shadow-rose-900/20"
                                                onClick={onDelete}
                                            >
                                                <TrashIcon className="w-4 h-4 mr-2" /> Bild löschen
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-16 mt-2 bg-[#1a1a25] border border-dashed border-indigo-900/30
                                        text-gray-200/90 items-center text-xs flex w-full justify-center rounded-lg
                                        hover:border-indigo-400/30 transition-all duration-300" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {isDragActive ? (
                                            <p className="text-indigo-400">Ziehe hier rein</p>
                                        ) : (
                                            <p>Ziehe Bilder rein oder klicke hier</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="mt-4">
                                <Label className="font-semibold text-base flex gap-x-2 items-center text-gray-200">
                                    <MapPinIcon className="w-4 h-4 text-indigo-400" /> Addresse
                                </Label>
                                <div className="space-y-4 mt-2">
                                    <div className="w-full">
                                        <Label className="text-gray-200/80">
                                            Name des Standorts
                                        </Label>
                                        <Input
                                            value={currentTitle}
                                            className="bg-[#1a1a25] border-indigo-900/30 text-gray-200 placeholder:text-gray-200/40
                                                focus:border-indigo-400/30 transition-all duration-300"
                                            onChange={(e) => setCurrentTitle(e.target.value)}
                                            placeholder="z.B. Autohaus Mömer"
                                            maxLength={120}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Label className="font-semibold text-gray-200/80">
                                            Straße
                                        </Label>
                                        <Input
                                            value={currentStreet}
                                            className="bg-[#1a1a25] border-indigo-900/30 text-gray-200 placeholder:text-gray-200/40
                                                focus:border-indigo-400/30 transition-all duration-300"
                                            onChange={(e) => setCurrentStreet(e.target.value)}
                                            placeholder="Musterstraße 13"
                                            maxLength={60}
                                        />
                                    </div>
                                    <div className="w-full flex gap-4">
                                        <div className="w-1/2">
                                            <Label className="font-semibold text-gray-200/80">
                                                Stadt
                                            </Label>
                                            <Input
                                                value={currentCity}
                                                className="bg-[#1a1a25] border-indigo-900/30 text-gray-200 placeholder:text-gray-200/40
                                                    focus:border-indigo-400/30 transition-all duration-300"
                                                onChange={(e) => setCurrentCity(e.target.value)}
                                                placeholder="Musterstadt"
                                                maxLength={60}
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <Label className="font-semibold text-gray-200/80">
                                                PLZ
                                            </Label>
                                            <Input
                                                className="bg-[#1a1a25] border-indigo-900/30 text-gray-200 placeholder:text-gray-200/40
                                                    focus:border-indigo-400/30 transition-all duration-300"
                                                value={currentPostalCode}
                                                onChange={(e) => setCurrentPostalCode(e.target.value)}
                                                placeholder="10100"
                                                maxLength={5}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-x-2">
                                        <Checkbox
                                            checked={isPrimary}
                                            onClick={onPrimary}
                                            className="border-indigo-900/30 data-[state=checked]:bg-indigo-600"
                                        />
                                        <Label className="text-gray-200/80">
                                            Primärer Standort
                                            <Popover>
                                                <PopoverTrigger className="ml-2">
                                                    <IoMdInformationCircleOutline className="text-indigo-400" />
                                                </PopoverTrigger>
                                                <PopoverContent className="dark:bg-[#1a1a25] dark:border-indigo-900/30 text-sm text-gray-200/80">
                                                    Falls du mehrere Standorte hast, kannst du einen primären Standort festlegen.
                                                    Dieser wird neben deinen Inseraten angezeigt, sowie in deinem Profil hervorgehoben.
                                                </PopoverContent>
                                            </Popover>
                                        </Label>
                                    </div>
                                </div>
                                <div className="mt-6 w-full">
                                    <DialogTrigger asChild>
                                        <Button size="sm" className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white
                                            transition-all duration-300 hover:shadow-indigo-900/20"
                                            onClick={onEdit}
                                            disabled={currentStreet.trim() === "" || currentPostalCode === "" || currentCity.trim() === "" ||
                                                currentPostalCode.length !== 5 || isNaN(Number(currentPostalCode))}
                                        >
                                            Änderungen speichern
                                        </Button>
                                    </DialogTrigger>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </AlertDialog>
        </Dialog>
    );
}

export default StandortDisplay;