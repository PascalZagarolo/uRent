'use client'

import { format } from "date-fns";
import ExistingInvoices from "../(routes)/payments/_components/existing-invoices";
import SubscriptionsRenderList from "../(routes)/payments/_components/subscriptions-render-list";
import RenderAvailable from "../(routes)/payments/_components/render-available";
import { BiCreditCardAlt } from "react-icons/bi";
import { userTable } from "@/db/schema";
import InvoiceTable from "../(routes)/payments/_components/invoice-table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import CheckPreviousSubscription from "../_components/check-previous-subscription";

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


    const correctInvoices = existingInvoices?.data?.filter((invoice) => {
        const unitAmount = invoice?.lines?.data[0]?.price?.unit_amount;
        return unitAmount !== undefined;
    }) ?? null


    return (
        <div className="flex flex-col  sm:py-8 sm:px-4  ">


            <div className="sm:p-4 p-2 mt-4 w-full rounded-lg h-full">
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
                                {existingSubscription?.subscription?.isGift && (
                                    <div className="ml-2 text-sm">
                                        (Eingelöstes Abo)
                                        <Popover>
                                            <PopoverTrigger>
                                                <InfoCircledIcon
                                                    className="w-4 h-4 ml-2"
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent className="dark:border-none dark:bg-[#222222] shadow-lg">
                                                <div>
                                                    <div>
                                                        <h3 className="text-base text-gray-200 font-semibold underline">
                                                            Informationen zu deinem Abonnement
                                                        </h3>
                                                    </div>
                                                    <div className="text-sm mt-2 text-gray-200/80">
                                                        Bei deinem Abo handelt es sich um ein eingelöstes Abo. <br />
                                                        Das bedeutet, dass du dieses Abo nicht gekauft, sondern über einen Promo-Code eingelöst hast. <br />
                                                        Es kann demnach also nicht automatisch verlängert werden.
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                )}
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
                                existingSubscription?.subscription?.isGift ? (
                                    <div className="font-semibold text-indigo-600 gap-x-1 flex flex-col  text-sm">
                                        Eingelöstes Abonnement
                                        <div className="text-gray-200 text-xs">
                                            (läuft ab am: {format(new Date(existingSubscription?.subscription.stripe_current_period_end),
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
                            invoiceSubscription={currentSubscription ? JSON.parse(JSON.stringify(currentSubscription)) : null}
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

                <div className="mt-16 mb-8 sm:mb-0">
                    <InvoiceTable
                        existingInvoices={correctInvoices}
                    />
                </div>

            </div>
            {!existingSubscription.subscription && (
                <div className="items-end justify-end mt-8">
                <CheckPreviousSubscription 
                userEmail={currentUser.email}
                />
            </div>
            )}
        </div>

    );
}

export default PaymentsTab;