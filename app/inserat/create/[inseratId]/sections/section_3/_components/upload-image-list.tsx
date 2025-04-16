'use client';

import { useEffect, useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";

interface ImageListCreationProps {
   
    onReorder: (updateData: { id: string, position: number }[]) => void;
    items: { id: string, url: string, position: number }[];
}

const ImageListCreation: React.FC<ImageListCreationProps> = ({
   
    onReorder,
    items,
}) => {
    
    

    

    
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
    
        // Clone the items array
        const updatedItems = Array.from(items);
    
        // Remove and re-insert the moved item
        const [movedItem] = updatedItems.splice(result.source.index, 1);
        updatedItems.splice(result.destination.index, 0, movedItem);
    
        // Preserve all properties, including wholeFile, and update positions
        const bulkUpdatedData = updatedItems.map((item, index) => ({
            ...item, // spread to keep id, url, position, wholeFile, etc.
            position: index,
        }));
    
        // Send back the updated array
        onReorder(bulkUpdatedData);
    };
    

    

    

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="image">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 w-full">
                        {items.map((image, index) => (
                            <Draggable key={image.id} draggableId={image.id} index={index}>
                                {(provided) => (
                                    <div
                                        className={cn(
                                            `flex items-center y
                                            h-[200px] text-slate-700 bg-[#191919] shadow-lg rounded-md p-2 text-sm
                                             dark:text-gray-100`
                                        )}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <div
                                            className={cn(`w-full p-2 border-r border-r-slate-200 hover:bg-slate-300 
                                            dark:hover:bg-[#282828] bg-[#191919] dark:border-none rounded-l-md`)}
                                            {...provided.dragHandleProps}
                                        >
                                            <div className="flex">
                                                <img
                                                    src={image.url}
                                                    className="object-cover h-[160px]"
                                                    alt={`Image ${image.position}`} // Added alt attribute for accessibility
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
};

export default ImageListCreation;
