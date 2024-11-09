import { Separator } from "@/components/ui/separator";
import DateSearch from "./base-date/date-search";
import TimeSearch from "./base-date/time-search";
import MinTimeSearch from "./base-date/min-time-search";
import UdsLayoutSearchRender from "./_dynamic-search/uds-layout-search";

const DynamicSearchRender = () => {
    return ( 
        <div>
            {/* <h3 className="font-semibold text-md flex items-center dark:text-gray-100">
                Dynamischer Mietzeitraum
                <Separator
                    className="h-[0.5px] dark:bg-gray-100/20 w-2/3 ml-6"

                />
            </h3> */}
            <div className="w-full">
                <UdsLayoutSearchRender/>
            </div>
            
        </div>
     );
}
 
export default DynamicSearchRender;