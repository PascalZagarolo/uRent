import { connectExistingSubscription } from "@/actions/register/connect-existing-subscription";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CheckIcon, X, XCircleIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";



interface CheckPreviousSubscriptionProps {
    userEmail : string;
}


const CheckPreviousSubscription = ({
    userEmail
} : CheckPreviousSubscriptionProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [foundSoubscription, setFoundSubscription] = useState(false);
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const handleCheckSubscription = async () => {
        try {
            setIsLoading(true);
            setIsOpen(true);
            const foundResult = await connectExistingSubscription(userEmail as string);
            console.log(foundResult)
            if(foundResult?.success && foundResult?.latestSubscription != null) {
                setError(false);
                setSuccess(true);
            } else {
                setSuccess(false);
                setError(true);
            }
            
        } catch(e : any) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }


    if(isOpen) {
        return (
            <Dialog open={isOpen}
            onOpenChange={(e) => {
                setIsOpen(e);
            }}
            >
                <DialogContent className="dark:border-none dark:bg-[#191919]">
                    <div>
                        <div>
                            <h3 className="text-lg font-semibold">
                                Existierendes Abonnement verknüpfen
                            </h3>
                        </div>
                        <div className="mt-4">
                            {isLoading ? (
                                <div className="p-4 flex flex-row items-center justify-center">
                                    <ClipLoader size={40} color="#ffffff" />
                                </div>
                            ) : (
                                <div className="flex flex-col">

                                    <div>
                                        <div className="flex flex-row items-center justify-center">
                                            {(isSuccess && !isError) ? (
                                                <CheckIcon 
                                                className="w-12 h-12 text-green-500"
                                                />
                                            ) : 
                                            (
                                                <XCircleIcon 
                                                className="w-12 h-12 text-gray-200"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div className={cn("text-gray-200 font-semibold flex flex-row justify-center mt-4", isSuccess && "text-green-500", isError && "text-rose-600")}>
                                                {foundSoubscription ? (
                                                    "Abonnement gefunden"
                                                ) : (
                                                    "Es wurden keine vergangenen Abonnements gefunden"
                                                )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }


    return (
        <div>
            <Accordion type="single" collapsible  className="border-none">
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