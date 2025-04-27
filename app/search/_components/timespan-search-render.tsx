import DateSearch from "./base-date/date-search";
import TimeSearch from "./base-date/time-search";
import MinTimeSearch from "./base-date/min-time-search";

const TimespanSearchRender = () => {
    return ( 
        <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-5">
                Mietzeitraum
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                <div className="bg-[#18181f]/70 rounded-lg p-4 hover:bg-[#18181f] transition-colors">
                    <MinTimeSearch />
                </div>
                <div className="bg-[#18181f]/70 rounded-lg p-4 hover:bg-[#18181f] transition-colors">
                    <DateSearch />
                </div>
                <div className="bg-[#18181f]/70 rounded-lg p-4 hover:bg-[#18181f] transition-colors">
                    <TimeSearch />
                </div>
            </div>
        </div>
     );
}
 
export default TimespanSearchRender;