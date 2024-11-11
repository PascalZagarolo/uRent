'use client';



import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";


import { ImageIcon, Trash2Icon } from "lucide-react";
import ImageList from "./image-list";
import ImageListForm from "./image-list-form";
import { images } from "@/db/schema";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import ShowPrivatizeDialog from "../../[inseratId]/sections/_components/show-privatize-dialog";


interface DeleteImageFormProps {
    thisImages: typeof images.$inferSelect[];
    isPublic : boolean;
}

const DeleteImageForm: React.FC<DeleteImageFormProps> = ({
    thisImages,
    isPublic
}) => {

    const params = useParams();

    const [selectedImages, setSelectedImages] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [showPrivatize, setShowPrivatize] = useState(false);

    const router = useRouter();

    const pushSelected = (imageId: string) => {
        setSelectedImages([...selectedImages, imageId])
    }

    const deleteSelected = (imageId: string) => {
        setSelectedImages(selectedImages.filter((id) => id !== imageId))
    }

    const onBulkDelete = async (confirmDelete?: boolean) => {
        try {
            
            if ((selectedImages?.length == thisImages.length) && !confirmDelete && isPublic) {
                setShowPrivatize(true);
                return;
            }
            setIsLoading(true);

            for (const pImage of selectedImages) {
                await axios.delete(`/api/image/${pImage}`)
                    .then(() => {
                        router.refresh();
                    })
            }
            if((selectedImages?.length == thisImages.length) && isPublic){

                const values = {
                    isPublished : false
                }

                await axios.patch(`/api/inserat/${params?.inseratId}`, values)
                
            }
            toast.success("Bilder erfolgreich gelöscht");
            setSelectedImages([]);

        } catch (error: any) {
            console.log("Fehler beim Löschen der Angehängten Bilder ", error);
            toast.error("Bilder konnten nicht gelöscht werden...")
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <div>
            <Dialog>
                <DialogTrigger>

                    <Trash2Icon className="h-4 w-4 text-rose-600" />

                </DialogTrigger>
                <DialogContent className="dark:bg-[#0F0F0F] border-none">

                    <div>
                        <div className="flex items-center text-md font-semibold" >
                            <ImageIcon className="mr-2 w-4 h-4" />Fotos & Anhänge entfernen
                        </div>
                        {selectedImages.length > 0 && (
                            <div className="flex items-center">
                                <Label className="text-xs font-medium dark:text-gray-200/80">
                                    {selectedImages.length} Bild{selectedImages.length > 1 ? "er" : ""} ausgewählt
                                </Label>
                                <Button
                                    className="ml-auto bg-rose-600 hover:bg-rose-700 hover:text-gray-300"
                                    variant="ghost" size="sm"
                                    onClick={() => onBulkDelete()}
                                >
                                    Löschen
                                </Button>
                            </div>
                        )}

                        {thisImages.length === 0 ? (
                            <div>
                                <p className="dark:text-gray-200/60 text-xs"> Noch keine Bilder hinzugefügt </p>
                            </div>
                        ) : (
                            <div>
                                {thisImages.map((image) => (
                                    <ImageListForm
                                        key={image.id}
                                        thisImage={image}
                                        pushSelected={pushSelected}
                                        isSelected={selectedImages.includes(image.id)}
                                        deleteSelected={deleteSelected}
                                    />
                                ))}
                            </div>
                        )}

                    </div>
                </DialogContent>
            </Dialog>
            {showPrivatize && (<ShowPrivatizeDialog open={showPrivatize} onChange={setShowPrivatize} onSave={() => onBulkDelete(true)}
                text={"Du hast keine Bilder hochgeladen, oder deine Bilder entfernt."}
            />)}

        </div>
    );
}

export default DeleteImageForm;