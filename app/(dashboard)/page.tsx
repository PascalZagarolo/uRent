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
import { db } from "@/utils/db";
import RelevanteInserateMobile from "./_bodyparts/relevante-inserate-mobile";


type InserateWithImages = Inserat & {
    images : Images[]
}

interface MainPageProps {
    searchParams : {
        title : string,
        category: Category,
        start: string,
        end: string,
        filter : string
    }
}

const Main = async ({
    searchParams
} : MainPageProps) => {  

    const currentUser = await getCurrentUser();

    const start = Number(searchParams.start)
    const end = Number(searchParams.end)
    
    

    const inserate = await db.inserat.findMany({
        where : {
            category : searchParams.category,
            title : {
                contains : searchParams.title
            },
            isPublished : true,
            
        }, orderBy : {
            price : "asc"
        }
        
    })
    
    return ( 
        <div className="flex sm:h-full h-screen">
  <div className="h-full fixed">
    <MainPageSidebar treffer={inserate.length} />
  </div>
  <div className="sm:ml-72 mt-4 sm:block ml-4 hidden  sm:h-full w-full mr-2">
    <RelevanteInserate title={searchParams.title} category={searchParams.category} filter={searchParams.filter}
     start={searchParams.start} end={searchParams.end} />
  </div>
  <div className="mt-2 ml-4 overflow-y-auto sm:hidden">
        <RelevanteInserateMobile title={searchParams.title} category={searchParams.category} filter={searchParams.filter}
     start={searchParams.start} end={searchParams.end}/>
  </div>
</div>

     );
}
 
export default Main;