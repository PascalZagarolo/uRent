

import { FilePieChartIcon } from "lucide-react"

import getCurrentUser from "@/actions/getCurrentUser"

import InserateRenderList from "./_components/inserat-render-list"

import SidebarDashboard from "../../_components/sidebar-dashboard"
import db from "@/db/drizzle"
import { eq } from "drizzle-orm"
import { inserat, userSubscription, vehicle } from "@/db/schema"
import MenuBar from "../../_components/menu-bar"
import BreadCrumpPage from "../../_components/bread-crump-page"



const InserateOverview = async ({
    params
} : { params : { userId : string }}) => {

    const currentUser = await getCurrentUser();

    

    let publics = [];
    let draft = [];

    const inserateArray = await db.query.inserat.findMany({
        where : (
            eq(inserat.userId, currentUser?.id)
        ),
        with : {
            images : true,
            user : true,
            vehicles : true
        }, orderBy :  (inserat, {desc}) => [desc(inserat.createdAt)]
       
    })

    const existingPurchases = await db.query.userSubscription.findMany({
        where : (
            eq(userSubscription.userId, currentUser?.id)
        )
    })

    for (let i = 0; i < inserateArray.length; i++) {
        if (inserateArray[i].isPublished) {
            publics.push(inserateArray[i])
        } else {
            draft.push(inserateArray[i])
        }
    }

    

    



    return ( 
        
            
            <div className="flex justify-center sm:py-8 sm:px-4">
            
                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="min-h-screen">
                    <div>
                        <MenuBar
                        isBusiness = {currentUser.isBusiness}
                        />
                        <div>
                            <BreadCrumpPage />
                        </div>
                    </div>

                        <div className="sm:p-4 p-2 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                <FilePieChartIcon className="mr-4" /> Meine Inserate <p className="ml-4 text-lg"> {inserateArray.length}</p>
                            </h3>
                            <p className="text-xs dark:text-gray-200/60 ">
                            Verwalte deine Anzeigen, indem du Inhalte änderst, löscht, bearbeitest oder ihre Sichtbarkeit anpasst. 
                            <br/> Darüber hinaus kannst du hier ganz einfach die Verfügbarkeit deiner Fahrzeuge aktualisieren.
                            </p>
                            <div className="sm:p-4 ">
                                {inserateArray.length > 0 ? (
                                    <InserateRenderList 
                                    
                                    inserateArray={inserateArray}
                                    />
                                ) : (
                                    <div className="flex justify-center text-gray-100/70">
                                        Noch keine Inhalte erstellt...
                                    </div>
                                )}
                            </div>
                    </div>

                    </div>
                </div>
                </div>
                        
        
     ) 
    }
export default InserateOverview 