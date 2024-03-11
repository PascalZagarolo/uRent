
import { Separator } from "@/components/ui/separator";
import RequiredAgeSearch from "./condition-data/req-age-search";
import CautionSearch from "./condition-data/caution-search";
import FreeMilesSearch from "./condition-data/free-miles";
import LicenseSearch from "./condition-data/license-search";
import ExtraMilesSearch from "./condition-data/extra-miles-search";

const ConditionsSearch = () => {
    return (
        <div>
            <h3 className="font-semibold text-md flex items-center dark:text-gray-100">
                Mietkonditionen
                <Separator
                    className="h-[0.5px] dark:bg-gray-100/20 w-2/3 ml-6"

                />
            </h3>
            <div className="w-full flex mt-4 space-x-4">
                <div className="w-1/3">
                    <LicenseSearch />
                </div>
                <div className="w-1/3">
                    <CautionSearch />
                </div>
                <div className="w-1/3">
                    <RequiredAgeSearch />
                </div>

            </div>
            <div className="w-full flex mt-4 space-x-4">
                <div className="w-1/2">
                    <FreeMilesSearch />
                </div>
                <div className="w-1/2">
                    <ExtraMilesSearch />
                </div>

            </div>
        </div>
    );
}

export default ConditionsSearch;