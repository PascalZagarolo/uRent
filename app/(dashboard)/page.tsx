import LogOutButton from "@/components/logout-button";
import getCurrentUser from "../actions/getCurrentUser";

const Main = async () => {
    const currentUser = await getCurrentUser();
    
    return ( 
        <div>
            Hallo!!
            sd
            <div>
                <LogOutButton/>
            </div>
        </div>
     );
}
 
export default Main;