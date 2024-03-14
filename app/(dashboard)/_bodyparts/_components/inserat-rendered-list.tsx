'use client'


import { Inserat, User } from "@prisma/client";
import InseratCard from "../../_components/inserat-card";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { InserateImagesAndAttributes } from "@/types/types";
import { useGetFilterAmount, useResultsPerPage } from "@/store";

interface InseratRenderedListProps {
    inserateArray: InserateImagesAndAttributes[];
    currentUser: User;
    favedInserate: Inserat[];


}


const InseratRenderedList: React.FC<InseratRenderedListProps> = ({
    inserateArray,
    currentUser,
    favedInserate,

}) => {

    const searchParams = useSearchParams();
    const currentPage = searchParams.get("page");

    useGetFilterAmount.setState({ amount: inserateArray.length })

    useEffect(() => {
        useGetFilterAmount.setState({ amount: inserateArray.length })
    }, [inserateArray])



    const [renderedList, setRenderedList] = useState(inserateArray);

    useMemo(() => {
        setRenderedList(inserateArray)
    }, [inserateArray])

    const itemsPerPage = useResultsPerPage((state) => state.results);

    const startIndex = (currentPage ? parseInt(currentPage) - 1 : 0) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;



    return (
        <div>{inserateArray.length > 0 ? (
            <div className="sm:grid  sm:grid-cols-1  overflow-y-auto justify-center  ">
                {renderedList.slice(startIndex, endIndex).map((inserat, index) => (
                    <div className="w-full sm:p-2 p-4 sm:w-1/2 md:w-1/4" key={inserat.id}>
                        <InseratCard
                            key={inserat.id}
                            inserat={inserat}
                            profileId={currentUser?.id || ""}
                            currentUser={currentUser}
                            isFaved={favedInserate.some((favedInserat) => favedInserat.id === inserat.id)}
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