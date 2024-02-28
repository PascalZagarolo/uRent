'use client';

import { Images, Inserat, User } from "@prisma/client";
import InserateDashboardRender from "./inserate-dashboard-render";
import { useState } from "react";

interface InserateRenderListProps {
    inserateArray : Inserat & { images : Images[], user : User}[]
}

const InserateRenderList: React.FC<InserateRenderListProps> = ({
    inserateArray
}) => {

    //use RenderAmount to render only 5 Inserate, if pressed "Mehr Anzeigen" => increase amount by 5 and so on...
    const [renderAmount, setRenderAmount] = useState(5); 

    return ( 
        <div>
            {inserateArray.slice(0,renderAmount).map((inserat : Inserat & { images : Images[], user : User}) => (
                inserateArray.length > 0 && (
                <InserateDashboardRender 
                inserat = {inserat}
                key={inserat.id}
                />
            )
        ))}
        {inserateArray.length > 4 && (
            <p className="mt-2 text-xs  underline hover:cursor-pointer" onClick={() => {setRenderAmount(renderAmount + 5)}}>
                Mehr anzeigen...
            </p>
        )}
        </div>
     );
}
 
export default InserateRenderList;