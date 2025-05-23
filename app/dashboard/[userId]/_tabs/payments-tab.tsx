'use client'

import { format } from "date-fns";
import ExistingInvoices from "../(routes)/payments/_components/existing-invoices";
import SubscriptionsRenderList from "../(routes)/payments/_components/subscriptions-render-list";
import RenderAvailable from "../(routes)/payments/_components/render-available";
import { userTable } from "@/db/schema";
import InvoiceTable from "../(routes)/payments/_components/invoice-table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CheckPreviousSubscription from "../_components/check-previous-subscription";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, FileBarChart, InfoIcon, Receipt, Star, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaymentsTabProps {
    currentUser: typeof userTable.$inferSelect | any;
    existingInvoices: any;
    retrievedSubscription: any;
    existingPayments: any;
}

const PaymentsTab = ({ currentUser, existingInvoices, retrievedSubscription, existingPayments }: PaymentsTabProps) => {
    const existingSubscription = currentUser;
    const stripeSubscription = existingInvoices?.data?.filter((invoice: any) => existingSubscription?.subscription?.stripe_subscription_id);
    const currentSubscription = existingInvoices?.data?.filter((invoice: any) => invoice?.metadata?.upgrade !== "true" && invoice?.metadata?.isUpgrade !== "true");
    
    const correctInvoices = existingInvoices?.data?.filter((invoice) => {
        const unitAmount = invoice?.lines?.data[0]?.price?.unit_amount;
        return unitAmount !== undefined;
    }) ?? null;

    const subscriptionEndDate = existingSubscription?.subscription?.stripe_current_period_end 
        ? format(new Date(existingSubscription?.subscription?.stripe_current_period_end), "dd.MM.yyyy")
        : null;

    const getStatusBadge = () => {
        if (!existingSubscription.subscription) {
            return <Badge variant="outline" className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700">Kein Abonnement</Badge>;
        }
        
        if (retrievedSubscription?.cancel_at_period_end) {
            return <Badge variant="outline" className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/50">Gekündigt</Badge>;
        }
        
        if (existingSubscription?.subscription?.isGift) {
            return <Badge variant="outline" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">Geschenk</Badge>;
        }
        
        return <Badge variant="outline" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">Aktiv</Badge>;
    };

    return (
        <div className="max-w-[1600px] mx-auto p-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold flex items-center dark:text-white">
                        <CreditCard className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Zahlungen & Abonnements
                    </h1>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                        Behalte den Überblick über deine Zahlungen und verwalte deine Abonnements
                    </p>
                </div>
            </div>

            {/* Subscription Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Card className="dark:bg-[#222222] border-none shadow-lg">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Aktuelles Abonnement</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <Star className={cn(
                                "h-5 w-5",
                                existingSubscription?.subscription?.subscriptionType === "PREMIUM" ? "text-amber-500" :
                                existingSubscription?.subscription?.subscriptionType === "ENTERPRISE" ? "text-indigo-500" : 
                                "text-gray-400"
                            )} />
                            <span className="text-2xl font-bold dark:text-white">
                                {existingSubscription?.subscription?.subscriptionType || "FREE"}
                            </span>
                            {getStatusBadge()}
                        </div>
                        {existingSubscription?.subscription && (
                            <div className="mt-2 text-xs text-muted-foreground dark:text-gray-400">
                                {retrievedSubscription?.cancel_at_period_end
                                    ? `Endet am ${subscriptionEndDate}`
                                    : existingSubscription?.subscription?.isGift
                                        ? `Läuft ab am ${subscriptionEndDate}`
                                        : `Verlängerung am ${subscriptionEndDate}`
                                }
                            </div>
                        )}
                    </CardContent>
                </Card>
                
                <Card className="dark:bg-[#222222] border-none shadow-lg">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Zahlungsinformationen</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <Receipt className="h-5 w-5 text-indigo-500" />
                            <span className="text-lg font-bold dark:text-white">
                                {correctInvoices?.length || 0} Rechnungen
                            </span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground dark:text-gray-400">
                            {existingSubscription?.subscription 
                                ? `Letzte Zahlung: ${correctInvoices?.length ? format(new Date(correctInvoices[0]?.created * 1000), "dd.MM.yyyy") : "Keine"}`
                                : "Keine Zahlungen verfügbar"
                            }
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="dark:bg-[#222222] border-none shadow-lg sm:col-span-2 lg:col-span-1">
                    <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">Verfügbare Inserate</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <Tags className="h-5 w-5 text-indigo-500" />
                            <span className="text-lg font-bold dark:text-white">
                                {currentUser.inserat.filter((inserat: any) => inserat.isPublished).length} / {
                                    existingSubscription?.subscription?.subscriptionType === "PREMIUM" ? "10" :
                                    existingSubscription?.subscription?.subscriptionType === "ENTERPRISE" ? "Unbegrenzt" : "3"
                                }
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2.5 overflow-hidden">
                            <div 
                                className="bg-indigo-600 h-full rounded-full" 
                                style={{ 
                                    width: existingSubscription?.subscription?.subscriptionType === "ENTERPRISE" 
                                        ? '100%' 
                                        : `${Math.min(
                                            (currentUser.inserat.filter((inserat: any) => inserat.isPublished).length / 
                                            (existingSubscription?.subscription?.subscriptionType === "PREMIUM" ? 10 : 3)) * 100, 100
                                          )}%` 
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column */}
                <div className="lg:col-span-2">
                    {/* Subscription details */}
                    <Card className="dark:bg-[#222222] border-none shadow-lg mb-6">
                        <CardHeader className="pb-3 pt-5 border-b border-gray-100 dark:border-gray-800">
                            <CardTitle className="text-lg font-medium flex items-center dark:text-white">
                                <Star className="h-5 w-5 mr-2 text-indigo-500" />
                                Abonnementdetails
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                            {existingSubscription.subscription ? (
                                <SubscriptionsRenderList
                                    subscriptions={existingSubscription as any}
                                    invoiceSubscription={currentSubscription ? JSON.parse(JSON.stringify(currentSubscription)) : null}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <Star className="h-12 w-12 text-gray-300 dark:text-gray-700 mb-3" />
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Kein Abonnement aktiv</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-6">
                                        Upgrade auf einen Premium-Plan, um alle Vorteile zu nutzen und mehr Inserate zu veröffentlichen.
                                    </p>
                                    <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white">
                                        <Star className="h-4 w-4 mr-2" />
                                        Upgrade auf Premium
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    
                    {/* Invoices table */}
                    <Card className="dark:bg-[#222222] border-none shadow-lg">
                        <CardHeader className="pb-3 pt-5 border-b border-gray-100 dark:border-gray-800">
                            <CardTitle className="text-lg font-medium flex items-center dark:text-white">
                                <Receipt className="h-5 w-5 mr-2 text-indigo-500" />
                                Rechnungsübersicht
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                            <InvoiceTable
                                existingInvoices={correctInvoices}
                            />
                        </CardContent>
                    </Card>
                </div>
                
                {/* Right column */}
                <div>
                    {/* Available features */}
                    <Card className="dark:bg-[#222222] border-none shadow-lg mb-6">
                        <CardHeader className="pb-3 pt-5 border-b border-gray-100 dark:border-gray-800">
                            <CardTitle className="text-lg font-medium flex items-center dark:text-white">
                                <FileBarChart className="h-5 w-5 mr-2 text-indigo-500" />
                                Verfügbare Features
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                            <RenderAvailable
                                existingSubscription={existingSubscription}
                                countedInserate={currentUser.inserat.filter((inserat: any) => inserat.isPublished).length}
                            />
                        </CardContent>
                    </Card>
                    
                    {/* Gift subscription info */}
                    {existingSubscription?.subscription?.isGift && (
                        <Card className="dark:bg-[#222222] border-none shadow-lg mb-6">
                            <CardHeader className="pb-3 pt-5 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-medium flex items-center dark:text-white">
                                        <InfoIcon className="h-5 w-5 mr-2 text-amber-500" />
                                        Geschenk-Abo Information
                                    </CardTitle>
                                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                                        Geschenk
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-5">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Bei deinem Abo handelt es sich um ein eingelöstes Abo. Das bedeutet, dass du dieses Abo nicht gekauft, sondern über einen Promo-Code eingelöst hast.
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                    Es kann demnach also nicht automatisch verlängert werden und läuft am {subscriptionEndDate} ab.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                    
                    {/* Previous Subscription Check */}
                    {!existingSubscription.subscription && (
                        <Card className="dark:bg-[#222222] border-none shadow-lg">
                            <CardHeader className="pb-3 pt-5 border-b border-gray-100 dark:border-gray-800">
                                <CardTitle className="text-lg font-medium flex items-center dark:text-white">
                                    <CreditCard className="h-5 w-5 mr-2 text-indigo-500" />
                                    Vorheriges Abonnement
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5">
                                <CheckPreviousSubscription 
                                    userEmail={currentUser.email}
                                />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PaymentsTab;