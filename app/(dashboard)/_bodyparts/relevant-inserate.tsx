import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import { AlignCenter, TrendingUp, } from "lucide-react";
import InseratCard from "../_components/inserat-card";
import { Images, Inserat, User } from "@prisma/client";
import { getInserate } from "@/actions/getInserate";

interface RelevanteInserateProps {
    title : string
}

const RelevanteInserate: React.FC<RelevanteInserateProps> = async ({
    title
}) => {

    const currentUser = await getCurrentUser()

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

    const inserateArray = await getInserate({title : title});

    return (
        <div className="">
            
            <div className="h-full flex sm:block sm:mt-0 mt-4">
                <div className="ml-4">
                    <AlignCenter />
                </div>
                <h3 className="ml-8  font-bold text-2xl h-full">
                    Relevante Inserate
                </h3>
            </div>
            {inserateArray.length < 1 ? (
                <div className="flex justify-center  overflow-y-hidden mt-48 ">
                    <h3 className="ml-8 font-bold text-3xl text-gray-800/50 italic flex justify-center items-center">
                        Keine passenden Angebote gefunden :/
                    </h3>
                </div>
            ) : (
                <div className="flex flex-wrap justify-between sm:mr-8 sm:ml-8">
                    {inserateArray.map((inserat) => (
                        <div className="w-full md:w-1/4 sm:ml-0  sm:mt-0 mt-4 sm:p-4 mb-4 flex-grow" key={inserat.id}>

                            <InseratCard
                                key={inserat.id}
                                inserat={inserat}
                                profileId={currentUser.id}
                                isFaved={favedInserate.some((favedInserat) => favedInserat.inseratId === inserat.id)}
                                owned={purchases.some((purchase) => purchase.inseratId === inserat.id)}

                            />
                        </div>
                    ))}

                </div>
            )}



        </div>

    );
}

export default RelevanteInserate;