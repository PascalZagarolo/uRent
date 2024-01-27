import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import { AlignCenter, Search, SearchCode, TrendingUp, } from "lucide-react";
import InseratCard from "../_components/inserat-card";
import { Images, Inserat, User } from "@prisma/client";
import { getInserate } from "@/actions/getInserate";
import type { Category } from "@prisma/client";
import OrderBy from "../_components/_smart-filter/order-by";
import { getSession } from "next-auth/react";
import PaginationComponent from "@/components/pagination-component";

interface RelevanteInserateProps {
    title: string;
    category: Category;
    filter: string;
    start: string;
    end: string;
    page : number;
}

const RelevanteInserate: React.FC<RelevanteInserateProps> = async ({
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
            userId: currentUser?.id || ""
        }
    })

    const favedInserate = await db.favourite.findMany({
        where: {
            userId: currentUser?.id || ""
        }
    })


    const inserateArray = await getInserate({
        title: title,
        category: category,
        filter: filter,
        start: Number(start),
        end: Number(end),
        page : Number(page)
    });

    return (
        <div className="w-full">

            {!title ? (
                <div className="h-full flex sm:block sm:mt-0 items-center border-2 border-gray-300 p-3 text-gray-100 bg-[#181b27]">
                    <div className="ml-4 flex w-full items-center">
                        <div className="p-2 border-2 border-white rounded-lg">
                        <AlignCenter />
                        </div>
                        <h3 className="ml-8 flex font-bold text-2xl h-full w-full">
                            Relevante Inserate
                            
                            <div className="flex ml-auto mr-4 sm:mr-8 text-black">
                                <OrderBy />
                                <div className="ml-8">
                                <PaginationComponent
                                amount={inserateArray.length}
                                />
                            </div>
                            </div>
                        </h3>
                    </div>

                </div>
            ) : (
                <div className="h-full flex sm:block sm:mt-0 items-center border-2 border-gray-300 p-4 text-gray-100 bg-[#181b27]">
                    <div className="ml-4 flex w-full items-center">
                        <div className="p-2 border-2 border-white rounded-lg">
                        <SearchCode />
                        </div>
                        <h3 className="ml-8 flex font-bold text-2xl h-full w-full">
                            ({inserateArray.length}) Suchergebnisse
                            <div className="flex ml-auto mr-4 sm:mr-8 text-black">
                                <OrderBy />
                            </div>
                        </h3>
                    </div>

                </div>
            )}

            {inserateArray.length < 1 ? (
                <div className="flex justify-center rounded-md height: 100%  mt-48 ">
                    <h3 className="ml-4 mr-4 font-bold mb-16  text-3xl text-gray-800/50 italic flex justify-center items-center">
                        Keine passenden Angebote gefunden :/
                    </h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 overflow-y-auto">
                    {inserateArray.map((inserat, index) => (
                        <div className="w-full sm:w-1/2 md:w-1/4 p-4" key={inserat.id}>
                            <InseratCard
                                key={inserat.id}
                                inserat={inserat}
                                profileId={currentUser?.id || ""}
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