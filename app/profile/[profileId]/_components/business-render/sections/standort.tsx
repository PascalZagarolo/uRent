'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, ImageIcon, MapPinIcon, MapPinOffIcon, PlusSquareIcon, TrashIcon } from "lucide-react";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiLandscape } from "react-icons/bi";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { businessAddress } from "@/db/schema";
import Standort from "../../standort";
import StandortDisplay from "./standort-display";
import { FaExchangeAlt } from "react-icons/fa";



interface StandortRenderProps {
    ownProfile: boolean;
    businessId: string;
    foundAddress: typeof businessAddress.$inferSelect[];
}

const StandortRender: React.FC<StandortRenderProps> = ({
    ownProfile,
    businessId,
    foundAddress
}) => {



    const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
        try {
            setIsLoading(true);
            acceptedFiles.forEach((file: any) => {
                console.log(file)
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

    const onDelete = () => {
        setSelectedImage(undefined);
        setIsUploaded(false);
        setCurrentUrl("");
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop, maxFiles: 1, accept: {
            'image/png': ['.jpeg', '.png', '.webp', '.jpg'],
        }
    });

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
                // .then((response) => {
                //     return response.json();
                // })
                // .then((data) => {

                //     setCurrentUrl(data.secure_url);
                //     setIsUploaded(true);
                // });
            const formattedResponse = await response.json();
           
            
            return formattedResponse.secure_url;
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Hochladen des Bildes");
        } finally {
            setIsLoading(false);
        }
    };

    const [currentTitle, setCurrentTitle] = useState("");
    const [currentStreet, setCurrentStreet] = useState("");
    const [currentCity, setCurrentCity] = useState("");
    const [currentPostalCode, setCurrentPostalCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [currentUrl, setCurrentUrl] = useState("")

    const router = useRouter();



    const onCreate = async () => {
        try {
            setIsLoading(true);
            const uploadUrl = await handleUpload();
            const values = {
                street: currentStreet,
                city: currentCity,
                postalCode: currentPostalCode,
                image: uploadUrl,
                title: currentTitle
            }

            await axios.post(`/api/business/${businessId}/businessAddress`, values);
            toast.success("Standort hinzugefügt");
            router.refresh();
        } catch {
            toast.error("Fehler beim Hinzufügen des Standorts");

        } finally {
            setIsLoading(false)
        }
    }


    return (
        <Dialog>
            <div>
                <div className="p-4 rounded-t-md bg-gradient-to-b from-[#1a1a25] to-[#1a1a25]/90 border border-indigo-900/20">
                    <h1 className="text-md font-semibold sm:flex items-center text-gray-200">
                        <div className="flex items-center">
                            <BiLandscape className="w-4 h-4 mr-2 text-indigo-400" />  Standort
                        </div>
                        {ownProfile && (
                            <div className="sm:ml-auto w-full flex sm:justify-end justify-center">
                                <DialogTrigger asChild>
                                    <Button className="text-xs bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white 
                                        transition-all duration-300 hover:shadow-indigo-900/20" variant="ghost" size="sm">
                                        <PlusSquareIcon className="w-4 h-4 mr-2" />   Standort hinzufügen
                                    </Button>
                                </DialogTrigger>
                            </div>
                        )}
                    </h1>
                </div>
                <div className="pb-8">
                    {foundAddress?.length > 0 ? (
                        foundAddress
                            .sort((a, b) => (a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1))
                            .map((address, index) => (
                                <div className="" key={index}>
                                    <StandortDisplay
                                        thisStandort={address}
                                        ownProfile={ownProfile}
                                        key={index}
                                    />
                                </div>
                            ))
                    ) : (
                        <div className="p-4 flex items-center justify-center text-sm text-gray-200/70">
                            Es wurden noch keine Standorte hinzugefügt..
                        </div>
                    )}
                </div>
            </div>
            <DialogContent className="dark:bg-[#1a1a25] dark:border-indigo-900/30">
                <div>
                    <h1 className="font-semibold text-gray-200 flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-2 text-indigo-400" /> Standort hinzufügen
                    </h1>
                    <div className="mt-4">
                        <div>
                            <Label className="flex gap-x-2 items-center text-gray-200">
                                <ImageIcon className="w-4 h-4 text-indigo-400" />  Foto
                            </Label>
                            <p className="text-xs text-gray-200/60 flex items-center mt-1">
                                Lade, falls gewünscht ein Bild von deinem Standort hoch
                            </p>
                            <div className="ml-auto relative flex justify-end w-full">{currentUrl && (
                                <Button variant="ghost" size="sm" className="mt-2 hover:bg-indigo-900/20" onClick={onDelete}>
                                    <TrashIcon className="w-4 h-4 text-rose-400" />
                                </Button>
                            )}</div>

                            {selectedImage ? (
                                <>
                                    <Image src={`${URL.createObjectURL(selectedImage)}`} 
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
                                            <TrashIcon className="w-4 h-4 mr-2" />  Bild löschen
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
                                            maxLength={5}
                                            onChange={(e) => setCurrentPostalCode(e.target.value)}
                                            placeholder="10100"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 w-full" >
                                <DialogTrigger asChild disabled={isLoading}>
                                    <Button size="sm" className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white
                                        transition-all duration-300 hover:shadow-indigo-900/20"
                                        onClick={onCreate}
                                        disabled={currentStreet.trim() === "" || currentPostalCode === "" || currentCity.trim() === "" ||
                                            currentPostalCode.length !== 5 || isNaN(Number(currentPostalCode)) || isLoading || !currentTitle ||
                                            currentTitle.trim() === ""
                                        }
                                    >
                                        Standort hinzufügen
                                    </Button>
                                </DialogTrigger>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default StandortRender;