import { Separator } from "@/components/ui/separator";
import DateSearch from "./base-date/date-search";
import TimeSearch from "./base-date/time-search";
import MinTimeSearch from "./base-date/min-time-search";
import UdsLayoutSearchRender from "./_dynamic-search/uds-layout-search";

const DynamicSearchRender = () => {
    return ( 
        <div>
            <h3 className="font-semibold text-md dark:text-gray-100 mb-5">
                Dynamischer Mietzeitraum
            </h3>
            <div className="w-full">
            <UdsLayoutSearchRender/>
            </div>
        </div>
     );
}
 
export default DynamicSearchRender;