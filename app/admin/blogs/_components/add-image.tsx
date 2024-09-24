'use client'

import { Button } from "@/components/ui/button";
import { PlusCircleIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const AddImageBlog = () => {

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




    // const handleImageUpload = (result : any) => {
    //     try {

    //         const values = {
    //             content : currentNote,
    //             image : result,
    //             otherUser : otherUser,
    //             otherUserName : otherUserName
    //         }

    //         setIsLoading(true)
    //         axios.post(`/api/message/${params.conversationId}/image`, values).then(() => {
    //             setCurrentUrl("");
    //             setCurrentNote("");
    //             toast.success("Bild erfolgreich gesendet")
    //         })

    //     } catch(e : any) {
    //         toast.error("Fehler beim Upload")
    //         console.log(e);
    //     } finally {
    //         setIsLoading(false)
    //         setTimeout(() => {
    //             router.refresh()  
    //         }, 1000)
    //     } 
    // }

    return (
        <div>
            {currentUrl ? (
                <div className="w-full">
                    <div className="ml-auto flex justify-end">
                        <Button className="bg-rose-600 hover:bg-rose-700 text-gray-200 hover:text-gray-300 rounded-b-none"
                        onClick={() => { setCurrentUrl(null)}}
                        >
                            <TrashIcon className="w-4 h-4 mr-2"/>
                            Bild entfernen
                        </Button>
                    </div>
                <Image 
                src={currentUrl}
                width={1000}
                height={1000}
                className="w-full h-96 object-cover"
                alt="Bild"
                />
            </div>
            ) : (                
                <div>
                <Button


                    
                    {...getRootProps()}
                    className="w-full bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300 flex flex-row"
                >
                    <div className="flex flex-row">
                        <input {...getInputProps()} />
                        <PlusCircleIcon className="w-4 h-4 mr-2" /> Bild hinzufügen

                    </div>
                </Button>
            </div>
            )}
        </div>
    );
}

export default AddImageBlog;