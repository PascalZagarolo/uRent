import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { BsPaypal } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";
import { GiReceiveMoney } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";

const ManagePaymentMethods = () => {
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