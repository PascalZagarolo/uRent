
import LicenseBar from "./conditions/conditions-license";
import { IoIosPaper } from "react-icons/io";
import RequiredAgeBar from "./conditions/conditions-req-age";
import AmountBar from "./conditions/conditions-amount";

const ConditionsSearchComponent = () => {
    return (
        <div className="  mr-2 ml-2 space-y-4">
            <div className="p-2 bg-[#1B1F2C] rounded-md">

                <div className="w-full flex justify-start items-center text-lg text-gray-200">
                    <IoIosPaper className="h-6 w-6 mr-4"/>    Mietkonditionen
                </div>
            </div>
            <div className="w-full flex gap-x-4">
                <div className="w-1/2">
                    <LicenseBar />
                </div>
                <div className="w-1/2">
                    <RequiredAgeBar />
                </div>
            </div>
            <AmountBar/>
        </div>
    );
}

export default ConditionsSearchComponent;