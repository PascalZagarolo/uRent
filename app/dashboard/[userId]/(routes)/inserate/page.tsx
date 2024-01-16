import { db } from "@/utils/db"
import InseratDrafts from "./_components/inserat-drafts"
import { PencilRuler } from "lucide-react"
import InseratPublic from "./_components/public-inserat"


const InserateOverview = async ({
    params
} : { params : { userId : string }}) => {

    const drafts = await db.inserat.findMany({
        where : {
            userId : params.userId
        },
        include : {
            images : true,
            user: true
        }, orderBy : {
            createdAt : "desc"
        }
    })

    const publicInserate = await db.inserat.findMany({
        where :{
            userId : params.userId,
            isPublished : true
        }, include : {
            images : true,
            user : true
        }
        
    })

    



    return ( 
        <div className=" ">
            <div>
                <h3 className="text-2xl font-bold flex justify-center mt-4 p-4 border border-black rounded-lg bg-[#12151e] text-gray-100">
                   <PencilRuler className="w-6 h-6 mr-2" /> Meine Veröffentlichungen ( {drafts.length} )
                </h3>
            </div>
            <div>
                <div className="flex gap-x-2 justify-between mt-4">
                {publicInserate.map((draft) => (
                        <InseratPublic
                        key={draft.id}
                        profileId={params.userId}
                        inserat={draft}
                        />
                    ))}
                </div>
                <div className="mt-16">
                <h3 className="text-2xl font-bold flex justify-center border border-black rounded-lg bg-[#12151e] text-gray-100 p-4">
                   <PencilRuler className="w-6 h-6 mr-2" /> Meine Entwürfe ( {drafts.length} )
                </h3>
            </div>
                <div className="gap-x-2 flex justify-between mt-4">
                    {drafts.map((draft) => (
                        <InseratDrafts
                        key={draft.id}
                        profileId={params.userId}
                        inserat={draft}
                        />
                    ))}
                </div>
            </div>
        </div>
     ) 
    }
export default InserateOverview 