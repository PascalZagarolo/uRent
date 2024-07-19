'use client'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { paymentMethods } from "@/db/schema";
import axios from "axios";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsPaypal } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";
import { GiReceiveMoney } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";

interface ManagePaymentMethodsProps {
    paymentMethods : typeof paymentMethods.$inferSelect;
}

const ManagePaymentMethods = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [acceptPaypal, setAcceptPaypal] = useState(paymentMethods.paypal);
    const [acceptCreditCard, setAcceptCreditCard] = useState(paymentMethods.creditCard);
    const [acceptCash, setAcceptCash] = useState(paymentMethods.barGeld);

    const router = useRouter();


    const onSave = () => {
        try {
            const values = {
                paypal : acceptPaypal,
                creditCard : acceptCreditCard,
                barGeld : acceptCash
            }

            axios.patch("...")
                .then(() => {
                    router.refresh();
                    toast.success("Änderungen gespeichert")
                })

        } catch(e : any) {
            console.log("Fehler beim speichern der Zahlungsmethoden");
            toast.error("Fehler beim speichern der Zahlung");
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="" asChild>
                <Button variant="ghost" size="sm" >
                    Zahlungsmethoden verwalten
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-[#131313] dark:border-none">
                <div className="w-full">
                    <div className="w-full ">
                        <div className="text-md font-semibold flex items-center gap-x-2">
                           <TbReportMoney className="w-4 h-4" /> Zahlungsmethoden verwalten
                        </div>
                        <p className="text-xs dark:text-gray-200/60">
                            Informiere Mieter wie sie dich bezahlen können.
                        </p>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div>
                            <h3 className="text-sm font-semibold">
                                Du akzeptierst..
                            </h3>
                        </div>
                        <div className="dark:bg-[#1c1c1c] p-4 rounded-md flex items-center space-x-4">
                            <div>
                                <Checkbox />
                            </div>
                            <div className="w-full">
                                <div>
                                    <div>
                                        <BsPaypal
                                         className="w-8 h-8"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-sm">
                                        Paypal
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="dark:bg-[#1c1c1c] p-4 rounded-md flex items-center space-x-4">
                            <div>
                                <Checkbox />
                            </div>
                            <div className="w-full">
                                <div>
                                    <div>
                                        <CiCreditCard1 
                                         className="w-8 h-8"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-sm">
                                        Kreditkarte
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="dark:bg-[#1c1c1c] p-4 rounded-md flex items-center space-x-4">
                            <div>
                                <Checkbox />
                            </div>
                            <div className="w-full">
                                <div>
                                    <div>
                                        <GiReceiveMoney  
                                         className="w-8 h-8"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-sm">
                                        Barzahlung
                                    </h3>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mt-2">
                        <Button className="w-full bg-indigo-800 text-gray-200 hover:text-gray-300 hover:bg-indigo-900">
                            Änderungen speichern
                        </Button>
                    </div>


                    <div className="mt-2 text-xs text-gray-200/60">
                        * uRent bietet keine Möglichkeit der direkten Zahlungsabwicklung. <br/>
                        Die Zahlung erfolgt direkt zwischen Mieter und Vermieter.
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ManagePaymentMethods;