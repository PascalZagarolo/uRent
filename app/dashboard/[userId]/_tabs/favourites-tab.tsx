import FavouriteRenderList from "../(routes)/bookings/_components/favourite-render-list";
import { userTable } from "@/db/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ListFilter, LayoutGrid, List, Search, TruckIcon, Eye, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface FavouritesTabProps {
    currentUser: typeof userTable.$inferSelect | any;
}

const FavouritesTab = ({ currentUser }: FavouritesTabProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const favouriteCount = currentUser?.favourites?.length || 0;
    
    // Filter favorites based on search
    const filteredFavorites = currentUser?.favourites?.filter(fav => 
        !searchQuery || fav?.inserat?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    // Custom rendering of favorites based on viewMode
    const renderFavorites = () => {
        if (viewMode === 'grid') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredFavorites.map((favorite) => (
                        <Card key={favorite.id} className="overflow-hidden bg-white dark:bg-[#1a1a1a] border-none shadow-md hover:shadow-lg transition-shadow">
                            <div className="relative aspect-video">
                                {favorite.inserat?.images && favorite.inserat.images.length > 0 ? (
                                    <Image 
                                        src={favorite.inserat.images.sort((a, b) => a.position - b.position)[0]?.url}
                                        alt={favorite.inserat.title || "Fahrzeug"}
                                        width={400}
                                        height={225}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex justify-center items-center bg-gray-100 dark:bg-[#141414]">
                                        <TruckIcon className="h-12 w-12 text-gray-300 dark:text-gray-700" />
                                    </div>
                                )}
                                <Badge className="absolute top-2 right-2 bg-indigo-600/90 text-white border-none">
                                    <Heart className="h-3 w-3 mr-1 fill-white" /> Favorit
                                </Badge>
                            </div>
                            <CardHeader className="p-4 pb-2">
                                <CardTitle className="text-base font-medium line-clamp-1 dark:text-white">
                                    {favorite.inserat?.title || "Unbekanntes Fahrzeug"}
                                </CardTitle>
                                <div className="flex items-center justify-between mt-1">
                                    <Badge variant="outline" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50">
                                        {favorite.inserat?.price ? `${favorite.inserat.price}€/Tag` : "Preis auf Anfrage"}
                                    </Badge>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(favorite.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                                <div className="flex justify-end mt-2">
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-8 px-3 rounded-md border-indigo-200 dark:border-indigo-800/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                                        onClick={() => window.open(`/inserat/${favorite.inserat?.id}`, '_blank')}
                                    >
                                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                                        Anzeigen
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            );
        } else {
            // List view
            return (
                <div className="space-y-3">
                    {filteredFavorites.map((favorite) => (
                        <div 
                            key={favorite.id} 
                            className="flex flex-col sm:flex-row bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden h-[120px]"
                        >
                            <div className="w-full sm:w-[140px] h-full flex-shrink-0">
                                {favorite.inserat?.images && favorite.inserat.images.length > 0 ? (
                                    <Image 
                                        src={favorite.inserat.images.sort((a, b) => a.position - b.position)[0]?.url}
                                        alt={favorite.inserat.title || "Fahrzeug"}
                                        width={140}
                                        height={120}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex justify-center items-center bg-gray-100 dark:bg-[#141414]">
                                        <TruckIcon className="h-10 w-10 text-gray-300 dark:text-gray-700" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 p-4 flex justify-between h-full">
                                <div className="flex-1 flex flex-col justify-between pr-4">
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1 text-sm">
                                            {favorite.inserat?.title || "Unbekanntes Fahrzeug"}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <Badge 
                                                variant="outline" 
                                                className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50 text-xs px-1.5 py-0"
                                            >
                                                {favorite.inserat?.price ? `${favorite.inserat.price}€/Tag` : "Preis auf Anfrage"}
                                            </Badge>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                Favorisiert am {new Date(favorite.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-8 px-3 rounded-md border-indigo-200 dark:border-indigo-800/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                                        onClick={() => window.open(`/inserat/${favorite.inserat?.id}`, '_blank')}
                                    >
                                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                                        Anzeigen
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold flex items-center dark:text-white">
                        <Heart className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400 fill-indigo-300 dark:fill-indigo-900/40" />
                        Meine Favoriten
                    </h1>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                        Gespeicherte Fahrzeuge, die du für später aufgehoben hast
                    </p>
                </div>
                <Badge variant="outline" className="px-2 py-1 bg-indigo-50/50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/30">
                    {favouriteCount} {favouriteCount === 1 ? 'Favorit' : 'Favoriten'}
                </Badge>
            </div>

            {/* Search and Filter Bar */}
            {favouriteCount > 0 && (
                <Card className="dark:bg-[#222222] border-none shadow-lg mb-6">
                    <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="relative w-full sm:w-[280px]">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-indigo-400" />
                                </div>
                                <Input 
                                    placeholder="Favoriten durchsuchen..." 
                                    className="pl-9 py-2 h-9 bg-[#1a1a1a]/90 dark:bg-[#141414] border-indigo-800/20 dark:border-indigo-900/30 rounded-md w-full text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 shadow-md"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button 
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-indigo-400 hover:text-indigo-300"
                                        onClick={() => setSearchQuery('')}
                                    >
                                        <Search className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            
                            <div className="flex items-center bg-gray-50/80 dark:bg-gray-900/50 rounded-md shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden self-end sm:self-auto">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={cn(
                                        "px-3 py-1 h-9 rounded-none transition-all", 
                                        viewMode === 'grid' 
                                            ? "bg-indigo-600/90 text-white dark:bg-indigo-600/90 dark:text-white font-medium shadow-none border-none"
                                            : "text-gray-600 dark:text-gray-400 hover:text-indigo-700 dark:hover:text-indigo-300 border-none"
                                    )}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <LayoutGrid className="h-4 w-4 mr-1.5" />
                                    Raster
                                </Button>
                                <div className="h-5 w-px bg-gray-200 dark:bg-gray-700/50"></div>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={cn(
                                        "px-3 py-1 h-9 rounded-none transition-all", 
                                        viewMode === 'list' 
                                            ? "bg-indigo-600/90 text-white dark:bg-indigo-600/90 dark:text-white font-medium shadow-none border-none"
                                            : "text-gray-600 dark:text-gray-400 hover:text-indigo-700 dark:hover:text-indigo-300 border-none"
                                    )}
                                    onClick={() => setViewMode('list')}
                                >
                                    <List className="h-4 w-4 mr-1.5" />
                                    Liste
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Main Content */}
            <Card className="dark:bg-[#222222] border-none shadow-lg">
                <CardHeader className="pb-3 pt-5 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-medium flex items-center dark:text-white">
                            <Heart className="h-5 w-5 mr-2 text-indigo-500 fill-indigo-500/60" />
                            Favorisierte Fahrzeuge
                        </CardTitle>
                        {searchQuery && filteredFavorites.length > 0 && (
                            <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/30">
                                {filteredFavorites.length} Ergebnisse
                            </Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-5">
                    <AnimatePresence mode="wait">
                        {filteredFavorites.length > 0 ? (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderFavorites()}
                            </motion.div>
                        ) : searchQuery ? (
                            <motion.div
                                key="no-results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col items-center justify-center py-10 text-center"
                            >
                                <Search className="h-12 w-12 text-gray-300 dark:text-gray-700 mb-3" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Keine Ergebnisse gefunden</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-6">
                                    Keine Favoriten gefunden für "{searchQuery}". Versuche einen anderen Suchbegriff.
                                </p>
                                <Button 
                                    variant="outline"
                                    className="border-indigo-200 dark:border-indigo-800/30 text-indigo-700 dark:text-indigo-300"
                                    onClick={() => setSearchQuery('')}
                                >
                                    Filter zurücksetzen
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col items-center justify-center py-10 text-center"
                            >
                                <Heart className="h-12 w-12 text-gray-300 dark:text-gray-700 mb-3" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Noch keine Favoriten</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-6">
                                    Du hast noch keine Fahrzeuge zu deinen Favoriten hinzugefügt. Beim Durchstöbern von Inseraten kannst du das Herz-Symbol anklicken, um sie zu speichern.
                                </p>
                                <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white">
                                    <TruckIcon className="h-4 w-4 mr-2" />
                                    Inserate entdecken
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
                
                {filteredFavorites.length > 0 && (
                    <CardFooter className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Zeige {filteredFavorites.length} von {favouriteCount} Favoriten
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-indigo-200 dark:border-indigo-800/30 text-indigo-700 dark:text-indigo-300"
                            onClick={() => setSearchQuery('')}
                            disabled={!searchQuery}
                        >
                            <ListFilter className="h-3.5 w-3.5 mr-2" />
                            {searchQuery ? "Filter zurücksetzen" : "Alle anzeigen"}
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
 
export default FavouritesTab;