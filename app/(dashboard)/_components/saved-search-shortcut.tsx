import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
    savedSearches: typeof savedSearch.$inferSelect[]
}

const SavedSearchShortCut: React.FC<SavedSearchesShortCutProps> = ({
    savedSearches
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onClick = (usedUrl: string) => {
        router.push(usedUrl);
    }

    const onDelete = async (savedSearchId: string) => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/saved-search/delete/${savedSearchId}`)
                .then(() => {
                    toast.success("Suche erfolgreich gelöscht.")
                    router.refresh();

                })
        } catch (error: any) {
            console.log(error);
            toast.error("Fehler beim Löschen der Suche.")
        } finally {
            setIsLoading(false)
        }
    }

    const changeSearch = async (savedSearchId: string, checkAvailability?: boolean, checkUpdates?: boolean) => {
        try {
            setIsLoading(true);

            const values = {
                checkAvailability: checkAvailability,
                getUpdates: checkUpdates
            }

            await axios.patch(`/api/saved-search/edit/${savedSearchId}`, values)
                .then(() => {
                    toast.success("Einstellungen übernommen.")
                    router.refresh();
                })
        } catch (error: any) {

            toast.error("Fehler beim Ändern der Suche.")
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <MdContentPasteSearch className="w-5 h-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#191919] p-0">
                <div className="p-4">
                    <div>
                        <h3 className="flex items-center text-md font-semibold">
                            <MdManageSearch className="w-4 h-4 mr-2" /> Gespeicherte Suchen
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
                                        <a className="font-semibold hover:cursor-pointer hover:underline" 
                                        href={search.link}
                                        target="_blank"
                                        >
                                            {search.title}
                                        </a>
                                        <a href={search.link} target="_blank">
                                            <RiShareForward2Fill className="w-4 h-4 ml-2" onClick={() => { onClick(search.link) }} />
                                        </a>
                                    </DialogTrigger>
                                    <div className="ml-auto">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="sm" className="ml-2 text-xs text-rose-600">
                                                    <Trash2Icon className="w-4 h-4" />
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
                                                                onClick={() => { onDelete(search.id) }}
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
                                <Accordion type="single" collapsible className="pr-4">
                                    <AccordionItem value="item 1" className="border-none">
                                    <AccordionTrigger className="text-xs">
                                            Weitere Details
                                        </AccordionTrigger>
                                        <AccordionContent className="border-none">
                                            <div className="flex items-center w-full">

                                                <div className="w-full space-y-2">
                                                    <div className="">
                                                        <Label className="text-xs">
                                                            Benachrichtige mich,
                                                        </Label>
                                                    </div>
                                                    <div className="ml-auto flex  items-center gap-x-2">


                                                        <Checkbox
                                                            onCheckedChange={(e: boolean) => (changeSearch(search.id, e, search.receivesUpdates))}
                                                            checked={search.receiveAvailability}
                                                            disabled={isLoading}
                                                        />
                                                        <Label className="text-xs dark:text-gray-200/80">
                                                            wenn ein passendes Inserat gefunden wurde.
                                                        </Label>

                                                    </div>
                                                    <div className="flex items-center gap-x-2">


                                                        <Checkbox
                                                            onCheckedChange={(e: boolean) => (changeSearch(search.id, search.receiveAvailability, e))}
                                                            checked={search.receivesUpdates}
                                                            disabled={isLoading}
                                                        />
                                                        <Label className="text-xs dark:text-gray-200/80">
                                                            wenn neue Ergebnisse verfügbar sind.
                                                        </Label>

                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>

                        ))}
                        {savedSearches?.length === 0 && (
                            <div className="text-xs dark:text-gray-200/60 flex justify-center py-4">
                                Du hast noch keine Suchen gespeichert..
                            </div>
                        )}
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SavedSearchShortCut;