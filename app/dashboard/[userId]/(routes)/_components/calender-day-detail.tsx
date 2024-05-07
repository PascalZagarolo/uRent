import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { RiCalendarEventFill } from "react-icons/ri";

interface CalenderDayDetailProps {
    day_date: Date;
}

const CalenderDayDetail: React.FC<CalenderDayDetailProps> = ({
    day_date
}) => {

    const renderSegments = () => {
        const segments = [];
        for (let hour = 8; hour <= 23; hour++) {
            segments.push(
                <div key={hour} className="dark:bg-[#131313]  text-sm flex items-center border-dashed border-b-2 dark:border-[#1C1C1C]">
                    <div className="p-4 w-1/4">
                        {hour}:00 <br/>Uhr
                    </div>
                    <div className="h-full ml-auto w-full">
                        <div className="h-1/2  w-full p-2">
                            2
                        </div>
                        <div className="h-1/2 p-2 rounded-r-md bg-rose-800">
                        ...
                        </div>
                    </div>
                </div>
            );
        }
        return segments;
    };

    return (
        <Dialog>

            <DialogTrigger>
                {format(new Date(day_date), "d")}
            </DialogTrigger>
            <DialogContent className="p-0 dark:border-none dark:bg-[#191919]">
                <div className="h-[520px] overflow-y-auto no-scrollbar">
                    <h3 className="font-medium text-sm flex items-center gap-x-2 px-4 pt-6">
                        <RiCalendarEventFill className="w-4 h-4 text-indigo-800" />
                        <div className="font-semibold">
                            {format(new Date(day_date), "d. MMMM yyyy", { locale: de })}{" "}
                        </div>
                        <div className="dark:text-gray-200">Verfügbarkeitsübersicht</div>
                    </h3>
                    <p className="px-4 text-xs dark:text-gray-200/60">
                        Finde heraus, wann das Inserat verfügbar ist, und wann nicht.
                    </p>                    

                    <div className="mt-4">
                        {renderSegments()}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CalenderDayDetail;