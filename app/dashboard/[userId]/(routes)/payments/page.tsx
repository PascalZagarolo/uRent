
import BreadCrumpPage from "../../_components/bread-crump-page";
import MenuBar from "../../_components/menu-bar";

import { BiCreditCardAlt } from "react-icons/bi";
import db from "@/db/drizzle";
import { and, count, eq, sql } from "drizzle-orm";
import { inserat, userTable, userSubscription } from "@/db/schema";
import getCurrentUser from "@/actions/getCurrentUser";

import SubscriptionsRenderList from "./_components/subscriptions-render-list";

import { stripe } from "@/lib/stripe";
import { format } from "date-fns";
import RenderAvailable from "./_components/render-available";



const PaymentsPage = async () => {

    const currentUser = await getCurrentUser();
    

    const usedId = currentUser.id;

    const findSubscription = db.query.userTable.findFirst({
        where: (
            eq(userTable.id, sql.placeholder("usedId"))
        ), with: {
            subscription: true
        }
    }).prepare("findSubscription")

    const existingSubscription = await findSubscription.execute({usedId : usedId});

    

    let retrievedSubscription;

    if(existingSubscription.subscription?.stripe_subscription_id) {
        retrievedSubscription = await stripe.subscriptions.retrieve(
            existingSubscription?.subscription?.stripe_subscription_id
        )
    }




    const countInserate = await db.select({ count: count() })
        .from(inserat)
        .where(
            and(
                eq(inserat.userId, currentUser.id),
                eq(inserat.isPublished, true)
            )
        )

        

    return (
        <div className="flex justify-center sm:py-8 sm:px-4  ">

            <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="min-h-screen w-full">
                    <div>
                        <MenuBar />
                        <div>
                            <BreadCrumpPage />
                        </div>
                    </div>
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
                                countedInserate={countInserate[0]?.count}
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
                                    subscriptions={existingSubscription}
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentsPage;