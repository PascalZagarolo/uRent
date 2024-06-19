import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { notificationUnauthorized } from "@/db/schema";
import axios from "axios";
import { BellDotIcon, PencilIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { FaNewspaper } from "react-icons/fa";
import { MdCancelPresentation, MdOutlineLocalOffer } from "react-icons/md";


interface EditNotificationDialogProps {
    thisNotification: typeof notificationUnauthorized.$inferSelect;
}

const EditNotificationDialog: React.FC<EditNotificationDialogProps> = ({
    thisNotification
}) => {

    const [currentCategory, setCurrentCategory] = useState(thisNotification.notificationType as string)
    const [currentTitle, setCurrentTitle] = useState(thisNotification.title as string)
    const [currentContent, setCurrentContent] = useState(thisNotification.content as string)
    const [currentLink, setCurrentLink] = useState(thisNotification.link as string)
    const [currentUrl, setCurrentUrl] = useState(thisNotification.imageUrl as string)

    const [isPublic, setIsPublic] = useState(thisNotification.isPublic)

    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            const values = {
                title: currentTitle,
                content: currentContent,
                notificationType: currentCategory,
                isPublic: isPublic,
                link: currentLink,
                imageUrl: currentUrl
            }

            await axios.patch(`/api/globalnotifications/${thisNotification.id}/edit`, values)
                .then(() => {
                    router.refresh();
                    toast.success("Benachrichtigung erfolgreich bearbeitet")
                })
        } catch (error: any) {
            console.log(error);
            toast.error("Fehler beim Speichern der Benachrichtigung")
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-1/2 bg-indigo-800 text-gray-200 font-semibold hover:bg-indigo-900">
                    <PencilIcon className="w-4 h-4 mr-2" /> Benachrichtigung bearbeiten
                </Button>
            </DialogTrigger>
            <DialogContent className="border-none dark:bg-[#131313]">
                <div className="">
                    <div>
                        <h3 className="flex items-center text-md font-semibold">
                            <BellDotIcon className="w-4 h-4 mr-2" /> Benachrichtigung bearbeiten
                        </h3>
                    </div>
                    <div className="mt-4">
                        <div>
                            <Label>
                                Notifikationstyp
                            </Label>
                            <div className="">
                                <Select
                                    value={currentCategory}
                                    onValueChange={(value) => { setCurrentCategory(value) }}
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
                        </div>

                        <div className="mt-4">
                            <Label>
                                Titel
                            </Label>
                            <Input
                                value={currentTitle}
                                className="dark:border-none dark:bg-[#1c1c1c]"
                                onChange={(e) => { setCurrentTitle(e.target.value) }}
                            />
                        </div>
                        <div className="mt-4">
                            <Label>
                                Inhalt
                            </Label>
                            <Textarea
                                value={currentContent}
                                className="dark:border-none dark:bg-[#1c1c1c] h-[240px]"
                                onChange={(e) => { setCurrentContent(e.target.value) }}
                            />
                        </div>
                        <div className="mt-4">
                            <Label>
                                Referenzierender Link
                            </Label>
                            <Input
                                value={currentLink}
                                className="dark:border-none dark:bg-[#1c1c1c]"
                                onChange={(e) => { setCurrentLink(e.target.value) }}
                            />
                        </div>
                        {currentUrl ? (
                            <div className="w-full object-cover mt-4">
                                <Label>
                                    Verwendetes Bild
                                </Label>
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
                            <div className="mt-4">
                                <Label>
                                    Verwendetes Bild
                                </Label>
                                <div className="px-4  dark:bg-[#191919] w-full 
                                        dark:text-gray-200/90 items-center text-xs flex  h-[160px] justify-center" {...getRootProps()}>

                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <p>Ziehe hier rein</p>
                                    ) : (
                                        <p>Ziehe Bilder rein oder klicke hier</p>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="mt-2 flex items-center gap-x-2">
                            <Checkbox
                                checked={isPublic}
                                onCheckedChange={(value) => { setIsPublic(value as boolean) }}
                            />
                            <Label className="hover:underline hover:cursor-pointer" onClick={() => setIsPublic(!isPublic)}>
                                Benachrichtigung öffentlich anzeigen
                            </Label>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <DialogTrigger asChild>
                                <Button className="bg-indigo-800 text-gray-200 hover:bg-indigo-900 hover:text-gray-300"
                                    disabled={isLoading}
                                    onClick={onSubmit}
                                >
                                    Änderungen speichern
                                </Button>
                            </DialogTrigger>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditNotificationDialog; 1