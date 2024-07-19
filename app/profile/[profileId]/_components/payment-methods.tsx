import { Button } from "@/components/ui/button";
import ManagePaymentMethods from "./manage-payment-methods";
import { paymentMethods } from "@/db/schema";
import { BsPaypal } from "react-icons/bs";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";
import { CiCreditCard1 } from "react-icons/ci";
import { GiReceiveMoney } from "react-icons/gi";

interface PaymentMethodsProps {
    isOwn: boolean;
    thisPaymentMethods : typeof paymentMethods.$inferSelect;
    currentUserId : string;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
    isOwn,
    thisPaymentMethods,
    currentUserId
}) => {
    
    console.log(thisPaymentMethods)

    const linkedNothing = !thisPaymentMethods?.paypal && !thisPaymentMethods?.creditCard && !thisPaymentMethods?.barGeld;

    return (
        <div className="w-full dark:bg-[#191919] p-4">
            <div className="w-full">
                <div className="w-full">
                    <h3 className="w-full font-semibold text-sm flex items-center">
                        <div>
                        Zahlungsmethoden
                        </div>
                        {isOwn && (
                            <div className="ml-auto">
                                <ManagePaymentMethods
                                    thisPaymentMethods={thisPaymentMethods}
                                    currentUserId={currentUserId}
                                />
                            </div>
                        )}
                    </h3>
                    <div className="mt-2 grid grid-cols-4 gap-x-2">
                        {thisPaymentMethods?.paypal && (
                            <div className="dark:bg-[#1C1C1C] rounded-md p-2">
                                <div className="flex justify-center">
                                    <BsPaypal className="w-8 h-8" />
                                </div>
                                <Label className="flex justify-center mt-2 font-semibold text-sm">
                                    Paypal
                                </Label>
                            </div>
                        )}
                        {thisPaymentMethods?.creditCard && (
                            <div className="dark:bg-[#1C1C1C] rounded-md p-2">
                                <div className="flex justify-center">
                                    <CiCreditCard1 className="w-8 h-8" />
                                </div>
                                <Label className="flex justify-center mt-2 font-semibold text-sm">
                                    Kreditkarte
                                </Label>
                            </div>
                        )}
                        {thisPaymentMethods?.barGeld && (
                            <div className="dark:bg-[#1C1C1C] rounded-md p-2">
                                <div className="flex justify-center">
                                    <GiReceiveMoney className="w-8 h-8" />
                                </div>
                                <Label className="flex justify-center mt-2 font-semibold text-sm">
                                    Barzahlung
                                </Label>
                            </div>
                        )}

                    </div>
                    {!linkedNothing && (
                        <div className="mt-2 text-xs text-gray-200/60">
                        * uRent bietet keine Möglichkeit der direkten Zahlungsabwicklung. <br/>
                        Die Zahlung erfolgt direkt zwischen Mieter und Vermieter.
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PaymentMethods;