'use client'


import InseratCard from "../../_components/inserat-card";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useGetFilterAmount, useResultsPerPage } from "@/store";
import {  inserat, 
    userTable } from "@/db/schema";


interface InseratRenderedListProps {
    inserateArray: typeof inserat.$inferSelect[];
    currentUser: typeof userTable.$inferSelect;
    

}


const InseratRenderedList: React.FC<InseratRenderedListProps> = ({
    inserateArray,
    currentUser,
    

}) => {

    const searchParams = useSearchParams();
    const currentPage = searchParams.get("page");
   
    
    
    useGetFilterAmount.setState({ amount: inserateArray.length })

    useMemo(() => {
        useGetFilterAmount.setState({ amount: inserateArray.length })
    }, [inserateArray])



    

    const itemsPerPage = useResultsPerPage((state) => state.results);

    const startIndex = (currentPage ? parseInt(currentPage) - 1 : 0) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;



    return (
        <div>{inserateArray?.length > 0 ? (
            <div className="sm:grid  sm:grid-cols-1  overflow-y-auto justify-center  ">
                {inserateArray.slice(startIndex, endIndex).map((inserat, index) => (
                    <div className="w-full  md:w-1/4" key={inserat.id}>
                        <InseratCard
                            key={inserat.id}
                            thisInserat={inserat}
                            profileId={currentUser?.id || ""}
                            currentUser={currentUser}
                            
                        />
                    </div>
                ))}
            </div>
        ) : (
            <div className="flex justify-center rounded-md  mt-48 ">
                <h3 className=" font-semibold mb-16 sm:w-[760px] text-xl text-gray-800/50  flex justify-center items-center dark:text-gray-100">
                    Noch keine passenden Angebote vorhanden...
                </h3>
            </div>
        )}

        </div>
    );
}

export default InseratRenderedList;