'use client'

import { inserat, inseratPriceType, userTable } from "@/db/schema";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { de } from "date-fns/locale";
import { format } from "date-fns";
import axios from "axios";

interface SubscriptionsRenderListProps {
    subscriptions: typeof userTable.$inferSelect | any;
    invoiceSubscription: any
}

const SubscriptionsRenderList: React.FC<SubscriptionsRenderListProps> = ({
    subscriptions,
    invoiceSubscription
}) => {

    const currentPrice = invoiceSubscription ? (invoiceSubscription[0]?.subtotal ?? 0) / 100 : null;

    const currentDate = new Date();

    const onAdvocateSubscription = async (usedId: string) => {
        try {
            const values = {}
            const res = await axios.patch(`/api/stripe/user/${usedId}`, values);
            window.location.href = res.data.url
        } catch (e: any) {
            console.log(e)
        }
    }

    let usedType: typeof inseratPriceType;

    return (
        <div>
            <h1 className="text-md font-semibold">
                Laufende Abonnements
            </h1>
            <div className="mt-2">
                {!subscriptions.subscription && (
                    <div className="text-sm dark:text-gray-200/70">
                        Keine laufenden Abonnements vorhanden..
                    </div>
                )}
                <div>
                    <Table>
                        <TableCaption className=" pb-8 sm:pt-0 sm:pb-0">Deine laufenden Abonnements, bei Unklarheiten kontaktiere uns unter support@urent-rental.de</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]">Abo-ID</TableHead>
                                <TableHead className="">Anz. Inserate</TableHead>
                                <TableHead>Ablaufdatum</TableHead>
                                <TableHead></TableHead>
                                <TableHead></TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead className="text-right">Kosten</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            <TableRow>
                                <TableCell className="font-medium">{subscriptions.subscription?.id}</TableCell>
                                <TableCell className="font-medium max-w-[160px] truncate">{subscriptions.subscription?.amount}</TableCell>
                                <TableCell>{format(new Date(subscriptions?.subscription?.stripe_current_period_end), "dd.MM.yyyy", { locale: de })}
                                    {
                                        new Date(subscriptions?.subscription?.stripe_current_period_end) < currentDate && (
                                            <span className="text-red-600"> (Abgelaufen)</span>
                                        )
                                    }
                                </TableCell>
                                <TableCell>
                                {!subscriptions.subscription.isGift && (
                                    <div className="hover:underline hover:cursor-pointer" onClick={() => { onAdvocateSubscription(subscriptions?.subscription?.userId) }}>
                                        Abo verwalten
                                    </div>
                                )}
                                </TableCell>

                                <TableCell>

                                    {!subscriptions.subscription.isGift && (
                                        <a className="hover:underline hover:cursor-pointer" href={`/pricing`}>
                                            Upgraden
                                        </a>

                                    )}
                                </TableCell>
                                <TableCell className="text-indigo-800 font-bold">
                                    {subscriptions.subscription?.subscriptionType}
                                </TableCell>
                                <TableCell className="text-right">
                                    {subscriptions.subscription.isGift ? (
                                        "(Gutscheincode)"
                                    ) : (
                                        `${currentPrice} €`
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionsRenderList;