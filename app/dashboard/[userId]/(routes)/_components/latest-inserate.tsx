import { inserat } from "@/db/schema";
import { format } from "date-fns";
import { Clock, Eye, Link2, Tag, Truck } from "lucide-react";
import { useState } from "react";

interface LatestInserateProps {
    foundInserate: typeof inserat.$inferSelect[] | any[];
}

const LatestInserate = ({ foundInserate }: LatestInserateProps) => {
    const [latestInserate, setLatestInserate] = useState(
        foundInserate?.sort((a, b) => {
            return new Date(b.firstRelease).getTime() - new Date(a.firstRelease).getTime();
        }).slice(0, 3)
    );

    // Helper function to get the category icon and label
    const getCategoryInfo = (category: string) => {
        const categories = {
            "PKW": { label: "PKW", icon: <Truck className="h-3.5 w-3.5" /> },
            "LKW": { label: "LKW", icon: <Truck className="h-3.5 w-3.5" /> },
            "TRANSPORT": { label: "Transporter", icon: <Truck className="h-3.5 w-3.5" /> },
            "TRAILER": { label: "Anhänger", icon: <Truck className="h-3.5 w-3.5" /> }
        };
        
        return categories[category] || { label: "Fahrzeug", icon: <Truck className="h-3.5 w-3.5" /> };
    };

    const renderLatest = (thisInserat: typeof inserat.$inferSelect) => {
        const categoryInfo = getCategoryInfo(thisInserat?.category);
        const date = format(
            new Date(thisInserat?.firstRelease ? thisInserat?.firstRelease : thisInserat?.createdAt), 
            "dd.MM.yyyy"
        );
        
        return (
            <a 
                key={thisInserat.id}
                href={`/inserat/${thisInserat?.id}`}
                target="_blank" 
                rel="noreferrer"
                className="block transition-all hover:translate-x-1 group"
            >
                <div className="dark:bg-[#1a1a1a] bg-gray-50 rounded-md overflow-hidden border-l-4 border-indigo-500 dark:border-indigo-600 shadow-sm hover:shadow-md transition-all duration-200 mb-3">
                    <div className="p-3">
                        <div className="flex justify-between items-start mb-1.5">
                            <div className="flex items-center text-sm text-muted-foreground dark:text-gray-400">
                                <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                {date}
                            </div>
                            
                            {thisInserat?.views > 0 && (
                                <div className="flex items-center text-xs text-muted-foreground dark:text-gray-500">
                                    <Eye className="h-3 w-3 mr-1 text-indigo-400" />
                                    {thisInserat.views}
                                </div>
                            )}
                        </div>
                        
                        <h3 className="font-medium text-sm dark:text-white text-gray-900 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-1 mb-1.5">
                            {thisInserat?.title}
                        </h3>
                        
                        <div className="flex items-center mt-2">
                            <div className="flex items-center bg-gray-100 dark:bg-[#272727] text-xs px-2 py-0.5 rounded-full">
                                {categoryInfo.icon}
                                <span className="ml-1 text-gray-700 dark:text-gray-300">
                                    {categoryInfo.label}
                                </span>
                            </div>
                            
                            {thisInserat?.isPublished ? (
                                <div className="ml-2 flex items-center bg-green-100 dark:bg-green-900/20 text-xs px-2 py-0.5 rounded-full">
                                    <span className="text-green-700 dark:text-green-400">Veröffentlicht</span>
                                </div>
                            ) : (
                                <div className="ml-2 flex items-center bg-amber-100 dark:bg-amber-900/20 text-xs px-2 py-0.5 rounded-full">
                                    <span className="text-amber-700 dark:text-amber-400">Entwurf</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </a>
        );
    };

    return (
        <div className="flex flex-col">
            {latestInserate?.length > 0 ? (
                <div className="space-y-1">
                    {latestInserate?.map((inserat) => renderLatest(inserat))}
                    
                    {foundInserate?.length > 3 && (
                        <a 
                            href="/dashboard?tab=inserate" 
                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-2 flex items-center"
                        >
                            <Link2 className="h-3 w-3 mr-1" />
                            Alle Inserate anzeigen
                        </a>
                    )}
                </div>
            ) : (
                <div className="text-sm text-muted-foreground dark:text-gray-400 py-4 flex flex-col items-center justify-center">
                    <Truck className="h-6 w-6 mb-2 text-gray-400" />
                    <p>Noch keine Inserate vorhanden</p>
                    <a href="/dashboard?tab=inserate" className="text-indigo-600 dark:text-indigo-400 hover:underline mt-2 text-xs">
                        Erstes Inserat erstellen
                    </a>
                </div>
            )}
        </div>
    );
};

export default LatestInserate;