'use client';

import InserateDashboardRender from "./inserate-dashboard-render";
import { useState } from "react";
import { inserat } from "@/db/schema";
import { user } from "@/drizzle/schema";
import { ChevronDown, ChevronUp, TruckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface InserateRenderListProps {
    inserateArray: typeof inserat.$inferSelect[];
    currentUser: typeof user.$inferSelect;
}

const InserateRenderList: React.FC<InserateRenderListProps> = ({
    inserateArray,
    currentUser
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [expandedItems, setExpandedItems] = useState(5);

    const canPublishMore = () => {
        const highlightedLength = inserateArray.filter((inserat) => inserat.isHighlighted).length;

        //@ts-ignore
        if (currentUser?.subscription?.subscriptionType === "PREMIUM") {
            return highlightedLength < 1;
            //@ts-ignore
        } else if (currentUser?.subscription?.subscriptionType === "ENTERPRISE") {
            return highlightedLength < 2;
        } else {
            return false;
        }
    }

    const onDelete = async (inseratId: string) => {
        try {
            if (isLoading) return;
            setIsLoading(true);
            
            await axios.delete(`/api/inserat/${inseratId}/delete`);
            toast.success("Inserat erfolgreich gelöscht");
            router.refresh();
        } catch (error) {
            toast.error("Fehler beim Löschen des Inserats");
        } finally {
            setIsLoading(false);
        }
    }

    const handleShowMore = () => {
        setExpandedItems(prev => 
            inserateArray.length > prev + 5 ? prev + 5 : inserateArray.length
        );
    }

    const handleShowLess = () => {
        setExpandedItems(5);
    }

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center mb-4">
                <Badge variant="outline" className="px-2 py-1 bg-gray-50 dark:bg-gray-900/30 text-xs font-normal">
                    {inserateArray.length} {inserateArray.length === 1 ? "Inserat" : "Inserate"}
                </Badge>
            </div>
            
            <div className="space-y-3">
                <AnimatePresence initial={false}>
                    {inserateArray.slice(0, expandedItems).map((inserat, index) => (
                        <motion.div
                            key={inserat.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
                            transition={{ 
                                duration: 0.2, 
                                delay: index * 0.03,
                                exit: { duration: 0.15 }
                            }}
                        >
                            <InserateDashboardRender
                                thisInserat={inserat}
                                isLoading={isLoading}
                                currentUser={currentUser}
                                deleteInserat={onDelete}
                                canPublishMore={canPublishMore()}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {inserateArray.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-center bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
                        <TruckIcon className="h-12 w-12 text-gray-300 dark:text-gray-700 mb-3" />
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                            Keine Inserate vorhanden
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">
                            Erstelle dein erstes Inserat und erreiche tausende potenzielle Kunden.
                        </p>
                    </div>
                )}
                
                {inserateArray.length > 5 && (
                    <div className="flex justify-center pt-3">
                        {expandedItems < inserateArray.length ? (
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={handleShowMore}
                                className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 px-4 flex items-center gap-1"
                            >
                                Mehr anzeigen <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                        ) : (
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={handleShowLess}
                                className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 px-4 flex items-center gap-1"
                            >
                                Weniger anzeigen <ChevronUp className="h-3 w-3 ml-1" />
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default InserateRenderList;