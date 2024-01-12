import { db } from "@/app/utils/db";
import InseratCard from "../_components/inserat-card";
import { CalendarCheck, GanttChart } from "lucide-react";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Images, Inserat, User } from "@prisma/client";




interface NewestInserateProps {
    inserateArray: Inserat[] & { images: Images[]; user: User }[]
}

const NewestInserate: React.FC<NewestInserateProps> = async ({
    inserateArray
}) => {
    const currentUser = await getCurrentUser();

    const purchases = await db.purchase.findMany({
        where: {
            userId: currentUser.id
        }
    })

    const favedInserate = await db.favourite.findMany({
        where: {
            userId: currentUser.id
        }
    })

    return (
        <div>

            
        </div>
    );
}

export default NewestInserate;