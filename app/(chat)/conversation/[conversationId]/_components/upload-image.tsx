'use client';

import axios from "axios";

import { useParams, useRouter  } from "next/navigation";
import { CldUploadButton } from 'next-cloudinary';
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { IoIosSend } from "react-icons/io";
import { CiStickyNote } from "react-icons/ci";
import { set } from 'date-fns';


interface UploadImageProps {
    otherUser : string;
    otherUserName : string;
}

const UploadImage = ({
    otherUser,
    otherUserName
} : UploadImageProps) => {

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

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop, maxFiles: 1, accept : { 
        'image/png': ['.jpeg', '.png', '.webp', '.jpg'],
    } });

    const [selectedImages, setSelectedImages] = useState([]);
    const [currentUrl, setCurrentUrl] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const [currentNote, setCurrentNote] = useState("");

    

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
                    setIsUploaded(true);
                });
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Hochladen des Bildes");
        } finally {
            setIsLoading(false);
        }
    };

    const params = useParams();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (result : any) => {
        try {
            
            const values = {
                content : currentNote,
                image : result,
                otherUser : otherUser,
                otherUserName : otherUserName
            }

            setIsLoading(true)
            axios.post(`/api/message/${params.conversationId}/image`, values).then(() => {
                setCurrentUrl("");
                setCurrentNote("");
                toast.success("Bild erfolgreich gesendet")
            })
            
        } catch(e : any) {
            toast.error("Fehler beim Upload")
            console.log(e);
        } finally {
            setIsLoading(false)
            setTimeout(() => {
                router.refresh()  
            }, 1000)
        }
    }
    

    return ( 
        
            <div>
                <Button
            
            
            asChild
            {...getRootProps()}
            className="hover:bg-gray-800"
            >
            <div className="mr-2  p-2 rounded-md items-center dark:bg-[#060606] ">
            <input {...getInputProps()} />
                    <ImageIcon className="text-black dark:text-gray-200 h-6 w-6" />
                
            </div>
            </Button>
            {currentUrl && (
                <Dialog
                open={currentUrl ? true : false} 
                onOpenChange={(e) => {
                    if(e === false) {
                        setCurrentUrl("");
                        setCurrentNote("");
                    }
                }}
                >
                    <DialogContent className="dark:bg-[#191919] dark:border-none p-8 w-full">
                        <div className="w-full">
                        <Image 
                            className="w-full h-full"
                            src={currentUrl}
                            width={500}
                            height={500}
                            alt="image_1"
                            />
                        </div>
                        <div className="">
                            <p className="text-gray-200/60 text-xs flex items-center flex-row">
                              <CiStickyNote className="w-2 h-2 mr-2" /> 
                            </p>
                        <div className="w-full flex items-center">
                        <Input
                            className="w-11/12 rounded-r-none border-none bg-[#131313] mt-1"
                            placeholder="Bildnotiz hinzufügen"
                            onChange={(e) => setCurrentNote(e.target.value)}
                            value={currentNote}
                            maxLength={100}
                            />
                            <DialogTrigger asChild>
                            <Button
                            className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300 rounded-l-none"
                            onClick={() => handleImageUpload(currentUrl)}
                            disabled={isLoading}
                            >
                                <IoIosSend className="w-4 h-4" />
                            </Button>
                            </DialogTrigger>
                            
                        </div>
                        <div className="text-xs text-gray-200/60">
                            {currentNote.length} / 100
                        </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
            </div>
       
     );
}
 
export default UploadImage;