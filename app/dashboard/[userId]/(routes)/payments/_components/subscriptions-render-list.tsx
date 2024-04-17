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
    subscriptions: typeof userTable.$inferSelect;
}

const SubscriptionsRenderList: React.FC<SubscriptionsRenderListProps> = ({
    subscriptions
}) => {

    const currentDate = new Date();

    const onAdvocateSubscription = async (usedId : string) => {
        try {
            const values = {
                
            }
        const res = await axios.patch(`/api/stripe/user/${usedId}`, values);
            window.location.href = res.data.url
        } catch {
            console.log("error")
        }
    }

    let usedType : typeof inseratPriceType;

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
                        <TableCaption>Deine laufenden Abonnements, bei Unklarheiten kontaktiere uns unter support@urent-rental.de</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]">Invoice</TableHead>
                                <TableHead className="">Anz. Inserate</TableHead>
                                <TableHead>Ablaufdatum</TableHead>
                                <TableHead>Verwalten</TableHead>
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
                                    <div className="hover:underline hover:cursor-pointer" onClick={() => 
                                        {onAdvocateSubscription(subscriptions?.subscription?.userId)}}>
                                            Abo verwalten
                                        </div>
                                    </TableCell>
                                    
                                    <TableCell>
                                       
                                        <a className="hover:underline hover:cursor-pointer" href={`/pricing`}>
                                            Upgraden
                                        </a>
                                    
                                    </TableCell>
                                    <TableCell className="text-indigo-800 font-bold">
                                        {subscriptions.subscription?.subscriptionType}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {
                                            {
                                                "BASIS": "25 €",
                                                "PREMIUM": "39 €",
                                                "ENTERPRISE": "49 €",
                                                //@ts-ignore
                                            }[usedType]
                                        }
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