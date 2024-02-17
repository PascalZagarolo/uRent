'use client';

import { Images, Inserat } from "@prisma/client";

import { useEffect, useState } from "react";

import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult
} from "@hello-pangea/dnd"

import { cn } from "@/lib/utils"
import { Grid, Pencil, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";


interface ImageListProps {
    onEdit : (id : string) => void;
    onReorder : (updateData : { id : string, position : number }[]) => void;
    items : Images[];
    
}

const ImageList: React.FC<ImageListProps> = ({
    onEdit,
    onReorder,
    items,
    
}) => {

    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);
    const [isLoading, setIsLoading] = useState(false);

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

    const onDelete = (imageId : string) => {
        console.log(imageId); 
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
                                        `flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm
                                         dark:bg-[#202020] dark:text-gray-100 dark:border-none `,
                                        
                                    )}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    >
                                        <div
                                        className={cn("px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 dark:hover:bg-[#282828] w-full  dark: border-none rounded-l-md transition")}
                                        {...provided.dragHandleProps}
                                        >
                                            {image.url}
                                        </div>
                                        
                                        
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