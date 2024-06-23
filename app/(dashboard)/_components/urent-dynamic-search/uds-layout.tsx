import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRangePicker } from "@/components/ui/daterangepicker";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { LuCalendarSearch } from "react-icons/lu";

const UdsLayout = () => {

    const [startDate, setStartDate] = useState(new Date());



    return (
        <div className="mb-2 w-full ">
            <h3 className="flex justify-start text-md font-semibold text-gray-100 items-center  bg-[#1b1f2c] p-2 border-[#1f2332] ">
                <LuCalendarSearch className="w-4 h-4 mr-2" />   Dynamischer Mietzeitraum
            </h3>
            <div>
                <div className="w-full mt-1 px-2">
                    <Label className="pb-1">
                        Mietzeitraum
                    </Label>
                    <div className="">
                    <DateRangePicker
                        onUpdate={(values) => console.log(values)}
                        initialDateFrom="2023-01-01"
                        initialDateTo="2023-12-31"
                        align="start"
                        locale="de"
                        showCompare={false}
                        
                    />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UdsLayout;