'use client'

import { Alert } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { businessAddress } from "@/db/schema";
import axios from "axios";
import { CheckIcon, ImageIcon, MapPinIcon, PencilLineIcon, TrashIcon, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";

interface StandortProps {
    thisStandort: typeof businessAddress.$inferSelect;
    ownProfile: boolean;
}

const Standort: React.FC<StandortProps> = ({
    thisStandort,
    ownProfile
}) => {

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach((file) => {
            setSelectedImages((prevState) => [...prevState, file]);
        });


    }, []);

    const [selectedImages, setSelectedImages] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(thisStandort?.image);
    const [currentStreet, setCurrentStreet] = useState(thisStandort?.street);
    const [currentCity, setCurrentCity] = useState(thisStandort?.city);
    const [currentPostalCode, setCurrentPostalCode] = useState<string>(String(thisStandort?.postalCode));
    const [isLoading, setIsLoading] = useState(false);

    const [shownImage, setShownImage] = useState<string>(thisStandort?.image);

    const router = useRouter();

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop, maxFiles: 1 });



    const handleUpload = () => {
        const url = "https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload";
        const formData = new FormData();
        let file = selectedImages[0];
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
                console.log(data);
                setCurrentUrl(data.secure_url);
                setIsUploaded(true);
            });
    };

    const onEdit = async () => {
        try {
            const values = {
                street: currentStreet,
                city: currentCity,
                postalCode: Number(currentPostalCode),
                image: currentUrl
            }

            await axios.patch(`/api/businessAddress/${thisStandort.id}`, values).then(() => {
                router.refresh();
            })
            toast.success("Standort erfolgreich geändert");

        } catch {
            toast.error("Fehler beim Speichern");
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/businessAddress/${thisStandort.id}`).then(() => {
                router.refresh();
            })
            toast.success("Standort erfolgreich gelöscht");
        } catch {
            toast.error("Fehler beim Löschen");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <AlertDialog>
                <div className="dark:bg-[#191919]  rounded-t-md ">
                    <div className="sm:flex py-4 px-2 mt-4 items-center">
                        <div className="flex">
                        <MapPinIcon className="sm:h-4 w-6 h-6 sm:w-4 mr-2" />
                        <div className="sm:text-sm text-xs font-semibold">
                            {thisStandort?.street}, {thisStandort?.postalCode} {thisStandort?.city}, Deutschland
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
                    {thisStandort?.image ? (
                        <div className="w-full h-[100px] px-2 pb-2">
                            <Image
                                alt="map"
                                src={thisStandort?.image}
                                width={500}
                                height={300}
                                className="w-full object-cover h-[100px]"
                            />
                        </div>
                    ) : (
                        <div className="px-2 pb-2 text-xs flex justify-center ">
                            <div className="dark:bg-[#1C1C1C] w-full p-8 dark:text-gray-200/70 flex justify-center">
                                Kein Bild vorhanden..
                            </div>
                        </div>
                    )}
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


                                {selectedImages.length > 0 ? (
                                    <>
                                        {selectedImages.map((image, index) => (
                                            <Image src={`${URL.createObjectURL(image)}`} key={index}
                                                alt=""
                                                width={500}
                                                height={500}
                                                className="w-full object-cover h-[160px] mt-2"
                                            />
                                        ))}
                                        {isUploaded ? (
                                            <div className="text-xs gap-1 flex mt-2 items-center">

                                                <CheckIcon className="w-4 h-4 text-green-600" /> Hochgeladen

                                            </div>
                                        ) : (
                                            <Button onClick={handleUpload} variant="ghost" size="sm">
                                                Verwenden
                                            </Button>
                                        )}
                                    </>
                                ) : (
                                    shownImage ? (
                                        <Image src={shownImage}
                                            alt=""
                                            width={500}
                                            height={500}
                                            className="w-full object-cover h-[160px] mt-2"
                                        />
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
                                    )
                                )}

                                {(currentUrl || shownImage) && (
                                    <div className="ml-auto w-full flex justify-end">
                                        <Button size="sm" variant="ghost" onClick={() => { setShownImage(""); setSelectedImages([]); setCurrentUrl(""); }}>
                                            <X className="w-4 h-4" /> Entfernen
                                        </Button>
                                    </div>
                                )}



                            </div>

                            <div className="mt-4">
                                <Label className="font-semibold text-sm flex gap-x-2 items-center">
                                    <MapPinIcon className="w-4 h-4" /> Addresse
                                </Label>
                                <div>
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
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 w-full" >
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="ghost" className="w-full dark:bg-[#1C1C1C]"
                                            onClick={onEdit}
                                            disabled={currentStreet.trim() === "" || currentPostalCode === "" || currentCity.trim() === "" ||
                                                currentPostalCode.length !== 5 || isNaN(Number(currentPostalCode))}

                                        >
                                            Standort bearbeiten
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

export default Standort;