import { connectExistingSubscription } from "@/actions/register/connect-existing-subscription";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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

    const handleCheckSubscription = async () => {
        try {
            setIsLoading(true);
            setIsOpen(true);
            const foundResult = await connectExistingSubscription(userEmail as string);
            console.log(foundResult);
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
                                <ClipLoader size={40} color="#ffffff" />
                            ) : (
                                <div>
                                    1
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