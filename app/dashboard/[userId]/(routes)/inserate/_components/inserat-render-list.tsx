'use client';

import InserateDashboardRender from "./inserate-dashboard-render";
import { useEffect, useMemo, useState } from "react";
import { inserat } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { useDebounce } from "@/components/multiple-selector";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { user } from "@/drizzle/schema";
import { set } from "lodash";
import { Checkbox } from "@/components/ui/checkbox";
import { MdOutlineUnfoldLess } from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface InserateRenderListProps {
    inserateArray: typeof inserat.$inferSelect[];
    currentUser: typeof user.$inferSelect;

}

const InserateRenderList: React.FC<InserateRenderListProps> = ({
    inserateArray,
    currentUser

}) => {


    const canPublishMore = () => {
        const hightlightedLength = inserateArray.filter((inserat) => inserat.isHighlighted).length;

        //@ts-ignore
        if (currentUser?.subscription?.subscriptionType === "PREMIUM") {
            return hightlightedLength < 1;
            //@ts-ignore
        } else if (currentUser?.subscription?.subscriptionType === "ENTERPRISE") {
            return hightlightedLength < 2;
        } else {
            return false;
        }
    }

    //use RenderAmount to render only 5 Inserate, if pressed "Mehr Anzeigen" => increase amount by 5 and so on...
    const [renderAmount, setRenderAmount] = useState(5);
    const [renderedInserate, setRenderedInserate] = useState<any>(inserateArray);
    const [selectedSort, setSelectedSort] = useState(null as any);
    const [selectedVisibility, setSelectedVisibility] = useState<"PRIVATE" | "PUBLIC" | null>(null as any);
    const [title, setTitle] = useState("");

    const debouncedValue = useDebounce(title, 500);

    useEffect(() => {

        let returnedInserate = inserateArray;

        if (title) {
            //@ts-ignore
            returnedInserate = inserateArray.filter((inserat) => {
                return inserat.title.toLowerCase().includes(title.toLowerCase())

            })

        }

        if (selectedVisibility) {
            if (selectedVisibility === "PUBLIC") {
                //@ts-ignore
                const filtered = returnedInserate.filter((inserat) => {
                    return inserat.isPublished
                })
                returnedInserate = filtered;
                setRenderedInserate(returnedInserate);
            } else if (selectedVisibility === "PRIVATE") {
                //@ts-ignore
                const filtered = returnedInserate.filter((inserat) => {
                    return !inserat.isPublished
                })
                returnedInserate = filtered;
                setRenderedInserate(returnedInserate);
            }
        }



    }, [inserateArray, selectedVisibility, title])

    useMemo(() => {
        if (!title) {
            setRenderedInserate(inserateArray)
        } else {
            //@ts-ignore
            const filteredInserate = inserateArray.filter((inserat) => {
                return inserat.title.toLowerCase().includes(title.toLowerCase())

            })
            setRenderedInserate(filteredInserate)
        }
    }, [debouncedValue])

    useEffect(() => {
        console.log("...")
        if (!selectedSort) {
            setRenderedInserate(inserateArray)
        } else if (selectedSort === "date_asc") {


            const sortedInserate = [...renderedInserate].sort((a, b) => {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            })
            setRenderedInserate(sortedInserate)
        } else if (selectedSort === "date_desc") {
            const sortedInserate = [...renderedInserate].sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            })
            setRenderedInserate(sortedInserate)
        }
    }, [selectedSort])

    useEffect(() => {

        let fInserate: any = inserateArray;

        if (title) {
            //@ts-ignore
            const filteredInserate = inserateArray.filter((inserat) => {
                return inserat.title.toLowerCase().includes(title.toLowerCase())

            })
            fInserate = filteredInserate;
        }

        if (!selectedSort) {

        } else if (selectedSort === "date_asc") {
            const sortedInserate = [...fInserate].sort((a, b) => {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            })
            fInserate = sortedInserate;
        } else if (selectedSort === "date_desc") {
            const sortedInserate = [...fInserate].sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            })
            fInserate = sortedInserate;
        }


        if (!selectedVisibility) {
            setRenderedInserate(fInserate)
        } else if (selectedVisibility === "PUBLIC") {
            //@ts-ignore
            const filtered = fInserate.filter((inserat) => {
                return inserat.isPublished
            })
            setRenderedInserate(filtered)
        } else if (selectedVisibility === "PRIVATE") {
            //@ts-ignore
            const filtered = fInserate.filter((inserat) => {
                return !inserat.isPublished
            })
            setRenderedInserate(filtered)
        }
    }, [selectedVisibility])

    const onDelete = async (inseratId) => {
        try {
            if (isLoading) return;
            console.log(inseratId)
            setIsLoading(true);
            setRenderedInserate((prevInserate) =>
                prevInserate.filter(item => item.id !== inseratId)
            );
            await axios.delete(`/api/inserat/${inseratId}/delete`)

            toast.success("Inserat erfolgreich gelöscht");
        } catch {
            toast.error("Fehler beim Löschen des Inserats");
            setRenderedInserate(inserateArray)
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    }

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    return (
        <div>
            <div className="sm:flex items-center w-full">
                <div className="flex items-center w-full">
                    <Input
                        onChange={(e) => setTitle(e.target.value)}
                        className="dark:border-none dark:bg-[#141414] sm:w-1/3 rounded-r-none"
                        value={title}
                        placeholder="Suche nach Inseraten..."
                    />
                    <div className="dark:bg-[#141414] p-3 rounded-r-md dark:hover:bg-[#191919] hover:cursor-pointer"

                    >
                        <SearchIcon className="w-4 h-4 " />
                    </div>
                </div>
                <div className="ml-auto sm:mt-0 mt-2">
                    <Select onValueChange={(e) => { setSelectedSort(e) }} value={selectedSort}>
                        <SelectTrigger className="sm:w-[320px] dark:border-none dark:bg-[#141414]">
                            <SelectValue placeholder="Sortieren nach.." />
                        </SelectTrigger>
                        <SelectContent className="dark:border-none dark:bg-[#141414]">
                            <SelectGroup>
                                <SelectLabel>Sortierfilter</SelectLabel>
                                <SelectItem value={null}>Beliebig</SelectItem>
                                <SelectItem value="date_desc">Erstelldatum: absteigend</SelectItem>
                                <SelectItem value="date_asc">Erstelldatum: aufsteigend</SelectItem>

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="sm:ml-auto w-full flex sm:justify-end justify-between  mt-2">
                <div className="gap-x-2 flex items-center mr-4 mb-2 sm:mb-0">
                    <div className="flex items-center">
                        <Checkbox
                            checked={!selectedVisibility}
                            onCheckedChange={(e) => { setSelectedVisibility(null) }}
                        />
                        <Label className="text-xs ml-2 hover:cursor-pointer" onClick={() => { setSelectedVisibility(null) }}>
                            Alle
                        </Label>
                    </div>
                    <div className="flex items-center">
                        <Checkbox
                            checked={selectedVisibility === "PUBLIC"}
                            onCheckedChange={(e) => { setSelectedVisibility("PUBLIC") }}
                        />
                        <Label className="text-xs ml-2 hover:cursor-pointer" onClick={() => { setSelectedVisibility("PUBLIC") }}>
                            Öffentlich
                        </Label>
                    </div>
                    <div className="flex items-center">
                        <Checkbox
                            checked={selectedVisibility === "PRIVATE"}
                            onCheckedChange={(e) => { setSelectedVisibility("PRIVATE") }}
                        />
                        <Label className="text-xs ml-2 hover:cursor-pointer" onClick={() => { setSelectedVisibility("PRIVATE") }}>
                            Privat
                        </Label>
                    </div>
                </div>
                <Label className="dark:text-gray-200/60 text-xs hover:underline hover:cursor-pointer flex items-center"
                    onClick={() => {
                        setTitle("");
                        setSelectedSort(null);
                        setSelectedVisibility(null);
                    }}>
                    <X className="w-4 h-4 mr-2" />  Filter löschen
                </Label>
            </div>
            <div className="text-xs mt-2 dark:text-gray-200/60">
                {renderedInserate.length} {renderedInserate.length === 1 ? "Inserat" : "Inserate"} gefunden..
            </div>
            <div>
                {renderedInserate.slice(0, renderAmount).map((inserat: any) => (


                    <InserateDashboardRender
                        thisInserat={inserat}
                        isLoading={isLoading}
                        currentUser={currentUser}
                        deleteInserat={onDelete}
                        canPublishMore={canPublishMore()}
                        key={inserat?.id}
                    />




                ))}
                {renderedInserate.length === 0 && (
                    <div className="mt-8 text-sm dark:text-gray-200/60 w-full flex justify-center">
                        Keine passenden Inserate vorhanden..
                    </div>
                )}
                {(renderedInserate.length > 5 && inserateArray.length > renderAmount) && (
                    <p className="mt-2 text-xs  underline hover:cursor-pointer" onClick={() => {
                        const renderedAddition = Number(inserateArray.length) - renderAmount >= 5 ? 5 : inserateArray.length - renderAmount;
                        setRenderAmount(renderAmount + renderedAddition)
                    }}>
                        Mehr anzeigen...
                    </p>
                )}

                {(inserateArray.length == renderAmount) && (
                    <p className="mt-2 text-xs  underline hover:cursor-pointer flex items-center" onClick={() => {
                        const renderedAddition = Number(inserateArray.length) - renderAmount >= 5 ? 5 : inserateArray.length - renderAmount;
                        setRenderAmount(5)
                    }}>
                        Weniger anzeigen <MdOutlineUnfoldLess className="w-4 h-4 ml-2" />
                    </p>
                )}
            </div>
        </div>
    );
}

export default InserateRenderList;