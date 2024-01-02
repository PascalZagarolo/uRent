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
import { Grid, Pencil } from "lucide-react";


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

    const onDragEnd = (result : DropResult) => {
        if(!result.destination) {
            return
        }

        const items = Array.from(chapters);
        const [reorderedItems] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItems);

        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updatedChapters = items.slice(startIndex, endIndex + 1);
        
        setChapters(items)

        const bulkUpdatedData = updatedChapters.map((chapter) => ({
            id: chapter.id,
            position: items.findIndex((item) => item.id === chapter.id)
        }));

        onReorder(bulkUpdatedData);
    }

    if(!isMounted) {
        return null;
    }

    return ( 
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="image">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((image,index) => (
                            <Draggable key={image.id} draggableId={image.id} index={index}>
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
                                            {image.url}
                                        </div>
                                        
                                        <Pencil
                                        className="h-4 w-4 hover:opacity-75"
                                        onClick={() => onEdit(image.id)}
                                        
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        </DragDropContext>
     );
}
 
export default ImageList;