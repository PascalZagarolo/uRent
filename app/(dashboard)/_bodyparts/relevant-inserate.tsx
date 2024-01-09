import getCurrentUser from "@/app/actions/getCurrentUser";
import { db } from "@/app/utils/db";
import { TrendingUp } from "lucide-react";
import InseratCard from "../_components/inserat-card";



const RelevanteInserate = async () => {

    const currentUser = await getCurrentUser()

    const inserate = await db.inserat.findMany({
        where : {
            isPublished : true
        }, include : {
            images : true,
            user : true
        }
    })

    const favedInserate = await db.favourite.findMany({
        where : {
            userId : currentUser.id
        }
    })

    return ( 
        <div>
            <div>
            <h3 className="mt-8 font-bold text-xl ml-8 flex">
                    <TrendingUp className="mr-2"/> 
                Relevante Anzeigen
                </h3>
            </div>
            <div className="flex ml-16 mt-4">
                { inserate.map((inserat) => (
                    <InseratCard
                     inserat = {inserat}
                     profileId={currentUser.id}
                     isFaved = {favedInserate.some((favedInserat) => favedInserat.inseratId === inserat.id)}
                    />
                ))}
            </div>
        </div>
     );
}
 
export default RelevanteInserate;