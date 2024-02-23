'use client'


import { Images, Inserat, PkwAttribute, User } from "@prisma/client";
import InseratCard from "../../_components/inserat-card";
import { use, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { InserateImagesAndAttributes } from "@/types/types";
import { useGetFilterAmount } from "@/store";

interface InseratRenderedListProps {
    inserateArray: InserateImagesAndAttributes[];
    currentUser : User;
    favedInserate: Inserat[];
    
}


const InseratRenderedList: React.FC<InseratRenderedListProps> = ({
    inserateArray,
    currentUser,
    favedInserate,
    
}) => {

    
   
        useGetFilterAmount.setState({amount: inserateArray.length})

        useEffect(() => {
            useGetFilterAmount.setState({amount: inserateArray.length})
        },[inserateArray])
    


    //!!!set searchresult amounts as zustand state


    return ( 
        <div>{inserateArray.length > 0 ? (
            <div className="grid  sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 overflow-y-auto  justify-center">
                    {inserateArray.map((inserat, index) => (
                        <div className="w-full sm:w-1/2 md:w-1/4 p-4" key={inserat.id}>
                            
                        <InseratCard
                            key={inserat.id}
                            //@ts-ignore
                            inserat={inserat}
                            profileId={currentUser?.id || ""}
                            isFaved={favedInserate.some((favedInserat) => favedInserat.id === inserat.id)}
                            
                        />
                        
                    </div>
                    ))}
                </div>
        ) : (
            <div className="flex justify-center rounded-md height: 100%  mt-48 ">
                    <h3 className="ml-4 mr-4 font-bold mb-16  text-3xl text-gray-800/50 italic flex justify-center items-center dark:text-gray-100/80">
                        Keine passenden Angebote gefunden :/
                    </h3>
                </div>
        )}
            
        </div>
     );
}
 
export default InseratRenderedList;