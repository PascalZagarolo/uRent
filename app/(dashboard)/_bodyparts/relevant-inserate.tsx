import getCurrentUser from "@/app/actions/getCurrentUser";
import { db } from "@/app/utils/db";
import { AlignCenter, TrendingUp, } from "lucide-react";
import InseratCard from "../_components/inserat-card";
import { Images, Inserat, User } from "@prisma/client";

interface RelevanteInserateProps {
    inserateArray: Inserat[] & { images: Images[]; user: User }[]
}

const RelevanteInserate: React.FC<RelevanteInserateProps> = async ({
    inserateArray
}) => {

    const currentUser = await getCurrentUser()

    const inserate = await db.inserat.findMany({
        where: {
            isPublished: true
        }, include: {
            images: true,
            user: true
        }
    })

    const favedInserate = await db.favourite.findMany({
        where: {
            userId: currentUser.id
        }
    })

    return (
        <div>
            <div>
                <div className="ml-4">
                    <AlignCenter/>
                </div>
                <h3 className="ml-8 mt-2 font-bold text-2xl">
                    Relevante Inserate
                </h3>
            </div>
        <div className="flex flex-wrap justify-between">
            
            {inserateArray.map((inserat) => (
                <div className="w-full md:w-1/3 p-4 mb-4 flex-grow">
                    <InseratCard
                        inserat={inserat}
                        profileId={currentUser.id}
                        isFaved={favedInserate.some((favedInserat) => favedInserat.inseratId === inserat.id)}
                        style={{ alignSelf: 'flex-end' }}
                    />
                </div>
            ))}
        </div>
        </div>

    );
}

export default RelevanteInserate;