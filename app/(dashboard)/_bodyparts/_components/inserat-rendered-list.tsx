import { InserateAndImages } from "@/types/types";
import { Inserat, User } from "@prisma/client";
import InseratCard from "../../_components/inserat-card";
import { useMemo } from "react";

interface InseratRenderedListProps {
    inserateArray: InserateAndImages[];
    currentUser : User;
    favedInserate: Inserat[];
    purchases : Inserat[];
}


const InseratRenderedList: React.FC<InseratRenderedListProps> = ({
    inserateArray,
    currentUser,
    favedInserate,
    purchases
}) => {



    return ( 
        <div className="grid  sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 overflow-y-auto  justify-center">
                    {inserateArray.map((inserat, index) => (
                        <div className="w-full sm:w-1/2 md:w-1/4 p-4" key={inserat.id}>
                        <InseratCard
                            key={inserat.id}
                            //@ts-ignore
                            inserat={inserat}
                            profileId={currentUser?.id || ""}
                            isFaved={favedInserate.some((favedInserat) => favedInserat.id === inserat.id)}
                            owned={purchases.some((purchase) => purchase.id === inserat.id)}
                        />
                    </div>
                    ))}
                </div>
     );
}
 
export default InseratRenderedList;