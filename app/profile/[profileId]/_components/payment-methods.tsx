import { Button } from "@/components/ui/button";
import ManagePaymentMethods from "./manage-payment-methods";

interface PaymentMethodsProps {
    isOwn: boolean;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
    isOwn
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