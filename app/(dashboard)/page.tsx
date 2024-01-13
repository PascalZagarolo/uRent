import LogOutButton from "@/components/logout-button";
import getCurrentUser from "../../actions/getCurrentUser";
import NewestInserate from "./_bodyparts/newest-inserate";
import CategoryDashboard from "./_components/category-dashboard";
import RelevanteInserate from "./_bodyparts/relevant-inserate";
import { useSearchParams } from "next/navigation";
import { getInserate } from "@/actions/getInserate";
import { Images, Inserat } from "@prisma/client";
import MainPageSidebar from "./_components/main-page-sidebar";
import type { Category } from "@prisma/client";


type InserateWithImages = Inserat & {
    images : Images[]
}

interface MainPageProps {
    searchParams : {
        title : string,
        category: Category
    }
}

const Main = async ({
    searchParams
} : MainPageProps) => {  

    const currentUser = await getCurrentUser();
    
    
    return ( 
        <div className="w-full flex">
            <div className="">
                <MainPageSidebar/>
            </div>
            
            <div className="mt-4 ">
            <RelevanteInserate
                title = {searchParams.title}
                category = {searchParams.category}
                />
            </div>
        </div>
     );
}
 
export default Main;