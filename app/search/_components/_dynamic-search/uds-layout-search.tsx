'use client'


import { DateRangePicker } from "@/components/ui/daterangepicker";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useEffect, useState } from "react";

import { LuCalendarSearch } from "react-icons/lu";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useSavedSearchParams } from "@/store";

import { InfoCircledIcon } from "@radix-ui/react-icons";

import UseUdsConfirm from "./use-uds";

import TimeFilterUdsSearch from "./time-filter-uds";
import { IoMdShareAlt } from "react-icons/io";
import UdsMinTime from "@/app/(dashboard)/_components/urent-dynamic-search/uds-dialog/uds-min-time";
import UdsReqTimeSearch from "./uds-min-time";
import UdsTimeSpanSearch from "./uds-time-range";

const UdsLayoutSearchRender = () => {

    
    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const [startDate, setStartDate] = useState(currentObject["startDateDynamic"] ? new Date(currentObject["startDateDynamic"]) : new Date());
    const [endDate, setEndDate] = useState(currentObject["endDateDynamic"] ? new Date(currentObject["endDateDynamic"]) : new Date());

    

    const [reqTime, setReqTime] = useState(currentObject["reqTime"] ? currentObject["reqTime"] : undefined);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();




    useEffect(() => {
        if (startDate && currentObject["dynamicSearch"]) {
            changeSearchParams("startDateDynamic", startDate.toISOString());
        }

        if (endDate && currentObject["dynamicSearch"]) {
            changeSearchParams("endDateDynamic", endDate.toISOString());
        }
    }, [startDate, endDate])

    useEffect(() => {
        if (reqTime) {
            changeSearchParams("reqTime", reqTime);
        }
    }, [reqTime])

    



    return (
        <div className="mb-2 w-full ">
            <h3 className="flex justify-start text-md font-semibold text-gray-100 items-center  bg-[#131313] p-4 border-[#1f2332] rounded-md shadow-lg">
                <LuCalendarSearch className="w-4 h-4 mr-2" />   Dynamischer Mietzeitraum
                <Popover>
                    <PopoverTrigger>
                        <InfoCircledIcon className="w-4 h-4 ml-2 text-gray-400" />
                    </PopoverTrigger>
                    <PopoverContent className="dark:border-none">
                        <div className="text-xs">
                            <h3 className="text-sm font-semibold mb-1">
                                Dynamischer Mietzeitraum
                            </h3>
                            Falls du flexibler bist, ermöglicht dir unsere dynamische Mietzeitraumsuche,
                            den perfekten Mietzeitraum für dein Fahrzeug zu finden: <br /> Lege den verfügbaren Zeitraum und die gewünschte Mietdauer
                            fest und wähle präzise deinen Abhol- und Rückgabezeitpunkt. <br /> So passt sich die Buchung optimal deinen individuellen Bedürfnissen an.
                        </div>
                    </PopoverContent>
                </Popover>
                <div className="ml-auto">
                    <UseUdsConfirm />
                </div>
            </h3>
            <div>
                <a
                        href="/blog/71af42ef-e0b1-4881-bf7f-4de365cf5a98"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-gray-200/60 font-medium text-center hover:underline flex flex-row items-center py-2 px-2">

                        Mehr Informationen findest du hier <IoMdShareAlt  className="w-4 h-4 ml-2 text-gray-400" />
                    </a>
                </div>
            <div>
                <div className="w-full  px-2 sm:flex sm:flex-row items-center sm:space-x-8 mt-4">

                    <div className="flex flex-col sm:w-1/2 w-full">
                        <Label className="pb-1 text-sm font-semibold">
                            Mietzeitraum
                        </Label>
                        <div className="">
                            <UdsTimeSpanSearch
                            disabled = {!currentObject["dynamicSearch"]}
                            startDate={[currentObject["startDateDynamic"] ? new Date(currentObject["startDateDynamic"]) : null]}
                            endDate={[currentObject["endDateDynamic"] ? new Date(currentObject["endDateDynamic"]) : null]}
                            setStartDate={(date) => {
                                changeSearchParams("startDateDynamic", date.toISOString())
                            }}
                            setEndDate={(date) => {
                                changeSearchParams("endDateDynamic", date.toISOString())
                            }}
                            />
                        </div>
                    </div>


                    <div className="sm:w-1/2 flex flex-col w-full sm:mt-0 mt-2">
                        <Label className="pb-1 text-sm font-semibold">
                            Mietdauer
                        </Label>
                        {/* <div className="">
                            <Select
                                onValueChange={(value) => setReqTime(value)}
                                disabled={!currentObject["dynamicSearch"]}
                                value={reqTime}

                            >
                                <SelectTrigger className="w-full bg-[#13141C] border-none">
                                    <SelectValue placeholder="Wähle deine gewünschte Mietdauer" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#13141C] border-none">
                                    <SelectGroup>

                                        <SelectItem value="1h">1 Stunde</SelectItem>
                                        <SelectItem value="4h">4 Stunden</SelectItem>
                                        <SelectItem value="1d">1 Tag</SelectItem>
                                        <SelectItem value="3d">3 Tage</SelectItem>
                                        <SelectItem value="7d">1 Woche</SelectItem>
                                        <SelectItem value="14d">2 Wochen</SelectItem>
                                        <SelectItem value="30d">1 Monat</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div> */}
                        <div className="sm:mt-0">
                            <UdsReqTimeSearch 
                            isDisabled={!currentObject["dynamicSearch"]}
                            onChange = {(value) => {
                                changeSearchParams("reqTime", value)
                            }}
                            />
                        </div>
                    </div>
                    
                </div>
                <div className="mt-1">
                        <TimeFilterUdsSearch
                            isDisabled={!currentObject["dynamicSearch"]}
                        />
                    </div>
            </div>
        </div>
    );
}

export default UdsLayoutSearchRender;