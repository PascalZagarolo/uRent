import RequiredAgeSearch from "./condition-data/req-age-search";
import CautionSearch from "./condition-data/caution-search";
import FreeMilesSearch from "./condition-data/free-miles";
import LicenseSearch from "./condition-data/license-search";
import ExtraMilesSearch from "./condition-data/extra-miles-search";
import AmountSearch from "./condition-data/amount-search";
import { FileText } from "lucide-react";

const ConditionsSearch = () => {
    return (
        <div className="space-y-5">
            <div className="flex items-center space-x-2">
               
                <h3 className="text-md font-semibold text-gray-100">Mietkonditionen</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                    <LicenseSearch />
                </div>
                <div>
                    <CautionSearch />
                </div>
                <div>
                    <RequiredAgeSearch />
                </div>
            </div>
        </div>
    );
}

export default ConditionsSearch;