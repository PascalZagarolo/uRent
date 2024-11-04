import { Separator } from "@/components/ui/separator";
import DateSearch from "./base-date/date-search";
import TimeSearch from "./base-date/time-search";
import MinTimeSearch from "./base-date/min-time-search";

const TimespanSearchRender = () => {
    return ( 
        <div>
            <h3 className="font-semibold text-md flex items-center dark:text-gray-100">
                Mietzeitraum
                <Separator
                    className="h-[0.5px] dark:bg-gray-100/20 w-2/3 ml-6"

                />
            </h3>
            <div className="w-full sm:flex mt-4 sm:space-x-4 sm:space-y-0 space-y-2sm:space-y-0 space-y-2">
                <div className="sm:w-1/3">
                    <MinTimeSearch />
                </div>
                <div className="sm:w-1/3">
                    <DateSearch />
                </div>
                <div className="sm:w-1/3">
                    <TimeSearch />
                </div>
            </div>
        </div>
     );
}
 
export default TimespanSearchRender;