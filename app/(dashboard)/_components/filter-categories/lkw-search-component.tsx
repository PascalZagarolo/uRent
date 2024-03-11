
import LkwApplicationBar from "./lkw/lkw-application";
import LkwBrandBar from "./lkw/lkw-brand";
import PkwSeatsBar from "./pkw/pkw-seats";
import LkwLoadingBar from "./lkw/lkw-loading";
import LkwDriveBar from "./lkw/lkw-drive";
import LkwWeightClassBar from "./lkw/lkw-weight-class";

const LkwSearchComponent = () => {
    return ( 
        <div className="mt-2 space-y-4">
           <LkwBrandBar />
            <div className="w-full flex gap-x-2">
            <div className="w-1/2">
            <LkwApplicationBar />
            </div>
            <div className="w-1/2">
            <LkwLoadingBar />
            </div>
            </div>
            <div className="w-full flex gap-x-2">
            <div className="w-1/2">
            <LkwDriveBar />
            </div>
            <div className="w-1/2">
            <PkwSeatsBar />
            </div>
            </div>
            
            <LkwWeightClassBar />
            
            
        </div>
     );
}
 
export default LkwSearchComponent;