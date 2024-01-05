import LogOutButton from "@/components/logout-button";
import getCurrentUser from "../actions/getCurrentUser";
import NewestInserate from "./_bodyparts/newest-inserate";
import CategoryDashboard from "./_components/category-dashboard";

const Main = async () => {
    
    
    return ( 
        <div>
            <div className="">
                <CategoryDashboard/>
            </div>
            <div>
            <NewestInserate/>
            </div>
            
        </div>
     );
}
 
export default Main;