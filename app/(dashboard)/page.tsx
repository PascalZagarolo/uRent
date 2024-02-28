
import getCurrentUser from "../../actions/getCurrentUser";


import RelevanteInserate from "./_bodyparts/relevant-inserate";

import { Images, Inserat } from "@prisma/client";
import MainPageSidebar from "./_components/main-page-sidebar";
import type { Category } from "@prisma/client";
import { db } from "@/utils/db";

import HeaderLogo from "./_components/header-logo";
import { TruckIcon } from "lucide-react";
import Footer from "./_components/footer";


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
        periodEnd: string,
        location: string
    }
}

const Main = async ({
    searchParams
} : MainPageProps) => {  

    const currentUser = await getCurrentUser();

    const start = Number(searchParams.start)
    const end = Number(searchParams.end)
    
    

    

    const notifications = await db.notification.findMany({
      where : {
        userId : currentUser?.id
      }
    })
    
    return ( 
        <div className=" sm:h-full sm:overflow-y-auto no-scrollbar">
  
  <div className="relative top-0 w-full z-50">
    
      <HeaderLogo 
      currentUser={currentUser} 
      notifications = {notifications} />
      
      
    
  </div>
  

 <div>
 <div className="relative flex justify-center mt-4">
  <div className="top-0 sm:mr-4 ">
      <MainPageSidebar treffer={12} />
      </div>
      <div className=" sm:block overflow-y-auto sm:overflow-hidden no-scrollbar flex items-center justify-center h-[100%] ">
      <RelevanteInserate
              title={searchParams.title}
              category={searchParams.category}
              filter={searchParams.filter}
              start={searchParams.start}
              end={searchParams.end}
              page={searchParams.page} 
              periodBegin={searchParams.periodBegin} 
              periodEnd={searchParams.periodEnd}
              location={searchParams.location}
              />
      </div>
      
  </div>
  
 </div>
 
      
     <Footer/>
  
      
      
     

      
      
      
</div>


     );
}
 
export default Main;