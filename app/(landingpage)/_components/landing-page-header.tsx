import { TruckIcon } from "lucide-react";
import NavigationBar from "./navigation-bar";
import RentNow from "./rent-now";

const LandingPageHeader = () => {
    return ( 
        <div>
            <div className="p-8 flex items-center bg-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <h3 className="flex font-semibold text-2xl items-center">
                  <TruckIcon className="mr-1"/>  <p className="flex  text-[#414c78]">u</p>Rent
                </h3>
                <div className="ml-16">
                    <RentNow/>
                </div>
                <div className="flex ml-auto">
                <NavigationBar/>
                </div>
            </div>
        </div>
     );
}
 
export default LandingPageHeader;