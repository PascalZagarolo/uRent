import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSavedSearchParams } from "@/store";
import { IoSave } from "react-icons/io5";
import qs from "query-string";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import LetterRestriction from "@/components/letter-restriction";



interface SaveSearchProps {
    userId: string;
}

const SaveSearch: React.FC<SaveSearchProps> = ({
    userId
}) => {

    const searchParams = useSavedSearchParams((state) => state.searchParams);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTitle, setCurrentTitle] = useState("");
    const [checkAvailability, setCheckAvailability] = useState(false);
    const [getUpdates, setGetUpdates] = useState(false);


    const router = useRouter();

    const onGenerateUrl = () => {
        const {//@ts-ignore
            thisCategory, ...filteredValues } = searchParams;
        //@ts-ignore
        const usedStart = filteredValues.periodBegin;
        let usedEnd = null;
        //@ts-ignore
        if (filteredValues.periodEnd) {
            //@ts-ignore
            usedEnd = filteredValues.periodEnd;
        } else {
            //@ts-ignore
            if (filteredValues.periodBegin) {
                //@ts-ignore
                usedEnd = filteredValues.periodBegin;
            }
        }
        const url = qs.stringifyUrl({
            url: "",
            //@ts-ignore
            query: {
                //@ts-ignore
                category: thisCategory,
                //@ts-ignore
                periodBegin: usedStart ? usedStart : null,
                //@ts-ignore
                periodEnd: usedEnd ? usedEnd : null,
                //@ts-ignore
                type: filteredValues.thisType,
                ...filteredValues
            },

        }, { skipEmptyString: true, skipNull: true })
        return "/" + url;
    }

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const url = onGenerateUrl();

            const values = {
                link: url,
                title: currentTitle,
                checkAvailability: checkAvailability,
                getUpdates: getUpdates
            }

            await axios.post(`/api/saved-search/${userId}`, values)
                .then(() => {
                    toast.success("Suche erfolgreich gespeichert");
                    setCurrentTitle("");
                    setCheckAvailability(false);
                    setGetUpdates(false);
                    router.refresh();
                })

        } catch (error: any) {
            console.log(error.message);
            toast.error("Fehler beim Speichern der Suche")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            {userId ? (
                <DialogTrigger className="flex items-center text-xs justify-center w-full hover:underline">
                    <IoSave className="w-4 h-4 mr-2" />  Suche speichern
                </DialogTrigger>
            ) : (
                <a className="flex items-center text-xs justify-center w-full hover:underline" href="/login">
                    <IoSave className="w-4 h-4 mr-2" />  Suche speichern
                </a>
            )}
            <DialogContent className="dark:border-none dark:bg-[#191919]">
                <div className="">
                    <div className="">
                        <h3 className="text-md font-semibold flex items-center">
                            <IoSave className="w-4 h-4 mr-2" /> Suche speichern
                        </h3>
                        <p className="text-xs dark:text-gray-200/60">
                            Speichern Sie Ihre Suche, um sie später wiederzufinden.
                            <br />
                            Gespeicherte Suchen finden sie in Ihrem Dashboard.
                        </p>
                    </div>
                    <div className="mt-4">
                        <Label>
                            Titel
                        </Label>
                        <div>
                            <Input
                                className="dark:border-none dark:bg-[#1C1C1C] dark:text-gray-200"
                                onChange={(e) => setCurrentTitle(e.target.value)}
                                maxLength={100}
                            />
                            <div className="ml-auto flex justify-end">
                                <LetterRestriction limit={100} currentLength={currentTitle?.length ?  currentTitle?.length : 0} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Label className="text-sm font-semibold">
                            Benachrichtige mich,
                        </Label>
                    </div>
                    <div className="w-full flex items-center gap-x-2 mt-2">

                        <Checkbox
                            onCheckedChange={(e: boolean) => setCheckAvailability(e)}
                            checked={checkAvailability} />


                        <Label className="text-xs hover:underline hover:cursor-pointer" onClick={() => { setCheckAvailability(!checkAvailability) }}>
                            wenn ein passendes Inserat gefunden wurde.
                        </Label>
                    </div>


                    <div className="w-full flex items-center gap-x-2 mt-2">

                        <Checkbox
                            onCheckedChange={(e: boolean) => setGetUpdates(e)}
                            checked={getUpdates} />


                        <Label className="text-xs hover:underline hover:cursor-pointer"
                            onClick={() => { setGetUpdates(!getUpdates) }}
                        >
                            wenn neue Ergebnisse verfügbar sind
                        </Label>
                    </div>
                    <div className="mt-2 w-full ml-auto flex justify-end">
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300"
                                onClick={onSubmit}
                                disabled={isLoading || !currentTitle || currentTitle.trim() === ""}
                            >
                                Speichern
                            </Button>
                        </DialogTrigger>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SaveSearch;