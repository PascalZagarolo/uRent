'use client'

import { format } from "date-fns";
import ExistingInvoices from "../(routes)/payments/_components/existing-invoices";
import SubscriptionsRenderList from "../(routes)/payments/_components/subscriptions-render-list";
import RenderAvailable from "../(routes)/payments/_components/render-available";
import { BiCreditCardAlt } from "react-icons/bi";
import { userTable } from "@/db/schema";
import InvoiceTable from "../(routes)/payments/_components/invoice-table";

interface PaymentsTabProps {
    currentUser: typeof userTable.$inferSelect | any;
    existingInvoices: any
    retrievedSubscription: any
    existingPayments: any
}

const PaymentsTab = ({ currentUser, existingInvoices, retrievedSubscription, existingPayments }: PaymentsTabProps) => {

    const existingSubscription = currentUser;

    const stripeSubscription = existingInvoices?.data.filter((invoice: any) => existingSubscription?.subscription?.stripe_subscription_id)

    const currentSubscription = existingInvoices?.data.filter((invoice: any) => invoice?.metadata?.upgrade !== "true" && invoice?.metadata?.isUpgrade !== "true")

    console.log(currentSubscription)
    

    // const { subscriptionInvoices, upgradeInvoices } = existingInvoices.data.reduce(
    //     (result, invoice: any) => {
    //       if (invoice?.metadata?.isUpgrade === "true") {
    //         result.upgradeInvoices.push(invoice);
    //       } else {
    //         result.subscriptionInvoices.push(invoice);
    //       }
    //       return result;
    //     },
    //     { subscriptionInvoices: [], upgradeInvoices: [] } as { subscriptionInvoices: any[]; upgradeInvoices: any[] }
    //   );
      

    const correctInvoices = existingInvoices.data.filter((invoice) => {
        const unitAmount = invoice?.lines?.data[0]?.price?.unit_amount;
        return unitAmount !== undefined;
    })

    
    

    return (
        <div className="flex justify-center sm:py-8 sm:px-4  ">


            <div className="sm:p-4 p-2 mt-4 w-full rounded-lg ">
                <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center w-full">
                    <div className="w-2/3 flex">
                        <BiCreditCardAlt className="mr-4" /> Zahlungsverkehr
                    </div>
                </h3>

                <p className="text-xs dark:text-gray-200/60 ">
                    Behalte den Überblick über deine Zahlungen und Abonnements.
                    <br /> Hier kannst du deine Abonnements verwalten, einsehen und upgraden.
                </p>

                <div className="w-full sm:flex flex-row mt-8 sm:space-y-0 space-y-4">

                    <div className="sm:w-1/2 w-full">
                        <RenderAvailable
                            existingSubscription={existingSubscription}
                            countedInserate={currentUser.inserat.filter((inserat: any) => inserat.isPublished).length}
                        />
                    </div>

                    <div className="sm:w-1/2 w-full">
                        <h1 className="font-semibold">
                            Laufendes Abonnement
                        </h1>
                        <p className="text-xs dark:text-gray-200/60 ">
                            Dein laufender Plan.
                        </p>
                        {existingSubscription.subscription ? (
                            <div className="text-2xl font-semibold flex gap-x-1 mt-2">
                                <p className="font-semibold text-indigo-800">
                                    {existingSubscription?.subscription?.subscriptionType}
                                </p>
                            </div>
                        ) : (
                            <div className="text-2xl font-medium flex gap-x-1 mt-2">
                                Gratis
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full sm:flex flex-row mt-8">

                    <div className="sm:w-1/2 w-full">
                        <h1 className="font-semibold">
                            Abonnement Status
                        </h1>
                        <p className="text-xs dark:text-gray-200/60 ">
                            Gekündigt oder aktiv.
                        </p>
                        {existingSubscription.subscription ? (
                            retrievedSubscription?.cancel_at_period_end ? (
                                <div className="font-semibold text-rose-600 gap-x-1 flex items-center text-sm">
                                    Gekündigt
                                    <div className="text-gray-200 text-xs">
                                        (Endet am {format(new Date(existingSubscription?.subscription.stripe_current_period_end),
                                            "dd.MM.yyyy")})
                                    </div>
                                </div>
                            ) : (
                                <div className="font-semibold text-emerald-600 gap-x-1 flex items-center text-sm">
                                    Aktiv
                                    <div className="text-gray-200 text-xs">
                                        (wird verlängert am: {format(new Date(existingSubscription?.subscription.stripe_current_period_end),
                                            "dd.MM.yyyy")})
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className="text-2xl font-medium flex gap-x-1 mt-2">
                                Noch kein Plan ausgewählt
                            </div>
                        )}
                    </div>


                </div>

                <div className="mt-8">
                    {existingSubscription.subscription ? (
                        <SubscriptionsRenderList
                            subscriptions={existingSubscription as any}
                            invoiceSubscription={JSON.parse(JSON.stringify(currentSubscription))}
                        />
                    ) : (
                        <div>
                            <div className="text-sm dark:text-gray-200/70 gap-y-2">
                                <h3 className="text-lg dark:text-gray-200">
                                    Laufende Abonnements
                                </h3>
                                Keine laufenden Abonnements vorhanden..
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-16">
                    <InvoiceTable 
                    existingInvoices = {correctInvoices}
                    />
                </div>
            </div>
        </div>

    );
}

export default PaymentsTab;