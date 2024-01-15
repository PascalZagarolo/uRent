import LocationSmartFilter from "./_components/location";
import PriceFormFilter from "./_components/price";


const PKW = () => {
    return ( 
        <div>
            <div className="mt-4 flex justify-center">
                <PriceFormFilter/>
            </div>
            <div className="mt-8 flex justify-center">
                <LocationSmartFilter/>
            </div>
        </div>
     );
}
 
export default PKW;
