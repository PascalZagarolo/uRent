
import LicenseBar from "./conditions/conditions-license";
import { IoIosPaper } from "react-icons/io";
import RequiredAgeBar from "./conditions/conditions-req-age";
import AmountBar from "./conditions/conditions-amount";
import CautionBar from "./conditions/conditions-caution";

const ConditionsSearchComponent = () => {
    return (
        <div className="  space-y-4">
            <div className="p-2  ">

                <div className="w-full flex justify-start items-center text-lg text-gray-200">
                    <IoIosPaper className="h-6 w-6 mr-4"/> 
                    Mietkonditionen
                </div>
            </div>
            <div className="w-full flex gap-x-4 px-2">
                <div className="w-1/2">
                    <LicenseBar />
                </div>
                <div className="w-1/2">
                    <RequiredAgeBar />
                </div>
            </div>
            <div className="px-2">
            <CautionBar/>
            </div>
            <div className="px-2">
           {/*Later: Add reworked amount filter */}
            </div>
        </div>
    );
}

export default ConditionsSearchComponent;