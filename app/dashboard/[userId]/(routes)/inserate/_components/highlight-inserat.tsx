'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { inserat, user, userSubscription } from "@/drizzle/schema";
import axios from "axios";
import { format } from "date-fns";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineHighlightOff } from "react-icons/md";
import SelectColor from "./select-color";
import clsx from "clsx";
import { cn } from "@/lib/utils";

interface HighlightInseratProps {
    currentUser: typeof user.$inferSelect;
    foundInserate: typeof inserat.$inferSelect[];
    existingSubscription: typeof userSubscription.$inferSelect;
}


const HighlightInserat: React.FC<HighlightInseratProps> = ({
    currentUser,
    foundInserate,
    existingSubscription
}) => {

    const Colors = {
        BLUE: "border-blue-800",
        RED: "border-rose-800",
        GREEN: "border-emerald-600",
        YELLOW: "border-yellow-600",
        PURPLE: "border-indigo-600",
        ORANGE: "border-orange-600",
        VIOLET: "border-violet-900",
        WHITE: "border-gray-300",
        BLACK: "border-black",
    };

    const ColorsBG = {
        BLUE: "bg-blue-800",
        RED: "bg-rose-800",
        GREEN: "bg-emerald-600",
        YELLOW: "bg-yellow-600",
        PURPLE: "bg-indigo-600",
        ORANGE: "bg-orange-600",
        VIOLET: "bg-violet-900",
        WHITE: "bg-gray-300",
        BLACK: "bg-black",
    };

    const hightlightedInserate = foundInserate.filter((inserat: any) => inserat.isPublished && inserat?.isHighlighted);
    console.log(hightlightedInserate)
    const availableHighlights = (existingSubscription?.subscriptionType === "ENTERPRISE" && existingSubscription?.amount > 1) ? 2 : 1

    const [isLoading, setIsLoading] = useState(false);

    function formatNumber(num: number): string {
        // Zahlen bis einschließlich 9999 bleiben unverändert
        if (num <= 9999) {
            return num.toString();
        }

        // Für größere Zahlen, füge einen Punkt als Tausender-Trennzeichen hinzu
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const router = useRouter();

    const onDehiglight = async (inseratId: string) => {
        try {
            await axios.patch(`/api/inserat/${inseratId}/dehighlight`)

            toast.success("Hervorhebung erfolgreich entfernt");
            router.refresh();

        } catch (error: any) {
            console.log(error);
            toast.error("Fehler beim Entfernen der Hervorhebung")
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <div className="py-4 pb-8">
            <h1 className="text-md font-semibold">
                Hervorgehobene Inserate ({hightlightedInserate.length}/{availableHighlights})
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {hightlightedInserate.map((inserat: any) => (
                    <div className={cn("p-4 dark:bg-[#0F0F0F] rounded-md",
                        inserat?.color && `${Colors[inserat?.color]} border`,

                    )} key={inserat.id}>
                        <div className="text-sm w-full line-clamp-1 break-all">
                            {inserat.title}
                        </div>
                        <div className="w-full">
                            <Image
                                alt="inserat image"
                                src={inserat.images.reduce((lowest, image) => {
                                    return (lowest === null || image.position < lowest.position) ? image : lowest
                                }, null)?.url}
                                width={500}
                                height={500}
                                className="object-cover rounded-md mt-2 h-32 "
                            />
                        </div>
                        <div className="mt-2 gap-y-2">

                            <p className="text-xs">
                                erstellt: {format(new Date(inserat.createdAt), "dd.MM.yyyy")}
                            </p>
                            <p className="text-xs">
                                {formatNumber(inserat?.views)} Aufrufe
                            </p>
                        </div>
                        {existingSubscription?.subscriptionType === "ENTERPRISE" && (
                            <div className="mt-2">
                                <SelectColor
                                    inseratId={inserat.id}
                                    selectedColor={inserat.color}
                                />
                            </div>
                        )}
                        <div className="mt-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        className={clsx("w-full  dark:text-gray-200",
                                            inserat.color && `${ColorsBG[inserat.color]}`,
                                            inserat?.color == "WHITE" && "dark:text-gray-700 text-gray-800"
                                        )}
                                        size="sm"
                                        variant="ghost"
                                    >
                                        <X className={cn("dark:text-gray-200 w-4 h-4 mr-2",
                                            inserat?.color == "WHITE" && "dark:text-gray-700 text-gray-800"
                                        )}

                                        /> Hervorhebung entfernen
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="dark:border-none dark:text-gray-200 dark:bg-[#191919]">
                                    <div>
                                        <div>
                                            <h3 className="text-md font-semibold flex items-center">
                                                <MdOutlineHighlightOff className="w-4 h-4 mr-2 text-rose-600" />  Möchtest du die Hervorhebung wirklich entfernen?
                                            </h3>
                                            <p className="text-xs dark:text-gray-200/60">
                                                Du kannst diese Aktion jederzeit rückgängig machen.
                                            </p>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <AlertDialogAction asChild >
                                                <Button
                                                    className={clsx(`bg-indigo-800 hover:bg-indigo-900 dark:text-gray-200`)}
                                                    onClick={() => onDehiglight(inserat.id)}
                                                    disabled={isLoading}
                                                >
                                                    Entfernen
                                                </Button>
                                            </AlertDialogAction>
                                            <AlertDialogCancel className="dark:border-none">
                                                Abbrechen
                                            </AlertDialogCancel>
                                        </div>
                                    </div>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ))}
            </div>
            {hightlightedInserate.length === 0 && (
                <div className="flex justify-center text-sm dark:text-gray-200/60">
                    Keine hervorgehobenen Inserate..
                </div>

            )}
        </div>
    );
}

export default HighlightInserat;