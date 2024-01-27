import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import { AlignCenter, Search, TrendingUp, } from "lucide-react";
import InseratCard from "../_components/inserat-card";
import { Images, Inserat, User } from "@prisma/client";
import { getInserate } from "@/actions/getInserate";
import type { Category } from "@prisma/client";
import OrderBy from "../_components/_smart-filter/order-by";
import { getSession } from "next-auth/react";

interface RelevanteInserateMobileProps {
    title: string;
    category: Category;
    filter: string;
    start: string;
    end: string;
    page: number;
}

const RelevanteInserateMobile: React.FC<RelevanteInserateMobileProps> = async ({
    title,
    category,
    filter,
    start,
    end,
    page
}) => {

    const currentUser = await getCurrentUser()




    const purchases = await db.purchase.findMany({
        where: {
            userId: currentUser?.id 
        }
    })

    const favedInserate = await db.favourite.findMany({
        where: {
            userId: currentUser?.id
        }
    })


    const inserateArray = await getInserate({
        title: title,
        category: category,
        filter: filter,
        start: Number(start),
        end: Number(end)
    });

    return (
        <div className="w-fit">

            {!title ? (
                <div className="h-full flex sm:block sm:mt-0 mt-4">
                    <div className="ml-4">
                        <AlignCenter />
                    </div>
                    <h3 className="ml-8 flex font-bold text-2xl h-full">
                        Relevante Inserate
                        <div className="ml-auto mr-4 sm:mr-8">
                            <OrderBy />
                        </div>
                    </h3>
                </div>
            ) : (
                <div className="h-full flex sm:block sm:mt-0 mt-4">
                    <div className="ml-4">
                        <Search />
                    </div>
                    <h3 className="ml-8  font-bold text-2xl h-full flex">
                        <p className="mr-2">( {inserateArray.length} )</p> Suchergebnisse
                    </h3>
                </div>
            )}

            {inserateArray.length < 1 ? (
                <div className="flex justify-center rounded-md height: 100%  mt-48 ">
                    <h3 className="ml-4 mr-4 font-bold mb-16  text-3xl text-gray-800/50 italic flex justify-center items-center">
                        Keine passenden Angebote gefunden :/
                    </h3>
                </div>
            ) : (
                <div className="flex flex-wrap justify-start sm:mr-8 sm:ml-8 overflow-y-auto h-full ">
                    {inserateArray.map((inserat, index) => (
                        <div className="w-full md:w-1/3 2xl:w-1/3 sm:ml-0  sm:mt-0 mt-4 sm:p-4 mb-4 sm:flex-grow   " key={inserat.id}>
                            <InseratCard
                                key={inserat.id}
                                inserat={inserat}
                                profileId={currentUser?.id}
                                isFaved={favedInserate.some((favedInserat) => favedInserat.inseratId === inserat.id)}
                                owned={purchases.some((purchase) => purchase.inseratId === inserat.id)}
                            />
                            {(index + 1) % 4 === 0 && <div className="w-full sm:w-1/12" />} {/* Add an empty div to create a new row after every 4 cards */}
                        </div>
                    ))}
                </div>

            )}



        </div>

    );
}

export default RelevanteInserateMobile;