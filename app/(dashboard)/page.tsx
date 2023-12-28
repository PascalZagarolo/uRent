import LogOutButton from "@/components/logout-button";
import getCurrentUser from "../actions/getCurrentUser";

const Main = async () => {
    
    const loggedUser = await getCurrentUser();
    return ( 
        <div>
            Hallo!!
            <div>
                <LogOutButton/>
            </div>
        </div>
     );
}
 
export default Main;