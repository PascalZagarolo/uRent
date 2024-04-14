'use client';

import InserateDashboardRender from "./inserate-dashboard-render";
import { useState } from "react";
import { inserat } from "@/db/schema";

interface InserateRenderListProps {
    inserateArray: typeof inserat.$inferSelect;
    
}

const InserateRenderList: React.FC<InserateRenderListProps> = ({
    inserateArray,
    
}) => {

    //use RenderAmount to render only 5 Inserate, if pressed "Mehr Anzeigen" => increase amount by 5 and so on...
    const [renderAmount, setRenderAmount] = useState(5);


    return (
        <div>
            {inserateArray.slice(0, renderAmount).map((inserat : any) => (
                inserateArray.length > 0 && (
                    
                        <InserateDashboardRender
                            thisInserat={inserat}
                            
                            key={inserat.id}
                        />
                    


                )
            ))}
            {inserateArray.length > 5 && (
                <p className="mt-2 text-xs  underline hover:cursor-pointer" onClick={() => { setRenderAmount(renderAmount + 5) }}>
                    Mehr anzeigen...
                </p>
            )}
        </div>
    );
}

export default InserateRenderList;