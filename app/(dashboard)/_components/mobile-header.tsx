import SearchItem from "./search-item";
import MobileLogoDialog from "./mobile-logo-dialog";

const MobileHeader = () => {

    

    return ( 
        <div className="bg-[#1f2332] h-[100px] border-2 border-black p-2">
            <div className="flex items-center">
                <MobileLogoDialog/>
                <div className="flex justify-center ml-4 p-2">
                    <SearchItem/>
                </div>
            </div>
        </div>
     );
}
 
export default MobileHeader;