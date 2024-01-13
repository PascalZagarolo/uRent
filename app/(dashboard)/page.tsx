import LogOutButton from "@/components/logout-button";
import getCurrentUser from "../../actions/getCurrentUser";
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
        title : string,
        category: string
    }
}

const Main = async ({
    searchParams
} : MainPageProps) => {  

    const currentUser = await getCurrentUser();
    
    
    return ( 
        <div className="">
            
            <div className="hidden sm:block">
                <CategoryDashboard/>
            </div>
            <div>
            
            <div className="items-center flex justify-center">
                <RelevanteInserate
                title = {searchParams.title}
                />
            </div>
            </div>
            
        </div>
     );
}
 
export default Main;