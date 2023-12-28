import { useSession } from "next-auth/react";
import LocationBar from "./location-bar";
import SearchItem from "./search-item";

const Header = () => {

    

    return ( 
        <div className="w-full h-[60px] bg-blue-800/90 mt-4 mb-4 outline outline-1 outline-offset-0 items-center">
            <div className="flex justify-center items-center">
            <div className="flex justify-center">
                <SearchItem/>
            </div>
            <div className="flex justify-center">
                <LocationBar/>
            </div>
            </div>
            
        </div>
     );
}
 
export default Header;