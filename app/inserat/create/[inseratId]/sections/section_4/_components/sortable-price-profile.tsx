import { XIcon } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { priceprofile } from '@/db/schema';
import EditPriceProfilesCreation from './edit-price-profile';
import DeletePriceProfilesCreation from './delete-price-profiles';


type Props = {
    thisPriceProfile: typeof priceprofile.$inferSelect;
    setCurrentPriceProfiles: (value: typeof priceprofile.$inferSelect[]) => void;
    forceDragging?: boolean;
};

export function SortablePriceProfile({ thisPriceProfile, forceDragging = false, setCurrentPriceProfiles }: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: thisPriceProfile.position,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
        opacity: isDragging || forceDragging ? 0.5 : 1,
        cursor: isDragging || forceDragging ? 'grabbing' : 'grab',
    };

    return (
        <article className="flex flex-col w-full gap-2  mt-2" ref={setNodeRef} style={style}>
            <div className=" w-full rounded-md flex items-center gap-2 overflow-hidden bg-[#202020] shadow-lg">
                <div className="w-12 h-full flex items-center bg-[#171717] text-gray-200">
                    <p className="w-full text-center h-full">{Number(thisPriceProfile?.position ?? 0)}</p>
                </div>
                <div
                    ref={setActivatorNodeRef}
                    className="flex-grow p-2"
                    {...attributes}
                    {...listeners}
                >
                    <h2 className="text-base font-semibold text-gray-200 line-clamp-1 break-all w-1/2">{thisPriceProfile.title}</h2>
                    <p className="text-sm text-gray-200/60">{thisPriceProfile.price}€</p>
                </div>
                <div className='px-4 space-x-2 flex flex-row items-center'>
                    <div>
                    <EditPriceProfilesCreation thisProfile={thisPriceProfile} setCurrentPriceProfiles={setCurrentPriceProfiles} />
                    </div>
                    <div>
                    <DeletePriceProfilesCreation thisProfileId={thisPriceProfile?.id} setCurrentPriceProfiles={setCurrentPriceProfiles} />
                    </div>
                </div>
                
            </div>
        </article>
    );
}
