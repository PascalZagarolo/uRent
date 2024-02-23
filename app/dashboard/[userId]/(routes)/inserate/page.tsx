import { db } from "@/utils/db"
import InseratDrafts from "./_components/inserat-drafts"
import { PencilRuler } from "lucide-react"
import InseratPublic from "./_components/public-inserat"


const InserateOverview = async ({
    params
} : { params : { userId : string }}) => {

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
        <div className=" ">
            <div>
                <h3 className="text-2xl font-bold flex justify-center mt-4 p-4 border border-black rounded-lg bg-[#1b1f2c] text-gray-100">
                   <PencilRuler className="w-6 h-6 mr-2" /> Meine Veröffentlichungen ( {publics.length} )
                </h3>
            </div>
            <div className="">
                {publics.length > 0 ? (
                    <div className=" gap-x-2 justify-between mt-4 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2">
                        {publics.map((draft) => (
                        <InseratPublic
                        key={draft.id}
                        profileId={params.userId}
                        inserat={draft}
                        />
                    ))}
                    </div>
                    
                ) : (
                    <div>
                        <h3 className="text-lg italic font-bold flex justify-center  p-4   rounded-lg  text-gray-900/50">
                            Du hast noch keine Anzeigen veröffentlicht
                        </h3>
                    </div>
                )}
                
                <div className="mt-16">
                <h3 className="text-2xl font-bold flex justify-center border border-black rounded-lg bg-[#1b1f2c] text-gray-100 p-4">
                   <PencilRuler className="w-6 h-6 mr-2" /> Meine Entwürfe ( {draft.length} )
                </h3>
            </div>
                <div>
                <div className=" gap-x-2 justify-between mt-4 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2">
                    {draft.map((draft) => (
                        <InseratDrafts
                        key={draft.id}
                        profileId={params.userId}
                        inserat={draft}
                        />
                    ))}
                </div>
                </div>
            </div>
        </div>
     ) 
    }
export default InserateOverview 