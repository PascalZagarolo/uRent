import { Activity, EyeIcon, FileText, ListChecks, PieChart, TrendingUp, Truck, TruckIcon, Users, Wallet } from "lucide-react";
import InseratCategoriesChart from "../(routes)/_components/_charts/inserat-category.chart";
import { inserat } from "@/db/schema";
import LatestInserate from "../(routes)/_components/latest-inserate";
import DashboardTips from "../(routes)/_components/dashboard-tips";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DashboardTabProps {
    views: number;
    foundInserate: typeof inserat.$inferSelect[] | any[];
}

const DashboardTab = ({ views, foundInserate }: DashboardTabProps) => {
    const releasedInserate = foundInserate?.filter((inserat) => inserat?.isPublished)?.length;
    const nonReleased = foundInserate?.length - releasedInserate;
    
    // Calculate view statistics
    const totalViews = views || 0;
    const averageViews = foundInserate?.length ? Math.round(totalViews / foundInserate.length) : 0;
    
    // Get most viewed inserat
    const mostViewedInserat = foundInserate?.length ? 
        foundInserate.reduce((prev, current) => 
            (prev?.views > current?.views) ? prev : current, foundInserate[0]) : null;
            
    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            {/* Page Title */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-8">
                <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
                <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})}
                </div>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <Card className="dark:bg-[#222222] border-none shadow-lg">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Inserate Veröffentlicht</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-emerald-500" />
                            <span className="text-2xl font-bold dark:text-white">{releasedInserate}</span>
                        </div>
                        <div className="mt-2">
                            <Progress value={releasedInserate ? (releasedInserate / foundInserate.length) * 100 : 0} className="h-1 bg-emerald-950/20" />
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="dark:bg-[#222222] border-none shadow-lg">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Gespeicherte Entwürfe</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <ListChecks className="h-5 w-5 text-blue-500" />
                            <span className="text-2xl font-bold dark:text-white">{nonReleased}</span>
                        </div>
                        <div className="mt-2">
                            <Progress value={nonReleased ? (nonReleased / foundInserate.length) * 100 : 0} className="h-1 bg-blue-950/20" />
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="dark:bg-[#222222] border-none shadow-lg">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Inserat Aufrufe</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <EyeIcon className="h-5 w-5 text-indigo-500" />
                            <span className="text-2xl font-bold dark:text-white">{totalViews}</span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground dark:text-gray-400">
                            Ø {averageViews} pro Inserat
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="dark:bg-[#222222] border-none shadow-lg">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Inserate Gesamt</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <TruckIcon className="h-5 w-5 text-purple-500" />
                            <span className="text-2xl font-bold dark:text-white">{foundInserate?.length || 0}</span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground dark:text-gray-400">
                            Gesamte Anzahl an Inseraten
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                {/* Chart Section - 2/3 Width */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Activity Chart */}
                    <Card className="dark:bg-[#222222] border-none shadow-lg overflow-hidden">
                        <CardHeader className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-semibold dark:text-white">
                                    <div className="flex items-center gap-2">
                                        <Activity className="h-5 w-5 text-blue-500" />
                                        Inserat Aktivität
                                    </div>
                                </CardTitle>
                            </div>
                            <CardDescription className="mt-1.5">
                                Übersicht der Inseratkategorien und Verteilung
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-5 py-4">
                            <div className="min-h-[320px]">
                                <InseratCategoriesChart foundInserate={foundInserate} />
                            </div>
                        </CardContent>
                    </Card>
                    
                    {/* Quick Stats and Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Most Viewed Inserat */}
                        <Card className="dark:bg-[#222222] border-none shadow-lg h-auto">
                            <CardHeader className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                                <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                                    Beliebtestes Inserat
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-5 py-4">
                                {mostViewedInserat ? (
                                    <div>
                                        <h3 className="font-medium text-base dark:text-white truncate">{mostViewedInserat.title}</h3>
                                        <div className="flex items-center mt-2 text-sm text-muted-foreground dark:text-gray-400">
                                            <EyeIcon className="h-4 w-4 mr-1 text-indigo-500 flex-shrink-0" />
                                            <span>{mostViewedInserat.views || 0} Aufrufe</span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground dark:text-gray-400">Keine Inserate verfügbar</p>
                                )}
                            </CardContent>
                        </Card>
                        
                        {/* Performance Summary */}
                        <Card className="dark:bg-[#222222] border-none shadow-lg h-auto">
                            <CardHeader className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                                <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                                    Performance
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-5 py-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs dark:text-gray-400">Veröffentlichungsrate</span>
                                        <span className="text-xs font-medium dark:text-white">
                                            {foundInserate?.length ? Math.round((releasedInserate / foundInserate.length) * 100) : 0}%
                                        </span>
                                    </div>
                                    <Progress value={foundInserate?.length ? (releasedInserate / foundInserate.length) * 100 : 0} className="h-1 bg-emerald-950/20" />
                                    
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs dark:text-gray-400">Entwurfsrate</span>
                                        <span className="text-xs font-medium dark:text-white">
                                            {foundInserate?.length ? Math.round((nonReleased / foundInserate.length) * 100) : 0}%
                                        </span>
                                    </div>
                                    <Progress value={foundInserate?.length ? (nonReleased / foundInserate.length) * 100 : 0} className="h-1 bg-blue-950/20" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                
                {/* Sidebar - 1/3 Width */}
                <div className="space-y-6">
                    {/* Latest Inserate Section */}
                    <Card className="dark:bg-[#222222] border-none shadow-lg overflow-hidden">
                        <CardHeader className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-semibold dark:text-white">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-green-500" />
                                        Neueste Inserate
                                    </div>
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="px-5 py-4">
                            <LatestInserate foundInserate={foundInserate} />
                        </CardContent>
                    </Card>
                    
                    {/* Quick Actions */}
                    <Card className="dark:bg-[#222222] border-none shadow-lg overflow-hidden">
                        <CardHeader className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                            <CardTitle className="text-lg font-semibold dark:text-white">
                                Schnellaktionen
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 py-4">
                            <div className="space-y-2">
                                <a href="/dashboard?tab=inserate" className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                                    <TruckIcon className="h-4 w-4 mr-2 text-indigo-500 flex-shrink-0" />
                                    <span className="text-sm dark:text-gray-200">Neues Inserat erstellen</span>
                                </a>
                                <a href="/dashboard?tab=manage" className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                                    <Users className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                                    <span className="text-sm dark:text-gray-200">Buchungen verwalten</span>
                                </a>
                                <a href="/dashboard?tab=payments" className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                                    <Wallet className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                                    <span className="text-sm dark:text-gray-200">Zahlungen anzeigen</span>
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            {/* Tips Section */}
            <div className="mt-8">
                <Card className="dark:bg-[#222222] border-none shadow-lg overflow-hidden">
                    <CardHeader className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                        <CardTitle className="text-lg font-semibold dark:text-white">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-amber-500" />
                                Tipps für mehr Erfolg
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 py-4">
                        <DashboardTips />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default DashboardTab;