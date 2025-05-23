import { userTable } from "@/db/schema";
import InserateRenderList from "../(routes)/inserate/_components/inserat-render-list";
import { FaChartPie, FaListUl, FaRegClock } from "react-icons/fa";
import HighlightInserat from "../(routes)/inserate/_components/highlight-inserat";
import { BarChart3, FileBarChart, FilePieChartIcon, Filter, LayoutGrid, PlusCircle, Search, SlidersHorizontal, Star, TruckIcon, Edit, X, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InserateTabProps {
    currentUser: typeof userTable.$inferSelect | any;
}

const InserateTab = ({ currentUser }: InserateTabProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
    const [sortOption, setSortOption] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');

    const inserateArray = currentUser.inserat || [];
    const publishedCount = inserateArray.filter((inserat) => inserat.isPublished).length;
    const draftCount = inserateArray.filter((inserat) => !inserat.isPublished).length;
    
    // Apply filters and sorting
    const filteredInserates = inserateArray.filter(inserat => {
        if (filterStatus === 'published' && !inserat.isPublished) return false;
        if (filterStatus === 'draft' && inserat.isPublished) return false;
        if (searchQuery && !inserat.title?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    // Sort the filtered inserates
    const sortedInserates = [...filteredInserates].sort((a, b) => {
        if (sortOption === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortOption === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        if (sortOption === 'alphabetical') return (a.title || '').localeCompare(b.title || '');
        return 0;
    });

    // Calculate statistics
    const totalViews = inserateArray.reduce((acc, inserat) => acc + (inserat.viewCount || 0), 0);
    const totalClicks = inserateArray.reduce((acc, inserat) => acc + (inserat.clickCount || 0), 0);
    const avgViewsPerInserat = inserateArray.length > 0 ? Math.round(totalViews / inserateArray.length) : 0;
    
    // Check if premium features are available
    const hasPremiumFeatures = currentUser?.subscription?.subscriptionType === "ENTERPRISE" || currentUser?.subscription?.subscriptionType === "PREMIUM";

    return (
        <div className="max-w-[1600px] mx-auto p-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold flex items-center dark:text-white">
                        <TruckIcon className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Meine Inserate
                    </h1>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                        Verwalte deine Anzeigen und aktualisiere die Verfügbarkeit deiner Fahrzeuge
                    </p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Neues Inserat erstellen
                </Button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="dark:bg-[#222222] border-none shadow-lg">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Inserate gesamt</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <TruckIcon className="h-5 w-5 text-indigo-500" />
                            <span className="text-2xl font-bold dark:text-white">{inserateArray.length}</span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground dark:text-gray-400">
                            {draftCount} Entwürfe • {publishedCount} Veröffentlicht
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="dark:bg-[#222222] border-none shadow-lg">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Gesamte Aufrufe</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <BarChart3 className="h-5 w-5 text-indigo-500" />
                            <span className="text-2xl font-bold dark:text-white">{totalViews}</span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground dark:text-gray-400">
                            Ø {avgViewsPerInserat} Aufrufe pro Inserat
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="dark:bg-[#222222] border-none shadow-lg">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Gesamt-Klicks</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <FileBarChart className="h-5 w-5 text-indigo-500" />
                            <span className="text-2xl font-bold dark:text-white">{totalClicks}</span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground dark:text-gray-400">
                            Konversionsrate: {totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0}%
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="dark:bg-[#222222] border-none shadow-lg">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Subscription Status</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <Star className="h-5 w-5 text-amber-500" />
                            <span className="text-lg font-bold dark:text-white">
                                {currentUser?.subscription?.subscriptionType || "FREE"}
                            </span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground dark:text-gray-400">
                            {hasPremiumFeatures ? "Premium-Features aktiviert" : "Upgrade für mehr Features"}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Premium Feature - Highlight Inserats */}
            {hasPremiumFeatures && (
                <Card className="dark:bg-[#222222] border-none shadow-lg mb-6">
                    <CardHeader className="pb-2 pt-4 px-5 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center">
                            <CardTitle className="text-lg font-semibold dark:text-white flex items-center">
                                <Star className="h-5 w-5 mr-2 text-amber-500" />
                                Premium-Feature: Inserate hervorheben
                            </CardTitle>
                            <Badge className="ml-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                                Premium
                            </Badge>
                        </div>
                        <CardDescription>
                            Setze deine besten Inserate in den Vordergrund und steigere ihre Sichtbarkeit
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5">
                        <HighlightInserat
                            foundInserate={inserateArray}
                            currentUser={currentUser}
                            existingSubscription={currentUser?.subscription}
                        />
                    </CardContent>
                </Card>
            )}

            {/* Filters and Controls */}
            <Card className="dark:bg-[#222222] border-none shadow-lg mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="relative w-full sm:w-[280px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-indigo-400" />
                            </div>
                            <Input 
                                placeholder="Inserate durchsuchen..." 
                                className="pl-9 py-2 h-9 bg-[#1a1a1a]/90 dark:bg-[#141414] border-indigo-800/20 dark:border-indigo-900/30 rounded-md w-full text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 shadow-md"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button 
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-indigo-400 hover:text-indigo-300"
                                    onClick={() => setSearchQuery('')}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-3 items-center sm:ml-auto">
                            <div className="flex items-center bg-gray-50/80 dark:bg-gray-900/50 rounded-md shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={cn(
                                        "px-3 py-1 h-9 rounded-none transition-all", 
                                        filterStatus === 'all' 
                                            ? "bg-indigo-600/90 text-white dark:bg-indigo-600/90 dark:text-white font-medium shadow-none border-none"
                                            : "text-gray-600 dark:text-gray-400 hover:text-indigo-700 dark:hover:text-indigo-300 border-none"
                                    )}
                                    onClick={() => setFilterStatus('all')}
                                >
                                    Alle ({inserateArray.length})
                                </Button>
                                <div className="h-5 w-px bg-gray-200 dark:bg-gray-700/50"></div>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={cn(
                                        "px-3 py-1 h-9 rounded-none transition-all", 
                                        filterStatus === 'published' 
                                            ? "bg-indigo-600/90 text-white dark:bg-indigo-600/90 dark:text-white font-medium shadow-none border-none"
                                            : "text-gray-600 dark:text-gray-400 hover:text-indigo-700 dark:hover:text-indigo-300 border-none"
                                    )}
                                    onClick={() => setFilterStatus('published')}
                                >
                                    Veröffentlicht ({publishedCount})
                                </Button>
                                <div className="h-5 w-px bg-gray-200 dark:bg-gray-700/50"></div>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={cn(
                                        "px-3 py-1 h-9 rounded-none transition-all", 
                                        filterStatus === 'draft' 
                                            ? "bg-indigo-600/90 text-white dark:bg-indigo-600/90 dark:text-white font-medium shadow-none border-none"
                                            : "text-gray-600 dark:text-gray-400 hover:text-indigo-700 dark:hover:text-indigo-300 border-none"
                                    )}
                                    onClick={() => setFilterStatus('draft')}
                                >
                                    Entwürfe ({draftCount})
                                </Button>
                            </div>
                            <div className="flex items-center bg-gray-50/80 dark:bg-gray-900/50 rounded-md shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={cn(
                                        "px-2 rounded-none h-9 transition-all border-none",
                                        viewMode === 'grid' 
                                            ? "bg-indigo-600/90 text-white dark:bg-indigo-600/90 dark:text-white"
                                            : "text-gray-600 dark:text-gray-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                                    )}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                </Button>
                                <div className="h-5 w-px bg-gray-200 dark:bg-gray-700/50"></div>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={cn(
                                        "px-2 rounded-none h-9 transition-all border-none",
                                        viewMode === 'list' 
                                            ? "bg-indigo-600/90 text-white dark:bg-indigo-600/90 dark:text-white"
                                            : "text-gray-600 dark:text-gray-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                                    )}
                                    onClick={() => setViewMode('list')}
                                >
                                    <FaListUl className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Main Content */}
            <Card className="dark:bg-[#222222] border-none shadow-lg">
                <CardHeader className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium flex items-center dark:text-white">
                            <BarChart3 className="h-5 w-5 mr-2 text-indigo-500" />
                            Inserateübersicht
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="flex bg-gray-50/80 dark:bg-gray-900/50 rounded-md shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden h-8">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={cn(
                                        "px-3 py-1 h-8 rounded-none transition-all text-xs", 
                                        sortOption === 'newest' 
                                            ? "bg-indigo-600/90 text-white dark:bg-indigo-600/90 dark:text-white font-medium shadow-none border-none"
                                            : "text-gray-600 dark:text-gray-400 hover:text-indigo-700 dark:hover:text-indigo-300 border-none"
                                    )}
                                    onClick={() => setSortOption('newest')}
                                >
                                    Neueste
                                </Button>
                                <div className="h-5 w-px bg-gray-200 dark:bg-gray-700/50"></div>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={cn(
                                        "px-3 py-1 h-8 rounded-none transition-all text-xs", 
                                        sortOption === 'oldest' 
                                            ? "bg-indigo-600/90 text-white dark:bg-indigo-600/90 dark:text-white font-medium shadow-none border-none"
                                            : "text-gray-600 dark:text-gray-400 hover:text-indigo-700 dark:hover:text-indigo-300 border-none"
                                    )}
                                    onClick={() => setSortOption('oldest')}
                                >
                                    Älteste
                                </Button>
                                <div className="h-5 w-px bg-gray-200 dark:bg-gray-700/50"></div>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={cn(
                                        "px-3 py-1 h-8 rounded-none transition-all text-xs", 
                                        sortOption === 'alphabetical' 
                                            ? "bg-indigo-600/90 text-white dark:bg-indigo-600/90 dark:text-white font-medium shadow-none border-none"
                                            : "text-gray-600 dark:text-gray-400 hover:text-indigo-700 dark:hover:text-indigo-300 border-none"
                                    )}
                                    onClick={() => setSortOption('alphabetical')}
                                >
                                    A-Z
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-5">
                    {sortedInserates.length > 0 ? (
                        viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in">
                                {sortedInserates.map((inserat) => (
                                    <Card key={inserat.id} className="overflow-hidden dark:bg-[#1a1a1a] border-none shadow-md hover:shadow-lg transition-shadow">
                                        <div className="relative aspect-video">
                                            {inserat.images && inserat.images.length > 0 ? (
                                                <img 
                                                    src={inserat.images.sort((a, b) => a.position - b.position)[0]?.url} 
                                                    alt={inserat.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex justify-center items-center bg-gray-100 dark:bg-[#0F0F0F]">
                                                    <TruckIcon className="h-12 w-12 text-gray-300 dark:text-gray-700" />
                                                </div>
                                            )}
                                            {inserat.isHighlighted && (
                                                <Badge className="absolute top-2 right-2 bg-amber-500/90 text-white border-none">
                                                    <Star className="h-3 w-3 mr-1" /> Premium
                                                </Badge>
                                            )}
                                        </div>
                                        <CardHeader className="p-4 pb-2">
                                            <CardTitle className="text-base font-medium line-clamp-1">
                                                {inserat.title}
                                            </CardTitle>
                                            <div className="flex items-center justify-between mt-1">
                                                <Badge variant={inserat.isPublished ? "default" : "outline"} className={inserat.isPublished ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50" : "border-gray-200 dark:border-gray-700"}>
                                                    {inserat.isPublished ? "Veröffentlicht" : "Entwurf"}
                                                </Badge>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(inserat.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-2">
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <TruckIcon className="h-4 w-4 mr-1.5" />
                                                    {inserat.category || "Keine Kategorie"}
                                                </div>
                                                <div className="flex gap-1">
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline" 
                                                        className="h-8 px-2 rounded-md border-indigo-200 dark:border-indigo-800/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                                                        onClick={() => window.open(`/inserat/${inserat.id}`, '_blank')}
                                                    >
                                                        <Eye className="h-3.5 w-3.5" />
                                                    </Button>
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline" 
                                                        className="h-8 px-2 rounded-md border-indigo-200 dark:border-indigo-800/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                                                        onClick={() => window.location.href = `/inserat/create/${inserat.id}`}
                                                    >
                                                        <Edit className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="animate-in fade-in">
                                <InserateRenderList
                                    inserateArray={sortedInserates}
                                    currentUser={currentUser}
                                />
                            </div>
                        )
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <TruckIcon className="h-16 w-16 text-gray-300 dark:text-gray-700 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Keine Inserate gefunden</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-6">
                                {searchQuery ? 
                                    `Keine Inserate gefunden für "${searchQuery}". Versuche einen anderen Suchbegriff.` : 
                                    'Erstelle dein erstes Inserat und erreiche tausende potenzielle Kunden.'}
                            </p>
                            <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white">
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Neues Inserat erstellen
                            </Button>
                        </div>
                    )}
                </CardContent>
                {sortedInserates.length > 0 && (
                    <CardFooter className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Zeige {sortedInserates.length} von {inserateArray.length} Inseraten
                        </div>
                        <Button variant="outline" size="sm" className="border-indigo-200 dark:border-indigo-800/30 text-indigo-700 dark:text-indigo-300">
                            <FaRegClock className="h-3 w-3 mr-2" />
                            Aktualisiert vor {Math.floor(Math.random() * 60)} Minuten
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};

export default InserateTab;