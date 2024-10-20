

import { FilePieChartIcon } from "lucide-react"

import getCurrentUser from "@/actions/getCurrentUser"

import InserateRenderList from "./_components/inserat-render-list"


import db from "@/db/drizzle"
import { eq } from "drizzle-orm"
import { inserat, userSubscription, vehicle } from "@/db/schema"
import MenuBar from "../../_components/menu-bar"
import BreadCrumpPage from "../../_components/bread-crump-page"
import HighlightInserat from "./_components/highlight-inserat"
import getCurrentUserWithSubscriptionAndInserate from "@/actions/getCurrentUserWithSubscriptionAndInserate"
import { FaChartPie } from "react-icons/fa"



const InserateOverview = async ({
    params
} : { params : { userId : string }}) => {

    const currentUser = await getCurrentUserWithSubscriptionAndInserate();

    

    let publics = [];
    let draft = [];

    const findInserate = db.query.inserat.findMany({
        where : (
            eq(inserat.userId, currentUser?.id)
        ),
        with : {
            images : true,
            user : {
                with : {
                    subscription :true
                }
            },
            vehicles : true,
            address : true
        }, orderBy :  (inserat, {desc}) => [desc(inserat.createdAt)]
       
    }).prepare("findInserate")

    const inserateArray = await findInserate.execute();

    

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
                        setCurrentTab={null}
                        />
                        <div>
                            <BreadCrumpPage />
                        </div>
                    </div>

                        <div className="sm:p-4 p-2 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                <FilePieChartIcon className="mr-4" /> Meine Inserate
                            </h3>
                            <p className="text-xs dark:text-gray-200/60 ">
                            Verwalte deine Anzeigen, indem du Inhalte änderst, löscht, bearbeitest oder ihre Sichtbarkeit anpasst. 
                            <br/> Darüber hinaus kannst du hier ganz einfach die Verfügbarkeit deiner Fahrzeuge aktualisieren.
                            </p>
                            <div className="sm:p-4">
                                <HighlightInserat 
                                foundInserate={inserateArray as any}
                                currentUser={currentUser as any}
                                existingSubscription={currentUser?.subscription as any}
                                />
                            </div>
                            <div className="sm:px-4 font-semibold text-sm flex items-center gap-x-4 mb-2 sm:mb-0">
                                <div>
                                    <FaChartPie  className="w-6 h-6" />
                                </div>
                                <div className="">
                                {inserateArray.length} erstellte {inserateArray.length === 1 ? "Inserat" : "Inserate"},
                                </div>
                                <div className="text-emerald-600">
                                    {inserateArray.filter((inserat) => inserat.isPublished).length} Veröffentlicht
                                </div>
                                <div className="text-gray-200/60">
                                    {inserateArray.filter((inserat) => !inserat.isPublished).length} Entwürfe
                                </div>
                            </div>
                            <div className="sm:p-4 ">
                                {inserateArray.length > 0 ? (
                                    <InserateRenderList 
                                    //@ts-ignore
                                    inserateArray={inserateArray}
                                    currentUser = {currentUser as any}
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