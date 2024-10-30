import { userTable } from "@/db/schema";
import InserateRenderList from "../(routes)/inserate/_components/inserat-render-list";
import { FaChartPie } from "react-icons/fa";
import HighlightInserat from "../(routes)/inserate/_components/highlight-inserat";
import { FilePieChartIcon } from "lucide-react";

interface InserateTabProps {
    currentUser : typeof userTable.$inferSelect | any;
}

const InserateTab = ({ currentUser } : InserateTabProps) => {
    
    let publics = [];
    let draft = [];

    

    const inserateArray = currentUser.inserat;

    

    for (let i = 0; i < inserateArray.length; i++) {
        if (inserateArray[i].isPublished) {
            publics.push(inserateArray[i])
        } else {
            draft.push(inserateArray[i])
        }
    }

    

    



    return ( 
                        <div className="sm:p-4 p-2 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                <FilePieChartIcon className="mr-4" /> Meine Inserate
                            </h3>
                            <p className="text-xs dark:text-gray-200/60 ">
                            Verwalte deine Anzeigen, indem du Inhalte änderst, löscht, bearbeitest oder ihre Sichtbarkeit anpasst. 
                            <br/> Darüber hinaus kannst du hier ganz einfach die Verfügbarkeit deiner Fahrzeuge aktualisieren.
                            </p>
                            {currentUser?.subscription?.subscriptionType === "ENTERPRISE" && (
                            <div className="sm:p-4">
                                <HighlightInserat 
                                foundInserate={inserateArray as any}
                                currentUser={currentUser as any}
                                existingSubscription={currentUser?.subscription as any}
                                />
                            </div>
                            )}
                            <div className="sm:px-4 font-semibold text-sm flex items-center gap-x-4 mb-2 sm:mb-0 mt-4">
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

                    
                        
        
     ) 
}
 
export default InserateTab;