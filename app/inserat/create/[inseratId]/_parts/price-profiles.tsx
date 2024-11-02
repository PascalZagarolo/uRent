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
import { SortableRow } from './price-profiles/rendered-price-profile';
import { priceprofile } from '@/db/schema';
import AddPriceProfile from './price-profiles/add-price-profile';
import { ClipLoader } from 'react-spinners';
import { MdDragIndicator } from 'react-icons/md';

const DndContextWithNoSSR = dynamic(() => import('@dnd-kit/core').then(mod => mod.DndContext), {
    ssr: false,
});

interface PriceProfilesProps {
    thisInserat: any;
}

const PriceProfiles: React.FC<PriceProfilesProps> = ({ thisInserat }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const usedList = thisInserat?.priceprofiles?.sort((a, b) => a.position - b.position) || [];

    const [priceProfiles, setPriceProfiles] = useState<typeof priceprofile.$inferSelect[]>(usedList);
    const [activeItem, setActiveItem] = useState<typeof priceprofile.$inferSelect | null>(null);

    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

    const handleDragStart = (event) => {
        const { active } = event;
        const activeProfile = priceProfiles.find(item => item.position === active.id);
        setActiveItem(activeProfile || null);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeIndex = priceProfiles.findIndex(item => item.position === active.id);
        const overIndex = priceProfiles.findIndex(item => item.position === over.id);

        if (activeIndex !== overIndex) {
            const updatedProfiles = arrayMove(priceProfiles, activeIndex, overIndex).map(
                (item, index) => ({ ...item, position: index + 1 })
            );

            setPriceProfiles(updatedProfiles);
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

    const onSave = async () => {
        try {
            setIsLoading(true);
            const values = {
                newProfiles: priceProfiles,
            }
            await axios.patch(`/api/priceprofile/reorder/${thisInserat?.id}`, values);
            router.refresh();
            toast.success('Preisprofile neu angeordnet');
        } catch (error) {
            toast.error('Fehler beim Verschieben des Preisprofils');
        } finally {
            setIsLoading(false);
        }
    }

    const handleDragCancel = () => setActiveItem(null);

    return (
        <div>
            <div>
                <AddPriceProfile thisInserat={thisInserat} />
            </div>
            <div className='text-lg font-semibold flex flex-row items-center mb-4'>
                <span>
                    Erstellte Preisprofile
                </span>
                
                <div className='ml-auto'>
                    <Button className='bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300' size='sm'
                        disabled={sameLists(usedList, priceProfiles)}
                        onClick={onSave}
                    >
                        {isLoading ? (
                            <ClipLoader color='#ffffff' size={20} loading={true} />
                        ) : (
                            "Anordnung speichern"
                        )}
                    </Button>
                </div>
            </div>
            <p className="text-xs text-gray-200/60 flex flex-row items-center">
                   <MdDragIndicator className='w-4 h-4 mr-2' /> Halte und ziehe Preisprofile um sie neu anzuordnen
                </p>
            <div className="flex flex-col gap-2 w-full mx-auto">
                {priceProfiles?.length > 0 && (
                    <DndContextWithNoSSR
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragCancel={handleDragCancel}
                    >
                        <SortableContext
                            items={priceProfiles.map(item => item.position)}
                            strategy={verticalListSortingStrategy}
                        >
                            {priceProfiles.map(item => (
                                <SortableRow key={item.id} thisPriceProfile={item} />
                            ))}
                        </SortableContext>

                        <DragOverlay adjustScale style={{ transformOrigin: '0 0' }}>
                            {activeItem && <SortableRow thisPriceProfile={activeItem} forceDragging />}
                        </DragOverlay>
                    </DndContextWithNoSSR>
                )}
            </div>
        </div>
    );
};

export default PriceProfiles;
