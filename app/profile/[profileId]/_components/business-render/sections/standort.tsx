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

    console.log(foundAddress);

    const onDrop = useCallback((acceptedFiles : any, rejectedFiles : any) => {
        try {
            setIsLoading(true);
            acceptedFiles.forEach((file : any) => {
                setSelectedImages((prevState) => [...prevState, file]);
                
            });
            
            handleUpload(acceptedFiles);
        } catch (e: any) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const [selectedImages, setSelectedImages] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);

    const onDelete = () => {
        setSelectedImages([]);
        setIsUploaded(false);
        setCurrentUrl("");
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop, maxFiles: 1, accept : { 
        'image/png': ['.jpeg', '.png', '.webp', '.jpg'],
    } });

    const handleUpload = (acceptedFiles? : any) => {
        try {
            setIsLoading(true);
            const url = "https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload";
            const formData = new FormData();
            
            let file : any;
            
            if(acceptedFiles) {
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
                    setIsUploaded(true);
                });
        } catch(e : any) {
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
            const values = {
                street: currentStreet,
                city: currentCity,
                postalCode: currentPostalCode,
                image: currentUrl,
                title : currentTitle
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
                <div className="p-4 rounded-t-md ">
                    <h1 className="text-md font-semibold sm:flex items-center">
                        <div className="flex items-center">
                            <BiLandscape className="w-4 h-4 mr-2" />  Standort
                        </div>
                        {ownProfile && (
                            <div className="sm:ml-auto w-full flex sm:justify-end justify-center">
                                <DialogTrigger asChild>
                                    <Button className="text-xs hover:underline bg-indigo-800 hover:bg-indigo-900" variant="ghost" size="sm">
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
                            .sort((a, b) => (a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1)) // Sort addresses with primary first
                            .map((address, index) => (
                                <div className="">
                                    <StandortDisplay
                                    thisStandort={address}
                                    ownProfile={ownProfile}
                                    key={index}
                                />
                                </div>
                            ))
                    ) : (
                        <div className="p-4 flex items-center justify-center text-sm dark:text-gray-200/70 text-gray-700/70">
                            Es wurden noch keine Standorte hinzugefügt..
                        </div>
                    )}
                </div>
            </div>
            <DialogContent className="dark:bg-[#191919] dark:border-none">
                <div>
                    <h1 className="font-semibold">
                        Standort hinzufügen
                    </h1>
                    <div className="mt-4">
                        <div>
                            <Label className="flex gap-x-2 items-center">
                                <ImageIcon className="w-4 h-4" />  Foto 
                                
                            </Label>
                            <p className="text-xs dark:text-gray-200/70 flex items-center">
                                Lade, falls gewünscht ein Bild von deinem Standort hoch
                                
                            </p>
                            <div className="ml-auto relative flex justify-end w-full">{currentUrl && (
                                <Button variant="ghost" size="sm" className="mt-2 " onClick={onDelete}>
                                <TrashIcon className="w-4 h-4 text-rose-600" /> 
                            </Button>
                            )}</div>

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
                                        <div className="text-xs gap-1 flex mt-2">

                                            <CheckIcon className="w-4 h-4 text-green-600" /> Hochgeladen
                                        </div>
                                    ) : (
                                        <Button onClick={handleUpload} variant="ghost" size="sm">
                                            Verwenden
                                        </Button>
                                    )}
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
                            <Label className="font-semibold text-base flex gap-x-2 items-center">
                                <MapPinIcon className="w-4 h-4" /> Addresse
                            </Label>
                            <div>
                                <div className="w-full ">
                                    <Label>
                                        Name des Standorts
                                    </Label>
                                    <Input 
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
                                            maxLength={5}
                                            onChange={(e) => setCurrentPostalCode(e.target.value)}
                                            placeholder="10100"
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="mt-4 w-full" >
                                <DialogTrigger asChild disabled={isLoading}>
                                    <Button size="sm" variant="ghost" className="w-full dark:bg-[#1C1C1C]"
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