import LogOutButton from "@/components/logout-button";
import getCurrentUser from "../actions/getCurrentUser";
import NewestInserate from "./_bodyparts/newest-inserate";
import CategoryDashboard from "./_components/category-dashboard";
import RelevanteInserate from "./_bodyparts/relevant-inserate";
import { useSearchParams } from "next/navigation";


const Main = async () => {
    
   
    
    return ( 
        <div className="">
            <div className="">
                <CategoryDashboard/>
            </div>
            <div>
            <NewestInserate
            
            />
            <div className="mt-20">
                <RelevanteInserate/>
            </div>
            </div>
            
        </div>
     );
}
 
export default Main;