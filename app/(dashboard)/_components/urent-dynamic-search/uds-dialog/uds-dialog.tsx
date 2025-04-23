'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useSavedSearchParams } from "@/store";
import { LuCalendarSearch } from "react-icons/lu";
import UdsTimeSpan from "./uds-time-span";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import UdsTimeRange from "./uds-time-range";
import { format, isSameDay } from "date-fns";
import UdsMinTime from "./uds-min-time";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string"
import DynamicSearchConfirm from "../use-dynamic-search";



const UdsDialog = () => {

    const currentObject: any = useSavedSearchParams((state) => state.searchParams);
    const params = useSearchParams();

    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>();

    const [startTime, setStartTime] = useState<string | null>();
    const [endTime, setEndTime] = useState<string | null>();

    const [reqTime, setReqTime] = useState<string | null>();

    const convertReqTime = (reqTime) => {
        let returnedValue = reqTime.slice(0, -1) ?? "";

        switch (reqTime.slice(-1)) {
            case "h":
                returnedValue += " Stunden";
                break;
            case "d":
                returnedValue += " Tage";
                break;
            case "w":
                returnedValue += " Wochen";
                break;
            case "m":
                returnedValue += " Monate";
                break;
            default:
                returnedValue += "";
        }

        return returnedValue;
    }

    useEffect(() => {
        if (params.get("minTime")) {
            changeSearchParams("reqTime", params.get("reqTime"))
            setReqTime(currentObject["reqTime"])
        }
        if (params.get("startTime")) {
            changeSearchParams("startTime", params.get("startTime"))
            setStartTime(currentObject["startTime"])
        }
        if (params.get("endTime")) {
            changeSearchParams("endTime", params.get("endTime"))
            setEndTime(currentObject["endTime"])
        }
        if (params.get("startDateDynamic")) {
            changeSearchParams("startDateDynamic", params.get("startDateDynamic"))
            setStartDate(new Date(currentObject["startDateDynamic"]))
        }
        if (params.get("endDateDynamic")) {
            changeSearchParams("endDateDynamic", params.get("endDateDynamic"))
            setEndDate(new Date(currentObject["endDateDynamic"]))
        }
    }, [])

    const router = useRouter();

    const onRedirect = () => {
        changeSearchParams("dynamicSearch", "true");
        changeSearchParams("startDateDynamic", startDate.toISOString());
        changeSearchParams("endDateDynamic", endDate.toISOString());
        changeSearchParams("startTime", startTime);
        changeSearchParams("endTime", endTime);
        changeSearchParams("reqTime", reqTime);

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
            url: process.env.NEXT_PUBLIC_BASE_URL,


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
                dynamicSearch: "true",
                startDateDynamic: startDate.toISOString(),
                endDateDynamic: endDate.toISOString(),
                startTime: startTime,
                endTime: endTime,
                reqTime: reqTime,
                ...filteredValues
            },

        }, { skipEmptyString: true, skipNull: true })


        router.push(url);
    }

    function minutesToTime(minutes: number): string {
        if (minutes < 0 || !Number.isInteger(minutes)) {
            throw new Error("Input must be a non-negative integer.");
        }

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        // Format the time as HH:MM and append "Uhr"
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} Uhr`;
    }

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    return (
        <div className="w-full bg-[#1e2235] rounded-lg overflow-hidden shadow-md">
            <div className="px-4 py-3 bg-[#21263a]">
                <h3 className="text-sm font-medium text-gray-200 flex items-center gap-2">
                    <LuCalendarSearch className="text-indigo-400 w-4 h-4" /> Flexibler Mietzeitraum
                </h3>
                <p className="text-xs text-gray-400 mt-1 hover:text-gray-300 transition-colors cursor-help">
                    Was ist ein flexibler Mietzeitraum?
                </p>
            </div>
            
            <div className="px-4 py-3">
                <DynamicSearchConfirm />
            </div>
            
            <div className="px-4 py-3">
                <Dialog>
                    {currentObject["dynamicSearch"] == "true" && (
                        <DialogTrigger asChild>
                            <Button 
                                className="w-full bg-[#252a40] hover:bg-[#282d45] rounded-md py-3 px-3 shadow-sm text-left h-auto transition-all duration-200"
                                variant="ghost"
                            >
                                <div className="flex flex-col items-start w-full gap-3">
                                    <div className="flex justify-between w-full items-center">
                                        <span className="text-sm font-medium text-gray-200">Dynamische Suche</span>
                                        <span className={cn(
                                            "text-xs font-medium py-0.5 px-1.5 rounded",
                                            currentObject["dynamicSearch"] ? "bg-indigo-900/40 text-indigo-400" : "text-gray-400"
                                        )}>
                                            {currentObject["dynamicSearch"] ? "Aktiv" : "Nicht aktiv"}
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-start text-gray-200 w-full">
                                        <div className="text-xs text-gray-400 mb-1">Zeitraum</div>
                                        <div className="flex items-center gap-2">
                                            <span className={cn(
                                                "text-xs font-medium",
                                                currentObject["startDateDynamic"] ? "text-gray-200" : "text-gray-500"
                                            )}>
                                                {currentObject["startDateDynamic"] ? format(currentObject["startDateDynamic"], "dd.MM.yyyy") : "Keine Angabe"}
                                            </span>
                                            <span className="text-gray-500">-</span>
                                            <span className={cn(
                                                "text-xs font-medium",
                                                currentObject["endDateDynamic"] ? "text-gray-200" : "text-gray-500"
                                            )}>
                                                {currentObject["endDateDynamic"] ? format(currentObject["endDateDynamic"], "dd.MM.yyyy") : "Keine Angabe"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 w-full">
                                        <div className="flex flex-col">
                                            <div className="text-xs text-gray-400 mb-1">Abholzeit</div>
                                            <span className={cn(
                                                "text-xs font-medium",
                                                currentObject["startTime"] ? "text-gray-200" : "text-gray-500"
                                            )}>
                                                {currentObject["startTime"] ? minutesToTime(Number(currentObject["startTime"] ?? 0)) : "Keine Angabe"}
                                            </span>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="text-xs text-gray-400 mb-1">Rückgabezeit</div>
                                            <span className={cn(
                                                "text-xs font-medium",
                                                currentObject["endTime"] ? "text-gray-200" : "text-gray-500"
                                            )}>
                                                {currentObject["endTime"] ? minutesToTime(Number(currentObject["endTime"] ?? 0)) : "Keine Angabe"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-start text-gray-200 w-full">
                                        <div className="text-xs text-gray-400 mb-1">Benötigte Zeit</div>
                                        <span className={cn(
                                            "text-xs font-medium",
                                            currentObject["reqTime"] ? "text-gray-200" : "text-gray-500"
                                        )}>
                                            {currentObject["reqTime"] ? convertReqTime(currentObject["reqTime"]) : "Keine Angabe"}
                                        </span>
                                    </div>
                                </div>
                            </Button>
                        </DialogTrigger>
                    )}
                    <DialogContent className="bg-[#1e2235] border border-[#252838]/30 rounded-lg shadow-xl">
                        <div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-100 flex items-center gap-2">
                                    <LuCalendarSearch className="text-indigo-400 w-5 h-5" /> Dynamische Suche
                                </h3>
                                <p className="text-xs text-gray-400 mt-1">
                                    Falls du flexibler bist, ermöglicht dir unsere dynamische Mietzeitraumsuche, dir die passenden Fahrzeuge zu finden.
                                </p>
                            </div>
                            <div className="flex flex-col mt-4 space-y-6">
                                <div>
                                    <div className="font-medium text-gray-200">Zeitraum</div>
                                    <p className="text-xs text-gray-400 mb-2">
                                        Von wann bis wann bist du offen für die Miete eines Fahrzeugs?
                                    </p>
                                    <div className="mt-2 w-full">
                                    <UdsTimeSpan
                                            currentStart={startDate}
                                            currentEnd={endDate}
                                            setCurrentStart={(value) => {
                                                setStartDate(value);
                                                //changeSearchParams("startDateDynamic", value.toISOString());
                                            }}
                                            setCurrentEnd={(value) => {
                                                setEndDate(value);
                                                //changeSearchParams("endDateDynamic", value.toISOString());
                                            }}
                                        />     
                                    </div>
                                </div>


                                <div>
                                    <div className="font-medium text-gray-200">Abhol- und Rückgabezeit</div>
                                    <p className="text-xs text-gray-400 mb-2">
                                        Falls du eine genaue Abhol- und Rückgabezeit festlegen möchtest, kannst du dies hier tun.
                                    </p>
                                    <div className="mt-2">
                                        <UdsTimeRange
                                            setEndTimeParent={(value) => {
                                                setEndTime(value);
                                                //changeSearchParams("endTime", value);

                                            }}
                                            setStartTimeParent={(value) => {
                                                setStartTime(value);
                                                //changeSearchParams("startTime", value);
                                            }}
                                            prefilledStartTime={startTime}
                                            prefilledEndTime={endTime}
                                            isSameDay={isSameDay(startDate, endDate)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-200">Benötigte Zeit</div>
                                    <p className="text-xs text-gray-400 mb-2">
                                        Für wie lange benötigst du das Fahrzeug?
                                    </p>
                                    <div>
                                        <UdsMinTime
                                            minTime={reqTime}
                                            setMinTime={(value) => {
                                                console.log(reqTime)
                                                setReqTime(value);
                                                //changeSearchParams("minTime", value);
                                            }}
                                        />
                                    </div>
                                </div> 

                                <div className="mt-4">
                                    <DialogTrigger asChild>
                                        <Button 
                                            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md shadow-md transition-all duration-200"
                                            onClick={onRedirect}
                                            disabled={!startDate || !endDate || !reqTime}
                                        >
                                            <SearchIcon className="w-4 h-4 mr-2" /> Nach passenden Fahrzeugen suchen
                                        </Button>
                                    </DialogTrigger>
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