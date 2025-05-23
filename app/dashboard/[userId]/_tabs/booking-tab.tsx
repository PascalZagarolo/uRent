import { Calendar, Clock, ClipboardEdit, FileStack, PanelRightClose, Plus, TruckIcon, UserCheck2, UserPlus2 } from "lucide-react";

import { MdManageSearch } from "react-icons/md";
import db from "@/db/drizzle";
import getCurrentUser from "@/actions/getCurrentUser";
import { address, booking, bookingRequest, inserat, userTable, vehicle } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import CalendarAndDetails from "../(routes)/_components/calendar-and-details";
import AddBooking from "../(routes)/manage/_components/add-bookings";
import AddAvailability from "../(routes)/manage/_components/add-availability";
import BookingRequestRender from "../(routes)/_components/booking-request";
import RenderedInserat from "../(routes)/manage/_components/rendered-inserat";
import RenderedVehicle from "../(routes)/manage/_components/rendered-vehicle";
import SelectVehicle from "../(routes)/manage/_components/select-vehicle";
import SelectInserat from "../(routes)/manage/_components/select-inserat";
import { useRef, useState } from "react";

import TodayAgenda from "../(routes)/manage/_components/agenda-today";
import { isToday } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";


interface ManageTabProps {
    searchParams: {
        inseratId: string,
        vehicleId: string
    },
    currentUser: typeof userTable.$inferSelect | any;
}

const ManageTab: React.FC<ManageTabProps> = ({
    searchParams,
    currentUser
}) => {
    const [thisInserat, setThisInserat] = useState<any | null>(null);
    const [activeTab, setActiveTab] = useState("today");

    const foundInserate = currentUser?.inserat?.sort((a, b) =>
        a?.title?.localeCompare(b.title)
    );

    let involvedBookings: any = [];

    if (foundInserate.length > 0) {
        for (let i = 0; i < foundInserate.length; i++) {
            const bookings = foundInserate[i].bookings;
            involvedBookings.push(...bookings);
        }
    }

    let bookingRequests: typeof bookingRequest.$inferSelect[] = [];

    if (searchParams?.inseratId) {
        bookingRequests = foundInserate.filter((inserat) => inserat.id === searchParams.inseratId)[0].bookingRequests;
    } else {
        if (foundInserate.length > 0) {
            for (let i = 0; i < foundInserate.length; i++) {
                const requests = foundInserate[i].bookingRequests;
                bookingRequests.push(...requests);
            }
        }
    }

    let thisVehicle: any;

    if (searchParams?.vehicleId) {
        thisVehicle = foundInserate.filter((inserat) => inserat.id === searchParams.inseratId)[0].vehicles.find((vehicle) => vehicle.id === searchParams.vehicleId);
    }

    const selectedInserat = foundInserate?.find((inserat) => inserat.id === searchParams?.inseratId);

    const todaysBookings = involvedBookings
        ?.filter((booking) => isToday(booking.startDate))
        ?.sort((a, b) => a.startPeriod - b.startPeriod);

    const todaysReturns = involvedBookings
        ?.filter((booking) => isToday(booking.endDate))
        ?.sort((a, b) => a.endPeriod - b.endPeriod);

    const totalBookings = involvedBookings?.length || 0;
    const pendingRequests = bookingRequests?.length || 0;

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            {/* Page Title */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-8">
                <h1 className="text-2xl font-bold dark:text-white">Buchungsverwaltung</h1>
                <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Verwalte deine Buchungen, Verfügbarkeiten und Fahrzeuge
                </div>
                </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="dark:bg-[#222222] border-none shadow-lg">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Heute geplante Abgaben</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-emerald-500" />
                            <span className="text-2xl font-bold dark:text-white">{todaysBookings.length}</span>
                </div>
                        <div className="mt-2 text-xs text-muted-foreground dark:text-gray-400">
                            {todaysBookings.length === 0 ? "Keine Buchungen für heute" : "Fahrzeuge werden heute übergeben"}
                </div>
                    </CardContent>
                </Card>
                
                <Card className="dark:bg-[#222222] border-none shadow-lg">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Heute geplante Rückgaben</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5 text-blue-500" />
                            <span className="text-2xl font-bold dark:text-white">{todaysReturns.length}</span>
                    </div>
                        <div className="mt-2 text-xs text-muted-foreground dark:text-gray-400">
                            {todaysReturns.length === 0 ? "Keine Rückgaben für heute" : "Fahrzeuge werden heute zurückgegeben"}
                    </div>
                    </CardContent>
                </Card>
                
                <Card className="dark:bg-[#222222] border-none shadow-lg">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Aktive Buchungen</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <FileStack className="h-5 w-5 text-indigo-500" />
                            <span className="text-2xl font-bold dark:text-white">{totalBookings}</span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground dark:text-gray-400">
                            {totalBookings === 1 ? "Buchung gesamt" : "Buchungen gesamt"}
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="dark:bg-[#222222] border-none shadow-lg">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Offene Anfragen</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <UserPlus2 className="h-5 w-5 text-amber-500" />
                            <span className="text-2xl font-bold dark:text-white">{pendingRequests}</span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground dark:text-gray-400">
                            {pendingRequests === 0 ? "Keine neuen Anfragen" : "Anfragen zu bearbeiten"}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="mb-8">
                <Tabs defaultValue="today" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="inline-flex h-12 mb-6 bg-transparent p-0 w-full">
                        <TabsTrigger 
                            value="today" 
                            className="relative h-full px-5 flex items-center gap-2 text-sm font-medium ring-offset-0 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-indigo-600 data-[state=active]:dark:text-indigo-400"
                        >
                            <Clock className="h-4 w-4" />
                            <span className="hidden sm:inline">Tagesagenda</span>
                            <span className="sm:hidden">Heute</span>
                            {activeTab === "today" && (
                                <motion.div 
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                                    layoutId="todayTabIndicator"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                        </TabsTrigger>
                        <TabsTrigger 
                            value="calendar" 
                            className="relative h-full px-5 flex items-center gap-2 text-sm font-medium ring-offset-0 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-indigo-600 data-[state=active]:dark:text-indigo-400"
                        >
                            <Calendar className="h-4 w-4" />
                            <span className="hidden sm:inline">Kalender</span>
                            <span className="sm:hidden">Kalender</span>
                            {activeTab === "calendar" && (
                                <motion.div 
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                                    layoutId="calendarTabIndicator"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                        </TabsTrigger>
                        <TabsTrigger 
                            value="add" 
                            className="relative h-full px-5 flex items-center gap-2 text-sm font-medium ring-offset-0 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-indigo-600 data-[state=active]:dark:text-indigo-400"
                        >
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">Hinzufügen</span>
                            <span className="sm:hidden">Neu</span>
                            {activeTab === "add" && (
                                <motion.div 
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                                    layoutId="addTabIndicator"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                        </TabsTrigger>
                        <TabsTrigger 
                            value="vehicles" 
                            className="relative h-full px-5 flex items-center gap-2 text-sm font-medium ring-offset-0 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-indigo-600 data-[state=active]:dark:text-indigo-400"
                        >
                            <TruckIcon className="h-4 w-4" />
                            <span className="hidden sm:inline">Fahrzeuge</span>
                            <span className="sm:hidden">Fahrzeuge</span>
                            {activeTab === "vehicles" && (
                                <motion.div 
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                                    layoutId="vehiclesTabIndicator"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="today" className="mt-2">
                        <Card className="dark:bg-[#222222] border-none shadow-lg mb-6">
                            <CardHeader className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                                <CardTitle className="text-lg font-semibold flex items-center dark:text-white">
                                    <Clock className="h-5 w-5 mr-2 text-emerald-500" />
                                    Heutige Termine
                                </CardTitle>
                                <CardDescription>
                                    Übersicht aller Fahrzeugübergaben und -rückgaben für heute
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-5 py-4">
                                <TodayAgenda 
                                    todaysBookings={todaysBookings}
                                    todaysReturns={todaysReturns} 
                                />
                            </CardContent>
                        </Card>
                        
                        {bookingRequests.length > 0 && (
                            <Card className="dark:bg-[#222222] border-none shadow-lg">
                                <CardHeader className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                                    <CardTitle className="text-lg font-semibold flex items-center dark:text-white">
                                        <UserPlus2 className="h-5 w-5 mr-2 text-amber-500" />
                                        Offene Anfragen
                                        <span className="ml-2 text-sm font-normal bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 px-2 py-0.5 rounded-full">
                                            {bookingRequests.length}
                                        </span>
                                    </CardTitle>
                                    <CardDescription>
                                        Bearbeite neue Anfragen von Kunden
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-5 py-4">
                                    <div className="max-h-[400px] overflow-y-auto">
                                {bookingRequests?.map((request: typeof bookingRequest.$inferSelect) => (
                                    <BookingRequestRender
                                        currentUserId={currentUser?.id}
                                        request={request}
                                        thisInserat={foundInserate.find((inserat) => inserat.id === request.inseratId)}
                                        key={request?.id || 1}
                                    />
                                ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="calendar" className="mt-2">
                        <Card className="dark:bg-[#222222] border-none shadow-lg">
                            <CardHeader className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                                <CardTitle className="text-lg font-semibold flex items-center dark:text-white">
                                    <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                                    Buchungskalender
                                </CardTitle>
                                <CardDescription>
                                    Überblick über alle Buchungen und Verfügbarkeiten
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-5 py-4">
                                <CalendarAndDetails
                                    foundInserate={foundInserate as any}
                                    involvedBookings={involvedBookings}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="add" className="mt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="dark:bg-[#222222] border-none shadow-lg">
                                <CardHeader className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                                    <CardTitle className="text-lg font-semibold flex items-center dark:text-white">
                                        <ClipboardEdit className="h-5 w-5 mr-2 text-emerald-500" />
                                        Neue Buchung hinzufügen
                                    </CardTitle>
                                    <CardDescription>
                                        Erstelle einen neuen Mietvertrag für ein Fahrzeug
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-5 py-4">
                                    <AddBooking
                                        foundInserate={foundInserate}
                                    />
                                </CardContent>
                            </Card>
                            
                            <Card className="dark:bg-[#222222] border-none shadow-lg">
                                <CardHeader className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                                    <CardTitle className="text-lg font-semibold flex items-center dark:text-white">
                                        <PanelRightClose className="h-5 w-5 mr-2 text-indigo-500" />
                                        Verfügbarkeit verwalten
                                    </CardTitle>
                                    <CardDescription>
                                        Definiere Zeiträume, in denen Fahrzeuge nicht verfügbar sind
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-5 py-4">
                                    <AddAvailability
                                        foundInserate={foundInserate}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="vehicles" className="mt-2">
                        <Card className="dark:bg-[#222222] border-none shadow-lg">
                            <CardHeader className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg font-semibold flex items-center dark:text-white">
                                            <TruckIcon className="h-5 w-5 mr-2 text-purple-500" />
                                            Fahrzeuge verwalten
                                        </CardTitle>
                                        <CardDescription>
                                            Verwalte deine Inserate und Fahrzeuge
                                        </CardDescription>
                                    </div>
                                    <div className="max-w-xs w-full">
                                        <SelectInserat
                                            foundInserate={foundInserate}
                                            selectChange={(inseratId) => { setThisInserat(foundInserate.find((inserat) => inserat.id === inseratId)) }}
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="px-5 py-4">
                                {selectedInserat?.multi && (
                                    <div className="mb-4 max-w-lg mx-auto">
                                        <SelectVehicle selectedInserat={selectedInserat} />
                                    </div>
                                )}
                                
                                <div className="flex gap-6 flex-col lg:flex-row">
                                    <div className="lg:w-3/5 w-full">
                                        <div className="w-full dark:bg-[#1a1a1a] bg-gray-50 rounded-md border border-gray-200 dark:border-gray-800">
                                            {searchParams?.vehicleId ? (
                                                <RenderedVehicle thisVehicle={thisVehicle} />
                                            ) : (
                                                thisInserat ? (
                                                    <RenderedInserat thisInserat={thisInserat} />
                                                ) : (
                                                    <div className="flex justify-center items-center py-32 text-sm text-gray-500 dark:text-gray-400">
                                                        <TruckIcon className="h-6 w-6 mr-2 opacity-40" />
                                                        Wähle ein Inserat aus...
                            </div>
                                                )
                                            )}
                    </div>
                </div>

                                    <div className="lg:w-2/5 w-full">
                                        <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-md border border-gray-200 dark:border-gray-800">
                                            <h3 className="text-base font-medium mb-3 flex items-center dark:text-white">
                                                <UserCheck2 className="h-4 w-4 mr-2 text-emerald-500" /> 
                                                Aktive Buchungen
                                            </h3>
                                            
                                            {thisInserat ? (
                                                thisInserat.bookings && thisInserat.bookings.length > 0 ? (
                                                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                                        {thisInserat.bookings.map((booking) => (
                                                            <div 
                                                                key={booking.id} 
                                                                className="p-2 bg-gray-50 dark:bg-[#222222] rounded-md border border-gray-100 dark:border-gray-800 text-sm"
                                                            >
                                                                <div className="font-medium dark:text-gray-200">{booking.name}</div>
                                                                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                                                                    <Calendar className="h-3 w-3 mr-1" />
                                                                    {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-sm text-center text-gray-500 dark:text-gray-400 py-6">
                                                        Keine aktiven Buchungen für dieses Inserat
                                                    </div>
                                                )
                                            ) : (
                                                <div className="text-sm text-center text-gray-500 dark:text-gray-400 py-6">
                                                    Wähle ein Inserat aus, um Buchungen anzuzeigen
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default ManageTab;