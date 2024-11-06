'use client'

import { Alert } from "@/components/ui/alert";
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
import { CheckIcon, ImageIcon, MapPinIcon, PencilLineIcon, TrashIcon, X } from "lucide-react";
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
        isDragAccept,
        isDragReject,
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
                <div className={cn("dark:bg-[#222222] mt-4 rounded-t-md shadow-lg rounded-lg")}>

                    {thisStandort?.image ? (
                        <>

                            <Image src={thisStandort?.image}
                                alt=""
                                width={500}
                                height={500}
                                className="w-full object-cover h-[160px] mt-2"
                            />


                        </>
                    ) : (
                        <div className="w-full h-[160px] bg-[#222222] shadow-lg">
                            <span className="flex justify-center h-full items-center">
                                <IoMdLocate className="w-12 h-12 text-gray-200/60 mx-auto" />
                            </span>
                        </div>
                    )}
                    <div className="sm:flex p-2  items-center" >
                        <div >

                            <div className="sm:text-base text-xs px-2 font-semibold w-full break-all line-clamp-1 gap-x-2  items-center">

                                {thisStandort?.title}
                            </div>
                        </div>
                        {ownProfile && (
                            <div className="flex space-0 justify-end ml-auto">
                                <DialogTrigger asChild>
                                    <Button className="" variant="ghost" size="sm">
                                        <FaRegEdit className="w-4 h-4" />
                                    </Button>
                                </DialogTrigger>
                                <AlertDialogTrigger asChild>
                                    <Button className="" variant="ghost" size="sm">
                                        <TrashIcon className="w-4 h-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="dark:bg-[#191919] dark:border-none">
                                    <div>
                                        <h1 className="flex items-center">
                                            <X className="w-4 h-4 mr-2" />Standort löschen?
                                        </h1>
                                        <p className="flex dark:text-gray-200/70 text-xs">
                                            Diese Aktion kann nicht rückgängig gemacht werden.
                                        </p>
                                        <div className="mt-4 w-full flex justify-end">
                                            <AlertDialogCancel className="dark:border-none">
                                                Abbrechen
                                            </AlertDialogCancel>
                                            <AlertDialogAction className="dark:bg-rose-800 hover:dark:bg-rose-700 dark:text-gray-200"
                                                onClick={onDelete}>
                                                Löschen
                                            </AlertDialogAction>
                                        </div>
                                    </div>
                                </AlertDialogContent>
                            </div>
                        )}
                    </div>
                    <div className="flex p-2">
                        <MapPinIcon className="sm:h-4 w-6 h-6 sm:w-4 mr-2 text-rose-900" />
                        <div className="sm:text-sm text-xs font-semibold text-gray-200/95">
                        {thisStandort?.street}, {thisStandort?.postalCode} {thisStandort?.city}
                        </div>
                    </div>
                </div>
                <DialogContent className="dark:bg-[#191919] dark:border-none">
                    <div>

                        <h1 className="font-semibold w-full flex items-center">
                            Standort bearbeiten

                        </h1>


                        <div className="mt-4">
                            <div>
                                <Label className="flex gap-x-2">
                                    <ImageIcon className="w-4 h-4" />  Foto
                                </Label>
                                <p className="text-xs dark:text-gray-200/70">
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
                                            className="w-full object-cover h-[160px] mt-2"
                                        />

                                        <div className="flex flex-row items-center w-full space-x-4 mt-2">

                                            <Button className="bg-[#222222] shadow-lg hover:bg-[#292929] w-1/2" variant="ghost"
                                                {...getRootProps()}
                                            >
                                                <input {...getInputProps()} />
                                                <FaExchangeAlt className="w-4 h-4 mr-2" /> Bild ändern
                                            </Button>

                                            <Button className="w-1/2 bg-rose-600 hover:bg-rose-700 shadow-lg text-gray-200 hover:text-gray-300"
                                                onClick={onDelete}
                                            >
                                                <TrashIcon className="w-4 h-4 mr-2" />  Bild löschen
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-16 mt-2 dark:bg-[#1C1C1C] border border-dashed
                             dark:text-gray-200/90 items-center text-xs flex w-full justify-center" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {isDragActive ? (
                                            <p>Ziehe hier rein</p>
                                        ) : (
                                            <p>Ziehe Bilder rein oder klicke hier</p>
                                        )}
                                    </div>
                                )}





                            </div>

                            <div className="mt-4">
                                <Label className="font-semibold text-sm flex gap-x-2 items-center">
                                    <MapPinIcon className="w-4 h-4" /> Addresse
                                </Label>
                                <div>
                                    <div className="w-full">
                                        <Label className="font-semibold">
                                            Name des Standorts
                                        </Label>
                                        <Input
                                            value={currentTitle}
                                            className="dark:bg-[#1C1C1C] border-none"
                                            onChange={(e) => setCurrentTitle(e.target.value)}
                                            placeholder="z.B. Autohaus Mömer"
                                            maxLength={120}
                                        />
                                    </div>
                                    <div className="w-full flex gap-4">
                                        <div className="w-full mt-2">
                                            <Label className="font-semibold">
                                                Straße
                                            </Label>
                                            <Input
                                                value={currentStreet}
                                                className="dark:bg-[#1C1C1C] border-none"
                                                onChange={(e) => setCurrentStreet(e.target.value)}
                                                placeholder="Musterstraße 13"
                                                maxLength={60}
                                            />
                                        </div>

                                    </div>
                                    <div className="w-full flex gap-4">
                                        <div className="w-1/2 mt-2">
                                            <Label className="font-semibold">
                                                Stadt
                                            </Label>
                                            <Input
                                                value={currentCity}
                                                className="dark:bg-[#1C1C1C] border-none"
                                                onChange={(e) => setCurrentCity(e.target.value)}
                                                placeholder="Musterstadt"
                                                maxLength={60}
                                            />
                                        </div>
                                        <div className="w-1/2 mt-2">
                                            <Label className="font-semibold">
                                                PLZ
                                            </Label>
                                            <Input
                                                className="dark:bg-[#1C1C1C] border-none"
                                                value={currentPostalCode}
                                                onChange={(e) => setCurrentPostalCode(e.target.value)}
                                                placeholder="10100"
                                                maxLength={5}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-centerg gap-x-2">
                                        <Checkbox
                                            checked={isPrimary}
                                            onClick={onPrimary}
                                        /> <Label>
                                            Primärer Standort
                                            <Popover>
                                                <PopoverTrigger className="ml-2">
                                                    <IoMdInformationCircleOutline />
                                                </PopoverTrigger>
                                                <PopoverContent className="dark:bg-indigo-950 text-sm  dark:text-gray-200 flex ">
                                                    Falls du mehrere Standorte hast, kannst du einen primären Standort festlegen.
                                                    Dieser wird neben deinen Inseraten angezeigt, sowie in deinem Profil hervorgehoben.

                                                </PopoverContent>
                                            </Popover>
                                        </Label>
                                    </div>
                                </div>
                                <div className="mt-4 w-full" >
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="ghost" className="w-full dark:bg-[#1C1C1C]"
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