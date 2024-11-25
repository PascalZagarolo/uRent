'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useSavedSearchParams } from "@/store";
import { LuCalendarSearch } from "react-icons/lu";

const UdsDialog = () => {

    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    return (
        <div className="w-full">
            <h3 className="flex justify-start text-lg text-gray-100 items-center  bg-[#1b1f2c] w-full p-2 border-[#1f2332] ">
                <LuCalendarSearch className="mr-4" /> Flexibler Mietzeitraum
            </h3>
            <p className="text-xs text-gray-200/60 pl-2 hover:underline">
                Was ist ein flexibler Mietzeitraum?
            </p>
            <div className="mt-4 px-2 mb-4">
                <Dialog>
                    <DialogTrigger asChild className="">
                        <Button className="w-full bg-[#2d3347] shadow-lg h-full" variant="ghost">
                            <div className="flex flex-col items-start space-y-2">
                                <div className="flex flex-row items-center text-gray-200">
                                    <div>
                                        Dynamische Suche
                                    </div>
                                    <span className={cn(
                                        "ml-auto px-2 py-1 rounded-md text-xs font-semibold",
                                        currentObject["dynamicSearch"] ? "text-emerald-600" : "text-gray-200/60"
                                    )}>
                                        {currentObject["dynamicSearch"] ? "Aktiv" : "Nicht aktiv"}
                                    </span>
                                </div>

                                <div className="flex flex-row items-center text-gray-200">
                                    <div>
                                        Zeitraum
                                    </div>
                                    <span className={cn(
                                        "ml-auto pl-2 pr-1 py-1 rounded-md text-xs font-semibold",
                                        currentObject["startDateDynamic"] ? "text-emerald-600" : "text-gray-200/60"
                                    )}>
                                        {currentObject["startDateDynamic"] ? "Aktiv" : "Keine Angabe"}
                                    </span>
                                    -
                                    <span className={cn(
                                        "ml-auto px-1 py-1 rounded-md text-xs font-semibold",
                                        currentObject["endDateDynamic"] ? "text-emerald-600" : "text-gray-200/60"
                                    )}>
                                        {currentObject["endDateDynamic"] ? "Aktiv" : "Keine Angabe"}
                                    </span>
                                </div>

                                <div className="flex flex-row items-center text-gray-200">
                                    <div>
                                        Abholzeit
                                    </div>
                                    <span className={cn(
                                        "ml-auto px-2 py-1 rounded-md text-xs font-semibold",
                                        currentObject["dynamicSearch"] ? "text-emerald-600" : "text-gray-200/60"
                                    )}>
                                        {currentObject["dynamicSearch"] ? "Aktiv" : "Keine Angabe"}
                                    </span>
                                </div>

                                <div className="flex flex-row items-center text-gray-200">
                                    <div>
                                        Rückgabezeit
                                    </div>
                                    <span className={cn(
                                        "ml-auto px-2 py-1 rounded-md text-xs font-semibold",
                                        currentObject["dynamicSearch"] ? "text-emerald-600" : "text-gray-200/60"
                                    )}>
                                        {currentObject["dynamicSearch"] ? "Aktiv" : "Keine Angabe"}
                                    </span>
                                </div>

                                <div className="flex flex-row items-center text-gray-200">
                                    <div>
                                        Benötigte Zeit
                                    </div>
                                    <span className={cn(
                                        "ml-auto px-2 py-1 rounded-md text-xs font-semibold",
                                        currentObject["dynamicSearch"] ? "text-emerald-600" : "text-gray-200/60"
                                    )}>
                                        {currentObject["dynamicSearch"] ? "Aktiv" : "Keine Angabe"}
                                    </span>
                                </div>
                            </div>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#191919] border-none">
                        <div>
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Dynamische Suche
                                </h3>
                                <p className="text-xs text-gray-200/60">
                                    Falls du flexibler bist, ermöglicht dir unsere dynamische Mietzeitraumsuche, dir die passenden Fahrzeuge zu finden.
                                </p>
                            </div>
                            <div className="flex flex-col mt-4">
                                <div>
                                    <div className=" font-semibold">
                                        Zeitraum
                                    </div>
                                </div>
                                <div>
                                    <div>

                                    </div>
                                </div>
                                <div>

                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default UdsDialog;