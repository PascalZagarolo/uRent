'use client';

import { set } from "date-fns";
import { useEffect, useState } from "react";

interface ImageListProps {
    onEdit : (id : string) => void;
    onReorder : (updateData : { id : string, position : number }[]) => void;
    items : string[];
}

const ImageList: React.FC<ImageListProps> = ({
    onEdit,
    onReorder,
    items
}) => {

    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    },[])

    useEffect(() => {

    })

    if(!isMounted) {
        return null;
    }

    return ( 
        <div>

        </div>
     );
}
 
export default ImageList;