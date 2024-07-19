import { Button } from "@/components/ui/button";
import ManagePaymentMethods from "./manage-payment-methods";
import { paymentMethods } from "@/db/schema";

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
                </div>
            </div>
        </div>
    );
}

export default PaymentMethods;