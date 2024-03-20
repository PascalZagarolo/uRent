'use client';


import InserateDashboardRender from "./favourite-render";
import { useState } from "react";
import FavouriteRender from "./favourite-render";
import { favourite } from "@/db/schema";

interface FavouriteRenderListProps {
    favourites : typeof favourite.$inferSelect[]
}

const FavouriteRenderList: React.FC<FavouriteRenderListProps> = ({
    favourites
}) => {

    //use RenderAmount to render only 5 Inserate, if pressed "Mehr Anzeigen" => increase amount by 5 and so on...
    const [renderAmount, setRenderAmount] = useState(5); 

    return ( 
        <div>
            {favourites.slice(0,renderAmount).map((favourite) => (
                favourites.length > 0 && (
                    <FavouriteRender
                    thisFavourite = {favourite}
                    key={favourite.inseratId}
                    />
            )
        ))}
        {favourites.length > 5 && (
            <p className="mt-2 text-xs  underline hover:cursor-pointer" onClick={() => {setRenderAmount(renderAmount + 5)}}>
                Mehr anzeigen...
            </p>
        )}
        </div>
     );
}
 
export default FavouriteRenderList;