'use client';



import { useEffect, useState } from "react";

import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult
} from "@hello-pangea/dnd"

import { cn } from "@/lib/utils"

import { useRouter } from "next/navigation";
import { images } from "@/db/schema";


interface ImageListProps {
    onEdit : (id : string) => void;
    onReorder : (updateData : { id : string, position : number }[]) => void;
    items : typeof images.$inferSelect[];
    
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

    const router = useRouter();

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
        setTimeout(() => {
            router.refresh();
        }, 250)
    }

    

    if(!isMounted) {
        return null;
    }

    const onDelete = (imageId : string) => {
        console.log(imageId); 
    }

    return ( 
        <DragDropContext onDragEnd={onDragEnd} >
            <Droppable droppableId="image">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2 ">
                        {chapters.map((image,index) => (
                            <Draggable key={image.id} draggableId={image.id} index={index}>
                                {(provided) => (
                                    <div
                                    className={cn(
                                        `flex items-center  bg-slate-200 border-slate-200 w-full h-[200px] text-slate-700 rounded-md p-2 text-sm
                                        dark:bg-[#202020] dark:text-gray-100   `,
                                        
                                    )}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    >
                                        <div
                                        className={cn(` border-r border-r-slate-200 hover:bg-slate-300 
                                        dark:hover:bg-[#282828] dark: border-none rounded-l-md `)}
                                        {...provided.dragHandleProps}
                                        >
                                            <div className="flex ">
                                            <img 
                                            src={image.url}
                                            className=" object-cover h-[160px]"
                                            />
                                            
                                            </div>
                                            
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