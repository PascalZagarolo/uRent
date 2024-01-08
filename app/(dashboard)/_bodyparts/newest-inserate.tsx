import { db } from "@/app/utils/db";
import InseratCard from "../_components/inserat-card";
import { CalendarCheck, GanttChart } from "lucide-react";
import getCurrentUser from "@/app/actions/getCurrentUser";



const NewestInserate = async ({
    
}) => {
    const currentUser = await getCurrentUser();

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
            id : currentUser.id
        }
    })

    return ( 
        <div>
            <div className="flex">
                <GanttChart className="mr-2"/>
                <h3 className="mt-8 font-bold text-xl ml-8 flex">
                    <CalendarCheck className="mr-2"/> 
                Neueste Anzeigen
                </h3>
            </div>
            <div className="flex ml-16 mt-8">
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
 
export default NewestInserate;