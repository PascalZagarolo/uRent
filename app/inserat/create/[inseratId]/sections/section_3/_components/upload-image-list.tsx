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
    onEdit: (id: string) => void;
    onReorder: (updateData: { id: string, position: number }[]) => void;
    items: { id: string, url: string, position: number }[];
}

const ImageListCreation: React.FC<ImageListCreationProps> = ({
    onEdit,
    onReorder,
    items,
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setChapters(items);
    }, [items]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const updatedChapters = Array.from(chapters);
        const [movedItem] = updatedChapters.splice(result.source.index, 1);
        updatedChapters.splice(result.destination.index, 0, movedItem);

        // Update positions
        const bulkUpdatedData = updatedChapters.map((item, index) => ({
            id: item.id,
            position: index,
            url: item.url,
        }));

        setChapters(updatedChapters);
        onReorder(bulkUpdatedData);
    };

    if (!isMounted) {
        return null;
    }

    const onDelete = (imageId: string) => {
        console.log(imageId);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="image">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 w-full">
                        {chapters.map((image, index) => (
                            <Draggable key={image.id} draggableId={image.id} index={index}>
                                {(provided) => (
                                    <div
                                        className={cn(
                                            `flex items-center bg-slate-200 border-slate-200  
                                            h-[200px] text-slate-700 rounded-md p-2 text-sm
                                            dark:bg-[#202020] dark:text-gray-100`
                                        )}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <div
                                            className={cn(`w-full p-2 border-r border-r-slate-200 hover:bg-slate-300 
                                            dark:hover:bg-[#282828] dark:border-none rounded-l-md`)}
                                            {...provided.dragHandleProps}
                                        >
                                            <div className="flex">
                                                <img
                                                    src={image.url}
                                                    className="object-cover h-[160px]"
                                                    alt={`Image ${image.position}`} // Added alt attribute for accessibility
                                                />
                                            </div>
                                            {image?.url}
                                            {image?.position}
                                            {image?.id}
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
