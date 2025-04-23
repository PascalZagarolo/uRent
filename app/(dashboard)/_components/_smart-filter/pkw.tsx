import UdsDialog from "../urent-dynamic-search/uds-dialog/uds-dialog";
import UdsLayout from "../urent-dynamic-search/uds-layout";
import DateFormFilter from "./_components/date-filter";
import LocationSmartFilter from "./_components/location";
import PriceFormFilter from "./_components/price";
import ReqRentTime from "./_components/req-rent-time";


const PKW = () => {
    return ( 
        <div className="w-full">
            <div className=" flex justify-center">
            <PriceFormFilter/>
            </div>
            
            <div className="mt-8 flex justify-center">
                <DateFormFilter/>
            </div>
            <div className=" flex justify-center px-2 mb-4">
                <ReqRentTime />
            </div>
             {/* <div className="mt-4 flex justify-center">
                <UdsLayout/>
            </div>  */}
             <div className="mt-4 flex justify-center">
             <UdsDialog />
            </div> 
        </div>
     );
}
 
export default PKW;
