import { db } from "@/utils/db"
import InseratDrafts from "./_components/inserat-drafts"
import { PencilRuler } from "lucide-react"


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

    



    return ( 
        <div>
            <div>
                <h3 className="text-2xl font-bold flex justify-center">
                   <PencilRuler className="w-6 h-6 mr-2" /> Meine Entwürfe ( {drafts.length} )
                </h3>
            </div>
            <div>
                <div>
                    
                </div>
                <div className="gap-x-2 flex justify-between mt-8">
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