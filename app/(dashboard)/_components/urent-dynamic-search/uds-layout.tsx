import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRangePicker } from "@/components/ui/daterangepicker";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ShareIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
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
import { start } from "repl";
import { useSavedSearchParams } from "@/store";
import TimePeriodFormFilter from "../_smart-filter/_components/timeperiod";
import TimeFilterUds from "./time-filter-uds";
import DynamicSearchConfirm from "./use-dynamic-search";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { RiArrowRightUpLine } from "react-icons/ri";
import { IoMdShareAlt } from "react-icons/io";

const UdsLayout = () => {

    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [initialLoad, setIsInitialLoad] = useState(true);

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
            <h3 className="flex flex-col justify-start text-md font-semibold text-gray-100 items-center  bg-[#1b1f2c] p-2 border-[#1f2332] ">
                <div className="flex flex-row items-center">
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
                </div>
                <div>
                <a
                        href="/blog/71af42ef-e0b1-4881-bf7f-4de365cf5a98"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-gray-200/60 font-medium text-center hover:underline flex flex-row items-center mt-1">

                        Mehr Informationen findest du hier <IoMdShareAlt  className="w-4 h-4 ml-2 text-gray-400" />
                    </a>
                </div>
            </h3>

            <div>
                <div className="w-full mt-1 px-2">
                    <div className="py-2">
                        <DynamicSearchConfirm />
                    </div>
                    
                    <Label className="pb-1">
                        Mietzeitraum
                    </Label>
                    <div className="">
                        <DateRangePicker
                            onUpdate={(values) => {
                                setStartDate(values.range.from);
                                setEndDate(values.range.to);
                            }}
                            initialDateFrom="2023-01-01"
                            initialDateTo="2023-12-31"
                            align="start"
                            locale="de"
                            showCompare={false}
                            isDisabled={!currentObject["dynamicSearch"]}


                        />
                    </div>
                    <div className="w-full mt-1 ">
                        <Label className="">
                            Mietdauer
                        </Label>
                        <p className="text-xs text-gray-200/60">
                        Wie lange brauchst du das Fahrzeug?
                        </p>
                        <div className="">
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
                        </div>
                    </div>
                    <div className="mt-1">
                        <TimeFilterUds
                            isDisabled={!currentObject["dynamicSearch"]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UdsLayout;