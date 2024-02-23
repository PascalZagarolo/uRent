import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import { AlignCenter, Search, SearchCode, TrendingUp, } from "lucide-react";

import { getInserate } from "@/actions/getInserate";
import type { Category, Images, Inserat, PkwAttribute, User } from "@prisma/client";
import OrderBy from "../_components/_smart-filter/order-by";


import InseratRenderedList from "./_components/inserat-rendered-list";

interface RelevanteInserateProps {
    title: string;
    category: Category;
    filter: string;
    start: string;
    end: string;
    page : number;
    periodBegin : string;
    periodEnd : string;
}

const RelevanteInserate: React.FC<RelevanteInserateProps> = async ({
    title,
    category,
    filter,
    start,
    end,
    page,
    periodBegin,
    periodEnd
}) => {

    const currentUser = await getCurrentUser()


    



    

    const favedInserate = await db.favourite.findMany({
        where: {
            userId: currentUser?.id || ""
        }
    })


    
    const inserate = await getInserate({
        title: title,
        category: category,
        filter: filter,
        start: Number(start),
        end: Number(end),
        page : Number(page),
        periodBegin : periodBegin,
        periodEnd : periodEnd,
       
    });

    
   

    return (
        <div className="">

{!title ? (
                <div className="h-full flex sm:block sm:mt-0 items-center border-2 border-gray-300 dark:border-gray-900 p-3 text-gray-100 bg-[#141620]">
                <div className="ml-4 flex w-full items-center">
                    <div className="p-2 border-2 border-white rounded-lg">
                    <AlignCenter />
                    </div>

                    <h3 className="ml-8 flex font-bold text-2xl h-full w-full">
                        Relevante Inserate
                        
                        <div className="flex ml-auto mr-4 sm:mr-8 text-black">
                        <OrderBy />
                            
                            
                        </div>
                    </h3>
                </div>

            </div>
            ) : (
                <div className="h-full flex sm:block sm:mt-0 items-center  p-4 text-gray-100 bg-[#141620]">
                    <div className="ml-4 flex w-full items-center">
                        <div className="p-2 border-2  rounded-lg">
                        <SearchCode />
                        </div>
                        <h3 className="ml-8 flex font-bold text-2xl h-full w-full">
                            ({inserate.length}) Suchergebnisse
                            <div className="flex ml-auto mr-4 sm:mr-8 text-black">
                                <OrderBy />
                            </div>
                        </h3>
                    </div>

                </div>
            )}

           
                
          
                
             <div className="flex justify-center  ">
                
             <InseratRenderedList 
                inserateArray={inserate}
                currentUser={currentUser}
                //@ts-ignore
                favedInserate={favedInserate}
                //@ts-ignore
                
                />
             </div>
                


         



        </div>

    );
}

export default RelevanteInserate;