'use client';

import { Image } from "@prisma/client";

import { useEffect, useState } from "react";

import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult
} from "@hello-pangea/dnd"

import { cn } from "@/lib/utils"
import { Grid } from "lucide-react";

interface ImageListProps {
    onEdit : (id : string) => void;
    onReorder : (updateData : { id : string, position : number }[]) => void;
    items : Image[];
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
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="image">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter,index) => (
                            <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                                {(provided) => (
                                    <div
                                    className={cn(
                                        "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                                        
                                    )}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    >
                                        <div
                                        className={cn("px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition")}
                                        {...provided.dragHandleProps}
                                        >
                                            <Grid/>
                                        </div>
                                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                                            Gratis!!
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>

        </DragDropContext>
     );
}
 
export default ImageList;