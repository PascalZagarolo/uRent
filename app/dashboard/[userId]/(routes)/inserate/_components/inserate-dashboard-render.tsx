import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { inserat } from "@/db/schema";
import { cn } from "@/lib/utils";

import axios from "axios";
import { format } from "date-fns";
import { CheckIcon, Edit3, Globe2Icon, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ManageAvailability from "./manage-availability";
import HighlightInseratDialog from "./highlight-inserat-dialog";
import ToggleVisibility from "./toggle-visibility";
import { user } from "@/drizzle/schema";

interface InserateDashboardRenderProps {
    thisInserat: typeof inserat.$inferSelect | any;
    currentUser : typeof user.$inferSelect;

}

const InserateDashboardRender: React.FC<InserateDashboardRenderProps> = ({
    thisInserat,
    currentUser
}) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const renderedPicture = thisInserat?.images.sort((a, b) => a.position - b.position)[0]?.url;

   

    const onDelete = () => {
        try {
            setIsLoading(true);
            axios.delete(`/api/inserat/${thisInserat.id}/delete`).then(() => {
                toast.success("Inserat erfolgreich gelöscht");
                router.refresh();
            })

        } catch {
            toast.error("Fehler beim Löschen des Inserats")
        } finally {
            setIsLoading(false);
        }
    }

    const onBillingInformation = async () => {
        try {
            setIsLoading(true);
            const values = {}
            const res = await axios.patch(`/api/stripe/inserat/${thisInserat.id}`, values);
            window.location.href = res.data.url
        } catch {
            toast.error("Etwas ist schief gelaufen")
        } finally {
            setIsLoading(false)
        }
    }

    const isPublishable = {
        title: thisInserat.title.length > 0,
        description: thisInserat.description?.length > 0 || false,
        price: Number(thisInserat.price) !== 0 && thisInserat.price,
        images: thisInserat.images?.length > 0,
        postalCode: thisInserat.address?.postalCode != null,
        location: thisInserat.address?.locationString != null,
    };

    return (
        <div className="w-full dark:bg-[#141414] border dark:border-none rounded-md p-4 mt-2">
            <div className="flex">
                <div className="h-[100px] w-1/4">
                    {thisInserat.images.length > 0 ? (
                        <Image
                            alt="Inserat-Bild"
                            src={renderedPicture}
                            width={200}
                            height={100}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex justify-center items-center gap-x-1 bg-[#ECECEC] dark:bg-[#0F0F0F] text-xs truncate">
                            keine Fotos <p className="hidden sm:block"> vorhanden </p>
                        </div>
                    )}
                </div>
                {thisInserat.isPublished ? (
                    <a className="w-1/4 truncate ml-4 text-sm font-base mr-2 hover:underline"
                    href={`/inserat/${thisInserat.id}`} target="_blank">
                    {thisInserat.title}
                </a>
                ) : (
                    <div className="w-1/4 truncate ml-4 text-sm font-base mr-2 "
                    >
                    {thisInserat.title}
                </div>
                )}
                <div className="md:w-1/6 w-1/6 truncate">
                    <div className={cn("text-sm  h-full", thisInserat.isPublished ? "text-emerald-600 font-semibold" :
                        "dark:text-gray-100/40 text-gray-700")}>
                        <div className="h-1/2">
                        {thisInserat.isPublished ? <div className="flex items-center justify-center"> 
                        <Globe2Icon className="sm:mr-2 h-4 w-4 dark:text-gray-100/80 text-gray-700" /> 
                        <div className="hidden sm:block"> Veröffentlicht </div> </div> : "Entwurf"}
                        
                        </div>                                                         
                        <div className="h-1/2">
                        <ToggleVisibility 
                        thisInserat={thisInserat}
                        isPublishable={isPublishable}
                        currentUser = {currentUser}
                        />
                        </div>
                    </div>
                </div>
                <div className="w-2/6 text-sm dark:text-gray-100/70 text-gray-700 md:flex justify-center hidden">
                    <div className="h-full">
                        <div className="h-1/2">
                            {format(new Date(thisInserat.createdAt), "dd.MM.yyyy")}
                            <p className="dark:text-gray-100 text-gray-800">
                                erstellt am
                            </p>

                        </div>
                        <div className="h-1/2">
                            <div className="h-1/2">
                                <ManageAvailability
                                    thisInserat={thisInserat}
                                />
                            </div>
                            <div className="h-1/2">
                                {thisInserat.isHighlighted  ? (
                                    <div className="items-center flex text-xs text-gray-200">
                                        <CheckIcon className="h-4 w-4 mr-2 text-indigo-800" /> <div className="hidden md:block"> Hervorgehoben </div>
                                    </div>
                                ): (
                                    <>
                                        {thisInserat?.isPublished && (
                                            <HighlightInseratDialog
                                        thisInserat = { thisInserat } />
                                        )}
                                        
                                       
                                        </>
                            )}
                            </div>
                        </div>

                    </div>


                </div>
                <div className="justify-center md:w-1/8 items-center h-full gap-y-2 ml-auto">
                    <Button 
                    className="dark:bg-[#1C1C1C] dark:hover:bg-[#252525] dark:text-gray-100 flex text-xs w-full" 
                    
                    
                    >
                        <a href={`/inserat/create/${thisInserat.id}`} className="flex items-center" > <Edit3 className="w-4 h-4 xl:mr-2" /> <div className="xl:flex hidden"> Inserat bearbeiten</div> </a>
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="dark:bg-[#1C1C1C] dark:hover:bg-[#252525] dark:text-gray-100 flex text-xs w-full mt-4">
                                <Trash2 className="w-4 h-4 xl:mr-2 text-rose-600" />  <p className="xl:flex hidden">Inserat löschen</p>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="dark:bg-[#141414] border-none">
                            <DialogHeader>
                                <h3 className="text-lg font-semibold dark:text-gray-100 flex items-center"> <X className="mr-2 h-4 w-4 text-rose-600" />
                                    Möchtest du das Inserat wirklich löschen ?</h3>
                                <p className="text-xs text-gray-100/70">
                                    gelöschte Inserate können nicht wiederhergestellt werden.
                                </p>
                            </DialogHeader>
                            <div className="flex ml-auto gap-x-2">
                                <DialogTrigger asChild>
                                    <Button className="bg-rose-600 hover:bg-rose-500 text-gray-200" onClick={onDelete}>
                                        Endgültig löschen
                                    </Button>
                                </DialogTrigger>
                                <DialogTrigger asChild>
                                    <Button>
                                        Abbrechen
                                    </Button>
                                </DialogTrigger>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

export default InserateDashboardRender;