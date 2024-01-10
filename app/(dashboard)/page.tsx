import LogOutButton from "@/components/logout-button";
import getCurrentUser from "../actions/getCurrentUser";
import NewestInserate from "./_bodyparts/newest-inserate";
import CategoryDashboard from "./_components/category-dashboard";
import RelevanteInserate from "./_bodyparts/relevant-inserate";
import { useSearchParams } from "next/navigation";
import { getInserate } from "@/actions/getInserate";
import { Images, Inserat } from "@prisma/client";


type InserateWithImages = Inserat & {
    images : Images[]
}

interface MainPageProps {
    searchParams : {
        title : string
    }
}

const Main = async ({
    searchParams
} : MainPageProps) => {  

    const currentUser = await getCurrentUser();
    const inserate = await getInserate({title : searchParams.title});
    
    return ( 
        <div className="">
            
            <div className="">
                <CategoryDashboard/>
            </div>
            <div>
            
            <div className="items-center flex">
                <RelevanteInserate
                inserateArray = {inserate}
                />
            </div>
            </div>
            
        </div>
     );
}
 
export default Main;