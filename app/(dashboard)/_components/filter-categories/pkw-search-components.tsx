
import PkwBrandBar from "./pkw/pkw-brand";
import PkwSeatsBar from "./pkw/pkw-seats";
import PkwDoorsBar from "./pkw/pkw-doors";

const PkwSearchComponents = () => {
    return ( 
        <div className="mt-2 space-y-4">
            <PkwBrandBar />
            <div className="w-full flex gap-x-2">
            <div className="w-1/2">
            <PkwSeatsBar />
            </div>
            <div className="w-1/2">
            <PkwDoorsBar />
            </div>
            </div>
        </div>
     );
}
 
export default PkwSearchComponents;