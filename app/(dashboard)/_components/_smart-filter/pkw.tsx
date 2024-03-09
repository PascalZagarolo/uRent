import DateFormFilter from "./_components/date-filter";
import LocationSmartFilter from "./_components/location";
import PriceFormFilter from "./_components/price";


const PKW = () => {
    return ( 
        <div className="w-full">
            <div className="mt-4 flex justify-center">
                <PriceFormFilter/>
            </div>
            <div className="mt-4 flex justify-center">
                <DateFormFilter/>
            </div>
            
        </div>
     );
}
 
export default PKW;
