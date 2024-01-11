import { db } from "@/app/utils/db";
import InseratCard from "../_components/inserat-card";
import { CalendarCheck, GanttChart } from "lucide-react";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Images, Inserat, User } from "@prisma/client";




interface NewestInserateProps {
    inserateArray : Inserat[] & { images : Images[]; user : User }[]
}

const NewestInserate: React.FC<NewestInserateProps> = async ({
    inserateArray
}) => {
    const currentUser = await getCurrentUser();

    const purchases = await db.purchase.findMany({
        where : {
            userId : currentUser.id
        }
    })

    const favedInserate = await db.favourite.findMany({
        where : {
            userId : currentUser.id
        }
    })

    return ( 
        <div>
            
            <div className="flex">
                <GanttChart className="mr-2"/>
                <h3 className="mt-4 font-bold text-xl ml-8 flex">
                    <CalendarCheck className="mr-2"/> 
                Neueste Anzeigen
                </h3>
            </div>
            <div className="flex ml-16 mt-2">
                {inserateArray.map((inserat) => (
                    <InseratCard
                     inserat={inserat}
                     profileId={currentUser.id}
                     isFaved = {favedInserate.some((favedInserat) => favedInserat.inseratId === inserat.id)}
                     owned = {purchases.some((purchase) => purchase.inseratId === inserat.id)}
                    />
                ))}
            </div>
        </div>
     );
}
 
export default NewestInserate;