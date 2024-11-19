import { connectExistingSubscription } from "@/actions/register/connect-existing-subscription";
import { connectSubscription } from "@/actions/user/connect-subscription";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CheckIcon, X, XCircleIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";




interface CheckPreviousSubscriptionProps {
    userEmail: string;
}


const CheckPreviousSubscription = ({
    userEmail
}: CheckPreviousSubscriptionProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [foundSubscription, setFoundSubscription] = useState(null);
    const [foundProduct, setFoundProduct] = useState(null);
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const router = useRouter();

    const handleCheckSubscription = async () => {
        try {
            setIsLoading(true);
            setIsOpen(true);
            const foundResult = await connectExistingSubscription(userEmail as string);

            if (foundResult?.success && foundResult?.latestSubscription != null) {
                setError(false);
                setSuccess(true);
                setFoundProduct(foundResult?.product ?? null);
                setFoundSubscription(foundResult?.latestSubscription[0] ?? null);
            } else {
                setSuccess(false);
                setError(true);
            }

        } catch (e: any) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    const onConnect = async () => {
        try {
            setIsLoading(true);
            const response = await connectSubscription(userEmail as string, foundSubscription?.id as string);
            if (response?.success) {
                setIsOpen(false);
                toast.success('Abonnement erfolgreich verknüpft');
                router.refresh()
            }
        } catch (e: any) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    function convertUnixTimestamp(timestamp: number): string {
        // Convert the timestamp to milliseconds (as Date expects milliseconds)
        const date = new Date(timestamp * 1000);
        // Format it as a readable string
        return format(new Date(date), `dd. MMMM. yyyy`, { locale: de }) // Outputs as 'YYYY-MM-DD HH:MM:SS'
    }

    if (isOpen) {
        return (
            <Dialog open={isOpen}
                onOpenChange={(e) => {
                    setIsOpen(e);
                }}
            >
                <DialogContent className="dark:border-none dark:bg-[#191919]">
                    <div className=" rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-200">Existierendes Abonnement verknüpfen</h3>

                        {isLoading ? (
                            <div className="flex justify-center items-center p-6">
                                <ClipLoader size={40} color="#4B5563" />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex justify-center">
                                    {isSuccess && !isError ? (
                                        <CheckIcon className="w-12 h-12 text-green-500" />
                                    ) : (
                                        <XCircleIcon className="w-12 h-12 text-gray-400" />
                                    )}
                                </div>

                                <div className={`text-center text-lg font-bold ${isSuccess ? 'text-green-500' : isError ? 'text-red-500' : 'text-gray-500'}`}>
                                    {foundSubscription ? 'Abonnement gefunden' : 'Es wurden keine vergangenen Abonnements gefunden'}
                                </div>

                                {foundSubscription && (
                                    <div className="border-t border-gray-200 pt-4">

                                        <div className="text-lg font-semibold text-gray-200">
                                            {foundProduct?.name} - {foundProduct?.metadata?.amount} Inserat(e)
                                        </div>
                                        <div className="text-base text-gray-300">
                                            Eingelöst am {convertUnixTimestamp(foundSubscription?.created)}
                                        </div>
                                        <div className="text-base text-gray-300">
                                            Läuft ab am {convertUnixTimestamp(foundSubscription?.current_period_end)}
                                        </div>
                                        <div className="mt-4 flex flex-row justify-end">
                                            <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300"
                                                onClick={onConnect}
                                            >
                                                {isLoading ? (
                                                    <ClipLoader size={20} color="#4B5563" />
                                                ) : (
                                                    "Abonnement verknüpfen"
                                                )}
                                            </Button>
                                            <DialogTrigger>
                                                <Button className="text-gray-200 hover:text-gray-300" variant="ghost">
                                                    Abbrechen
                                                </Button>
                                            </DialogTrigger>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </DialogContent>
            </Dialog>
        )
    }


    return (
        <div>
            <Accordion type="single" collapsible className="border-none">
                <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="text-sm text-gray-200/60 border-none font-normal">
                        Du hattest bereits ein Abonnement bei uns, aber dein altes Konto gelöscht?
                    </AccordionTrigger>
                    <AccordionContent className="border-none">
                        <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300" onClick={handleCheckSubscription}>
                            Vergangene Abonnements verknüpfen
                        </Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default CheckPreviousSubscription;