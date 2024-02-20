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

import HeaderLogo from "./_components/header-logo";


type InserateWithImages = Inserat & {
    images : Images[]
}

interface MainPageProps {
    searchParams : {
        title : string,
        category: Category,
        start: string,
        end: string,
        filter : string,
        page : number,
        periodBegin : string,
        periodEnd: string
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
            OR : [
              {
                annual : true
              }, {
                begin : {
                  gte : new Date()
                }
              }
            ]
            
        }, orderBy : {
            views : "desc"
        }
        
    })
    
    return ( 
        <div className="relative sm:h-full sm:overflow-y-auto no-scrollbar">
  {/* Fixed Header and Sidebar */}
  <div className="fixed top-0 w-full z-50">
    
      <HeaderLogo currentUser={currentUser} />
      
      <MainPageSidebar treffer={inserate.length} />
      
    
  </div>

      
  
  <div className="2xl:ml-72 sm:mt-24 ml-4 relative sm:z-0">
  
    <div className=" sm:block overflow-y-auto sm:overflow-hidden no-scrollbar flex items-center justify-center ">
    <RelevanteInserate
              title={searchParams.title}
              category={searchParams.category}
              filter={searchParams.filter}
              start={searchParams.start}
              end={searchParams.end}
              page={searchParams.page} 
              periodBegin={searchParams.periodBegin} 
              periodEnd={searchParams.periodEnd}      />
    </div>

    
    
  </div>
</div>


     );
}
 
export default Main;