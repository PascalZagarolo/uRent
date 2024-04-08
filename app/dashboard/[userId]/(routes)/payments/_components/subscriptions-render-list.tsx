import { inserat } from "@/db/schema";
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

interface SubscriptionsRenderListProps {
    subscriptions: typeof inserat.$inferSelect[]
}

const SubscriptionsRenderList: React.FC<SubscriptionsRenderListProps> = ({
    subscriptions
}) => {

    const currentDate = new Date();

    return (
        <div>
            <h1 className="text-md font-semibold">
                Laufende Abonnements
            </h1>
            <div className="mt-2">
                {subscriptions.length === 0 && (
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
                                <TableHead className="">Inserat</TableHead>
                                <TableHead>Ablaufdatum</TableHead>
                                <TableHead>Verwalten</TableHead>
                                <TableHead></TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead className="text-right">Kosten</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscriptions.map((subscription) => (
                                <TableRow>
                                    <TableCell className="font-medium">{subscription.id}</TableCell>
                                    <TableCell className="font-bold max-w-[160px] truncate">{subscription.title}</TableCell>
                                    <TableCell>{format(new Date(subscription.inseratSubscription?.stripe_current_period_end),
                                        "dd.MM.yy", { locale: de })} 
                                        {
                                            new Date(subscription.inseratSubscription?.stripe_current_period_end) < currentDate && (
                                                <span className="text-red-600"> (Abgelaufen)</span>
                                            )
                                        }
                                        </TableCell>
                                    <TableCell>
                                    <div className="hover:underline hover:cursor-pointer">
                                            Abo verwalten
                                        </div>
                                    </TableCell>
                                    
                                    <TableCell>
                                       {subscription.inseratSubscription?.subscriptionType !== "ENTERPRISE" && (
                                        <div className="hover:underline hover:cursor-pointer">
                                            Upgraden
                                        </div>
                                       )}
                                    </TableCell>
                                    <TableCell className="text-indigo-800 font-bold">
                                        {subscription.inseratSubscription?.subscriptionType}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {
                                            {
                                                "BASIC": "25 €",
                                                "PREMIUM": "39 €",
                                                "ENTERPRISE": "49 €",
                                            }[subscription.inseratSubscription?.subscriptionType]
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionsRenderList;