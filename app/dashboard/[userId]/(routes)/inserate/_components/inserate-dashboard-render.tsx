import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { inserat } from "@/db/schema";
import { cn } from "@/lib/utils";
import axios from "axios";
import { format } from "date-fns";
import { AlertCircle, CheckCircle, Edit3, ExternalLink, Eye, Star, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import HighlightInseratDialog from "./highlight-inserat-dialog";
import ToggleVisibility from "./toggle-visibility";
import { user } from "@/drizzle/schema";
import { Badge } from "@/components/ui/badge";

interface InserateDashboardRenderProps {
    thisInserat: typeof inserat.$inferSelect | any;
    currentUser: typeof user.$inferSelect;
    deleteInserat: (id: string) => void;
    canPublishMore: boolean;
    isLoading: boolean;
}

const InserateDashboardRender: React.FC<InserateDashboardRenderProps> = ({
    thisInserat,
    currentUser,
    isLoading,
    canPublishMore,
    deleteInserat
}) => {
    const router = useRouter();
    const renderedPicture = thisInserat?.images.sort((a, b) => a.position - b.position)[0]?.url;
    const [isPublished, setIsPublished] = useState(thisInserat.isPublished);

    const isPublishable = {
        title: thisInserat.title.length > 0,
        description: thisInserat.description?.length > 0 || false,
        price: Number(thisInserat.price) !== 0 && thisInserat.price,
        images: thisInserat.images?.length > 0,
        postalCode: thisInserat.address?.postalCode != null,
        location: thisInserat.address?.locationString != null,
    };

    // Format the date in a more readable way
    const formattedDate = format(new Date(thisInserat.createdAt), "dd.MM.yyyy");

    return (
        <div className="w-full bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden h-[140px]">
            <div className="flex h-full">
                {/* Image container */}
                <div className="w-[140px] h-full flex-shrink-0">
                    {thisInserat.images.length > 0 ? (
                        <div className="relative h-full w-full">
                            <Image
                                alt={thisInserat.title || "Inserat-Bild"}
                                src={renderedPicture}
                                width={140}
                                height={140}
                                className="h-full w-full object-cover"
                            />
                            {thisInserat.isHighlighted && (
                                <Badge className="absolute top-2 right-2 bg-amber-500/90 text-white border-none text-xs py-0.5">
                                    <Star className="h-3 w-3 mr-1" /> Premium
                                </Badge>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-full flex justify-center items-center bg-gray-100 dark:bg-[#141414] text-xs truncate">
                            <div className="text-gray-400 dark:text-gray-600">Keine Fotos</div>
                        </div>
                    )}
                </div>

                {/* Content container */}
                <div className="flex-1 p-4 flex justify-between h-full">
                    {/* Title and status */}
                    <div className="flex-1 flex flex-col justify-between pr-4">
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1 text-sm">
                                {thisInserat.title}
                            </h3>
                            
                            <div className="flex items-center gap-2 mt-1.5">
                                <Badge 
                                    variant={isPublished ? "default" : "outline"} 
                                    className={cn(
                                        "text-xs px-1.5 py-0",
                                        isPublished 
                                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50" 
                                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                                    )}
                                >
                                    {isPublished 
                                        ? <div className="flex items-center"><CheckCircle className="h-2.5 w-2.5 mr-1" /> Veröffentlicht</div>
                                        : <div className="flex items-center"><AlertCircle className="h-2.5 w-2.5 mr-1" /> Entwurf</div>
                                    }
                                </Badge>
                                
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {formattedDate}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <ToggleVisibility
                                thisInserat={thisInserat}
                                onEdit={(isPublished) => setIsPublished(isPublished)}
                                isPublishable={isPublishable}
                                isPublished={isPublished}
                                currentUser={currentUser}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col justify-between items-end gap-2 h-full flex-shrink-0">
                        <div className="flex gap-1">
                            {!isPublished ? null : (
                                <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-7 w-7 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                                    onClick={() => window.open(`/inserat/${thisInserat.id}`, '_blank')}
                                    title="Inserat anzeigen"
                                >
                                    <Eye className="h-3.5 w-3.5" />
                                </Button>
                            )}
                            
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                                onClick={() => router.push(`/inserat/create/${thisInserat?.id}`)}
                                title="Inserat bearbeiten"
                            >
                                <Edit3 className="h-3.5 w-3.5" />
                            </Button>
                            
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button 
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                                        disabled={isLoading}
                                        title="Inserat löschen"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="dark:bg-[#1a1a1a] border-gray-100 dark:border-gray-800">
                                    <DialogHeader>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
                                            <X className="mr-2 h-5 w-5 text-red-600" />
                                            Inserat löschen
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            Möchtest du dieses Inserat wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                                        </p>
                                    </DialogHeader>
                                    <div className="flex justify-end gap-x-2 mt-4">
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" className="text-xs">
                                                Abbrechen
                                            </Button>
                                        </DialogTrigger>
                                        <DialogTrigger asChild>
                                            <Button 
                                                variant="destructive" 
                                                size="sm" 
                                                className="text-xs bg-red-600 hover:bg-red-700 text-white"
                                                onClick={() => deleteInserat(thisInserat?.id)}
                                            >
                                                Endgültig löschen
                                            </Button>
                                        </DialogTrigger>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Premium highlight button */}
                        {(currentUser as any)?.subscription?.subscriptionType === "ENTERPRISE" || 
                         (currentUser as any)?.subscription?.subscriptionType === "PREMIUM" ? (
                            <div className="mt-auto">
                                <HighlightInseratDialog thisInserat={thisInserat} />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InserateDashboardRender;