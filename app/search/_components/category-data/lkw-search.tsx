import LkwApplicationSearch from "../_lkw/lkw-application-search";
import LkwBrandSearch from "../_lkw/lkw-brand-search";
import LkwDriveSearch from "../_lkw/lkw-drive-search";
import LkwLoadingSearch from "../_lkw/lkw-loading-search";
import LkwSeatsSearch from "../_lkw/lkw-seats-search";
import LkwWeightClassSearch from "../_lkw/lkw-weightclass-search";

const LkwSearch = () => {
    return ( 
        <div className="w-full">
            <div className="w-full flex gap-x-2">
        	    <div className="w-1/3">
<LkwBrandSearch />
                </div>
                <div className="w-1/3">
<LkwApplicationSearch />
                </div>
                <div className="w-1/3">
<LkwLoadingSearch />
                </div>
            </div>
            <div className="w-full flex gap-x-2 mt-4">
        	    <div className="w-1/3">
<LkwDriveSearch />
                </div>
                <div className="w-1/3">
<LkwWeightClassSearch />
                </div>
                <div className="w-1/3">
<LkwSeatsSearch />
                </div>
            </div>
        </div>
     );
}
 
export default LkwSearch;