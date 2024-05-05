import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { savedSearch } from "@/db/schema";
import axios from "axios";
import { format } from "date-fns";
import { Trash2Icon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { MdContentPasteSearch, MdManageSearch } from "react-icons/md";
import { RiShareForward2Fill } from "react-icons/ri";


interface SavedSearchesShortCutProps {
    savedSearches : typeof savedSearch.$inferSelect[]
}

const SavedSearchShortCut : React.FC<SavedSearchesShortCutProps> = ({
    savedSearches
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onClick = (usedUrl : string) => {
        router.push(usedUrl);
    }

    const onDelete = async (savedSearchId : string) => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/saved-search/delete/${savedSearchId}`)
                .then(() => {
                    toast.success("Suche erfolgreich gelöscht.")
                    router.refresh();
                    
                })
        } catch(error : any) {
            console.log(error);
            toast.error("Fehler beim Löschen der Suche.")
        } finally {
            setIsLoading(false)
        }
    }

    const onTest = async () => {
        await axios.patch("/api/check/saved-searches/newly-available")
            .then((res) => {
                router.refresh();
            })
    }

    
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <MdContentPasteSearch  className="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#191919]">
                <div className="">
                    <div>
                        <h3 className="flex items-center text-md font-semibold">
                            <MdManageSearch  className="w-4 h-4 mr-2"/> Gespeicherte Suchen
                        </h3>
                    </div>
                    <p className="text-xs dark:text-gray-200/60">
                        Deine gespeicherten Suchen, damit du sie schnell wiederfindest.
                    </p>
                    <div className="mt-4 block space-y-2">
                        {savedSearches?.map((search) => (
                            
                            <div key={search.id} className="dark:bg-[#171717] rounded-md  items-center p-4 font-semibold text-sm">
                               <div className="flex">
                               <DialogTrigger className="flex items-center">
                                <div className="font-semibold hover:cursor-pointer hover:underline" onClick={() => {onClick(search.link)}}>
                                {search.title}
                                </div>
                                <div>
                                <RiShareForward2Fill className="w-4 h-4 ml-2" onClick={() => {onClick(search.link)}}/>
                                </div>
                                </DialogTrigger>
                                <div className="ml-auto">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="sm" className="ml-2 text-xs text-rose-600">
                                                <Trash2Icon className="w-4 h-4"/>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="dark:border-none dark:bg-[#191919]">
                                            <div>
                                                <div>
                                                    <h3 className="flex items-center1">
                                                       <X className="text-rose-600 mr-2 w-4 h-4" /> Möchtest du die Suche wirklich löschen?
                                                    </h3>
                                                    <p className="text-xs dark:text-gray-200/60">
                                                        Gelöschte Suchen können nicht wiederhergestellt werden.
                                                    </p>
                                                    <div className="mt-2 flex w-full justify-end">
                                                        <AlertDialogAction 
                                                        className="bg-rose-600 hover:bg-rose-700 
                                                        text-gray-200 hover:text-gray-300"
                                                        onClick={() => {onDelete(search.id)}}
                                                        >
                                                            Löschen
                                                        </AlertDialogAction>
                                                        <AlertDialogCancel className="dark:border-none">
                                                            Abbrechen
                                                        </AlertDialogCancel>
                                                    </div>
                                                </div>
                                            </div>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                                </div>
                               <div>
                                </div>
                                <div className="text-xs dark:text-gray-200/60 font-normal">
                                    erstellt am: {format(new Date(search.createdAt), "dd.MM")}
                                </div>
                            </div>
                           
                        ))}
                    </div>
                    <div>
                        <Button variant="ghost" size="sm" onClick={onTest}>
                            Test
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SavedSearchShortCut;