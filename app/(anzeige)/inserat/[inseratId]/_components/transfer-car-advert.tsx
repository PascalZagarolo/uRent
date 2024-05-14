import { FaShare } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

const TransferCarAdvert = () => {
    return ( 
        <div className="rounded-md bg-[#1B1D28] text-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)]">
            <div className="p-4">
                <h3 className="text-md font-semibold flex items-center">
                <MdLocalShipping className="w-4 h-4 mr-2" />    Du willst mehr Komfort?
                </h3>
                <div className="mt-1 text-xs font-medium">
                    Lasse das Fahrzeug bis vor deine Haustür liefern.
                </div>
                <div className="text-sm   ">
                    
                    <div>
                    <img 
                src="/transfery_v1.jpg"
                className=" object-cover  rounded-md"
                />
                    </div>
                    <div className="text-xs font-medium hover:underline flex items-center hover:cursor-pointer mt-2">
                        Zu unserem Partner <FaShare className="w-4 h-4 ml-2" />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default TransferCarAdvert;