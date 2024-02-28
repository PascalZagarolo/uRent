'use client';

import { Favourite, Images, Inserat, User } from "@prisma/client";
import InserateDashboardRender from "./favourite-render";
import { useState } from "react";
import FavouriteRender from "./favourite-render";

interface FavouriteRenderListProps {
    favourites : Favourite & { inserat : Inserat & { images : Images[], user: User}}[]
}

const FavouriteRenderList: React.FC<FavouriteRenderListProps> = ({
    favourites
}) => {

    //use RenderAmount to render only 5 Inserate, if pressed "Mehr Anzeigen" => increase amount by 5 and so on...
    const [renderAmount, setRenderAmount] = useState(5); 

    return ( 
        <div>
            {favourites.slice(0,renderAmount).map((favourite : Favourite & { inserat : Inserat & { images : Images[], user: User}}) => (
                favourites.length > 0 && (
                    <FavouriteRender
                    favourite = {favourite}
                    key={favourite.id}
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