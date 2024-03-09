import { db } from "@/utils/db"
import InseratDrafts from "./_components/inserat-drafts"
import { ContrastIcon, FilePieChartIcon, PencilRuler, ReceiptIcon, TruckIcon } from "lucide-react"
import InseratPublic from "./_components/public-inserat"
import HeaderLogo from "@/app/(dashboard)/_components/header-logo"
import getCurrentUser from "@/actions/getCurrentUser"
import InserateDashboardRender from "./_components/inserate-dashboard-render"
import InserateRenderList from "./_components/inserat-render-list"
import Inserat from '@prisma/client';
import SidebarDashboard from "../../_components/sidebar-dashboard"



const InserateOverview = async ({
    params
} : { params : { userId : string }}) => {

    const currentUser = await getCurrentUser();

    const notifications = await db.notification.findMany({
        where :{
            userId : params.userId
        }
    })

    let publics = [];
    let draft = [];

    const inserateArray = await db.inserat.findMany({
        where : {
            userId : params.userId,
        },
        include : {
            images : true,
            user: true
        }, orderBy : {
            createdAt : "desc"
        }
    })

    for (let i = 0; i < inserateArray.length; i++) {
        if (inserateArray[i].isPublished) {
            publics.push(inserateArray[i])
        } else {
            draft.push(inserateArray[i])
        }
    }

    

    



    return ( 
        
            
            <div className="flex justify-center py-8 px-4">
            <div className="px-4 hidden md:block">
                <SidebarDashboard />
            </div>
                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">


                        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                <FilePieChartIcon className="mr-4" /> Meine Inserate <p className="ml-4 text-lg"> {inserateArray.length}</p>
                            </h3>
                            <div className="p-4 ">
                                <InserateRenderList 
                                //@ts-ignore
                                inserateArray={inserateArray}
                                />
                            </div>
                    </div>

                    </div>
                </div>
                </div>
                        
        
     ) 
    }
export default InserateOverview 