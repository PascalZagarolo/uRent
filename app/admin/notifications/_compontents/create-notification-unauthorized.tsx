'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select, SelectContent, SelectGroup, SelectItem,
    SelectLabel, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { FaNewspaper } from "react-icons/fa";
import { MdCancelPresentation, MdOutlineLocalOffer, MdOutlinePublic } from "react-icons/md";
import { RiShareBoxLine } from "react-icons/ri";

const CreateNotificationUnauthorized = () => {

    const [currentTitle, setCurrentTitle] = useState("");
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentContent, setCurrentContent] = useState("");
    const [currentLink, setCurrentLink] = useState("");
    const [showLoggedInUsers, setShowLoggedInUsers] = useState(false);

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







    const router = useRouter();

    const onSubmit = async () => {
        try {
            const values = {
                title: currentTitle,
                category: currentCategory,
                content: currentContent,
                link: currentLink,
                showLoggedInUsers: showLoggedInUsers,
                imageUrl: currentUrl
            }
            console.log(values)
            await axios.post(`/api/globalnotifications`, values)
                .then(() => {
                    toast.success("Notifikation erfolgreich erstellt")
                    setCurrentContent("");
                    setCurrentCategory("");
                    setCurrentLink("");
                    setCurrentTitle("");
                    setCurrentLink("");
                    setCurrentUrl("");
                    setShowLoggedInUsers(false);
                    router.refresh();
                })

        } catch (error: any) {
            toast.error("Fehler beim erstellen")
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <div>
                    <h3 className="font-semibold text-lg flex items-center">
                        <MdOutlinePublic className="w-4 h-4 mr-2" />   Globale Notifikation erstellen (nicht eingeloggt)
                    </h3>
                    <p className="text-xs text-gray-200/60">
                        Erstelle eine Notifikation für alle Nutzer die nicht eingeloggt sind.
                    </p>
                </div>
                <div className="mt-4 w-full gap-x-4 flex items-center">
                    <div className="w-1/2 ">
                        <Label>
                            Notifikationstyp
                        </Label>
                        <Select
                        value={currentCategory}
                        onValueChange={(value) => { setCurrentCategory(value)}}
                        >
                            <SelectTrigger className="w-full dark:border-none mt-2 bg-[#191919] ">
                                <SelectValue placeholder="Wähle dein Notifikationstyp" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#191919] dark:border-none flex items-center">
                                <SelectGroup>
                                    <SelectItem value={null} className="flex items-center">Beliebig</SelectItem>
                                    <SelectItem value="OFFER" className="flex items-center">
                                        <div className="flex items-center">
                                            <MdOutlineLocalOffer className="w-4 h-4 mr-2" /> Angebot
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="NEWS" className="flex items-center">
                                        <div className="flex items-center">
                                            <FaNewspaper className="w-4 h-4 mr-2" /> Neuigkeiten
                                        </div>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-1/2">
                        <Label>
                            Titel
                        </Label>
                        <Input
                            value={currentTitle}
                            placeholder="Neuigkeiten zu XY.."
                            className="mt-2 bg-[#191919] dark:border-none"
                            onChange={(e) => { setCurrentTitle(e.target.value) }}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <Label className="font-semibold">
                        Inhalt der Notifikation
                    </Label>
                    <Textarea
                        value={currentContent}
                        className="dark:bg-[#191919] dark:border-none mt-2"
                        placeholder="Jetzt neu..."
                        onChange={(e) => { setCurrentContent(e.target.value) }}
                    />
                </div>
                <div className="mt-4">
                    <Label className="font-semibold">
                        Bild (optional)
                    </Label>
                    {currentUrl ? (
                        <div className="w-full  object-cover mt-2">
                            <Image
                                className="w-full object-cover h-[160px]"
                                src={currentUrl}
                                width={1000}
                                height={1000}
                                alt="Bild"
                            />
                            <div className="flex justify-end">
                                <Button className="bg-rose-800 hover:bg-rose-900
                                 text-gray-200 hover:text-gray-300 rounded-none rounded-b-md"
                                    size="sm"

                                    onClick={() => { setCurrentUrl("") }}
                                >
                                    <MdCancelPresentation className="w-4 h-4 mr-2" /> Bild entfernen
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4  dark:bg-[#191919] w-full 
                                        dark:text-gray-200/90 items-center text-xs flex  h-[160px] justify-center mt-2" {...getRootProps()}>
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
                    <Label className="font-semibold">
                        Referenzierter Link (optional)
                    </Label>
                    <Input
                        value={currentLink}
                        className="dark:bg-[#191919] dark:border-none mt-2"
                        placeholder="https://www.urent-rental.de/pricing"
                        onChange={(e) => { setCurrentLink(e.target.value) }}
                    />
                </div>
                <div className="mt-4 flex items-center gap-x-2">
                    <Checkbox
                        checked={showLoggedInUsers}
                        onCheckedChange={(checked) => { setShowLoggedInUsers(Boolean(checked)) }}
                    />
                    <Label className="hover:underline hover:cursor-pointer"
                        onClick={() => setShowLoggedInUsers(!showLoggedInUsers)}
                    >
                        Benachrichtigung auch für eingeloggte Nutzer
                    </Label>
                </div>
                <div className="w-full flex justify-end">
                    <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300"
                    onClick={onSubmit}
                    >
                        Benachrichtigung erstellen
                    </Button>
                </div>
            </div>
            <h2 className="mt-8 text-sm font-semibold">
                Vorschau
            </h2>
            <div className=" bg-[#191919] p-4  rounded-md">
                {currentUrl && (
                    <div>
                        <Image
                            src={currentUrl}
                            className="w-full h-[160px] object-cover rounded-md"
                            width={1000}
                            height={1000}
                            alt="Bild"
                        />
                    </div>
                )}
                <div className="flex items-center gap-x-2">
                    {currentLink ? (
                        <div className={cn("font-semibold flex items-center", currentLink && "underline")}>
                            {currentTitle ? currentTitle : "Titel"}
                        </div>
                    ) : (
                        <a className={cn("font-semibold flex items-center", currentLink && "underline")}
                            href={currentLink ? currentLink : "#"}
                            target="_blank"
                        >
                            {currentTitle ? currentTitle : "Titel"} {currentLink && <RiShareBoxLine className="w-4 h-4 ml-2" />}
                        </a>
                    )}
                </div>
                <div className={cn("mt-2 text-sm", !currentContent && "text-gray-200/60")}>
                    {currentContent ? currentContent : "Inhalt.."}
                </div>
            </div>
        </div>
    );
}

export default CreateNotificationUnauthorized;