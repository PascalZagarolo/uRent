import Image from 'next/image'; // Make sure to import Image if using Next.js
import { inserat, userTable } from '@/db/schema';
import { BookmarkIcon, CarFrontIcon, MapIcon, MapPinIcon, SaveIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface ContentSwitchProps {
    releasedContent: typeof inserat.$inferSelect[];
    username : string;
    currentUser : typeof userTable.$inferSelect;
}

const Content = ({ releasedContent, username, currentUser }: ContentSwitchProps) => {
    // Filter the content that is published
    const filteredContent = releasedContent.filter(content => content.isPublished === true);

    const [favedInserate, setFavedInserate] = useState<string[]>(currentUser?.favourites.map((favourite) => favourite.inseratId));

    const [displayedLength, setDisplayedLength] = useState(6);

    const router = useRouter();

    const handleFavClick = async (event, inseratId : string) => {
        try {
            event.preventDefault(); 
            event.stopPropagation(); 
            if(!currentUser) {
                router.push('/login');
            } else {
                if(favedInserate?.some(fav => fav == inseratId)) {
                    await axios.patch(`/api/profile/${currentUser?.id}/favourites`, { inseratId })
                    setFavedInserate(favedInserate.filter(fav => fav !== inseratId));
                    toast.success('Inserat wurde aus den Favoriten entfernt');
                } else {
                    await axios.patch(`/api/profile/${currentUser?.id}/favourites`, { inseratId });
                    setFavedInserate([...favedInserate, inseratId]);
                    toast.success('Inserat wurde zu deinen Favouriten hinzugefügt');
                }
            }
        } catch (e : any) {
            console.log(e);
            toast.error('Fehler beim Hinzufügen des Favoriten');
        }
    };

    // Render a single Inserat card
    const RenderedInseratCard = ({ inserat }) => {
        const renderedImage = inserat.images.sort((a, b) => a?.position - b?.position)[0];
    
        return (
            <a className="flex flex-col rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-indigo-900/20 hover:cursor-pointer bg-[#1a1a25] border border-indigo-900/20"
            href={`/inserat/${inserat.id}`}
            target='_blank'
            rel='noreferrer'
            >
                {/* Image section */}
                <div className="w-full rounded-t-lg overflow-hidden">
                    <Image 
                        src={renderedImage.url}
                        alt={inserat.title}
                        width={500}
                        height={300}
                        className="object-cover w-full h-60 transition-all duration-300 ease-in-out hover:opacity-90"
                    />
                </div>
    
                {/* Content section */}
                <div className="bg-[#1a1a25] rounded-b-lg p-4">
                    <div className="flex justify-between items-center">
                        <div className="line-clamp-1 text-gray-200 font-semibold sm:text-xl text-lg">
                            {inserat.title}
                        </div>
                        <Button variant="ghost" size="sm" onClick={(e) => handleFavClick(e, inserat?.id)} 
                            className="hover:bg-indigo-900/20">
                            <BookmarkIcon className={cn("w-4 h-4 transition-colors duration-300", 
                            favedInserate?.some(fav => fav == inserat?.id) ? 'text-indigo-400' : 'text-gray-300'
                            )} />
                        </Button>
                    </div>
    
                    <div className="flex sm:text-base text-sm items-center text-gray-300 mt-2">
                        <MapPinIcon className="text-indigo-400 w-4 h-4 mr-2" />
                        <span className="font-semibold text-gray-200">
                            {inserat?.address?.postalCode}
                        </span>
                        <span className="mx-2 text-gray-200/40">|</span>
                        <span className="text-gray-200/80">{inserat?.address?.locationString}</span>
                    </div>
    
                    <div className="mt-2 sm:text-xl text-base font-bold text-gray-200 flex items-center space-x-1">
                        <span>{inserat?.price}</span>
                        <span className='font-medium text-gray-200/80 text-base'>€</span>
                        <span className="text-sm mb-1 text-gray-200/60 font-medium">/Tag</span>
                    </div>
                </div>
            </a>
        );
    };

    return (
        <div>
            <div className='text-lg space-x-2 flex flex-row items-center w-full text-gray-200'>
                <div className='whitespace-nowrap'> Mehr von </div> 
                <span className='font-semibold line-clamp-1 break-all text-indigo-400'>{username}</span> 
                <div className="text-gray-200/60">({filteredContent?.length})</div>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-8 pb-16 sm:px-4 mt-4">
                {filteredContent.map(content => (
                    <RenderedInseratCard key={content.id} inserat={content} />
                ))}
            </div>
        </div>
    );
}

export default Content;
