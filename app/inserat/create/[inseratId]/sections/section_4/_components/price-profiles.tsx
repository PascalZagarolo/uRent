import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

import {
    closestCenter,
    DragOverlay,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DndContext,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { priceprofile } from '@/db/schema';

import { ClipLoader } from 'react-spinners';
import { MdDragIndicator } from 'react-icons/md';
import AddPriceProfile from './add-price-profile';
import { SortableRow } from '../../../_parts/price-profiles/rendered-price-profile';
import AddPriceProfileCreation from './add-price-profile';
import { SortablePriceProfile } from './sortable-price-profile';

const DndContextWithNoSSR = dynamic(() => import('@dnd-kit/core').then(mod => mod.DndContext), {
    ssr: false,
});

interface PriceProfilesProps {
    thisInserat: any;
    currentPriceProfiles : typeof priceprofile.$inferSelect[];
    setCurrentPriceProfiles : (value : typeof priceprofile.$inferSelect[]) => void;
}

const PriceProfiles: React.FC<PriceProfilesProps> = ({ thisInserat, currentPriceProfiles, setCurrentPriceProfiles }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    

    
    const [activeItem, setActiveItem] = useState<typeof priceprofile.$inferSelect | null>(null);

    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

    const handleDragStart = (event) => {
        const { active } = event;
        const activeProfile = currentPriceProfiles.find(item => item.position === active.id);
        setActiveItem(activeProfile || null);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeIndex = currentPriceProfiles.findIndex(item => item.position === active.id);
        const overIndex = currentPriceProfiles.findIndex(item => item.position === over.id);

        if (activeIndex !== overIndex) {
            const updatedProfiles = arrayMove(currentPriceProfiles, activeIndex, overIndex).map(
                (item, index) => ({ ...item, position: index + 1 })
            );

            setCurrentPriceProfiles(updatedProfiles);
            setActiveItem(null);


        }
    };

    //returns true if the lists are the same
    const sameLists = (listA, listB) => {
        if (listA.length !== listB.length) return false;

        // Sort both lists in a consistent way, e.g., by a specific property like "position"


        // Compare each object as a JSON string
        return listA.every((item, index) => JSON.stringify(item) === JSON.stringify(listB[index]));
    };

   

    const handleDragCancel = () => setActiveItem(null);

    return (
        <div>
            <div>
                <AddPriceProfileCreation 
                thisInserat={thisInserat}
                setPriceProfiles={setCurrentPriceProfiles}
                currentPriceProfiles={currentPriceProfiles}
                />
            </div>
            <div className='text-lg font-semibold flex flex-row items-center mb-4'>
                <span>
                    Erstellte Preisprofile
                </span>

                
            </div>
            {currentPriceProfiles?.length > 0 ? (
                <>
                    <p className="text-xs text-gray-200/60 flex flex-row items-center">
                        <MdDragIndicator className='w-4 h-4 mr-2' /> Halte und ziehe Preisprofile um sie neu anzuordnen
                    </p>
                    <div className="flex flex-col gap-2 w-full mx-auto">

                        <DndContextWithNoSSR
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDragCancel={handleDragCancel}
                        >
                            <SortableContext
                                items={currentPriceProfiles.map(item => item.position)}
                                strategy={verticalListSortingStrategy}
                            >
                                {currentPriceProfiles.map(item => (
                                    <SortablePriceProfile key={item.id} thisPriceProfile={item} setCurrentPriceProfiles={setCurrentPriceProfiles} />
                                ))}
                            </SortableContext>

                            <DragOverlay adjustScale style={{ transformOrigin: '0 0' }}>
                                {activeItem && <SortablePriceProfile thisPriceProfile={activeItem} forceDragging setCurrentPriceProfiles={setCurrentPriceProfiles} />}
                            </DragOverlay>
                        </DndContextWithNoSSR>

                    </div>
                </>
            ) : (
                <div className=''>
                    <p className='text-sm text-gray-200/60'>Noch keine Preisprofile erstellt...</p>
                </div>
            )}
        </div>
    );
};

export default PriceProfiles;
