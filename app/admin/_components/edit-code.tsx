'use client'


import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { giftCode } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Pencil1Icon } from "@radix-ui/react-icons";
import axios from "axios";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarCheck2, CalendarIcon, CodeIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaBarcode, FaBusinessTime, FaSign, FaSortAmountUpAlt } from "react-icons/fa";
import { RiVipDiamondLine } from "react-icons/ri";



interface EditCodeProps {
    thisCode : typeof giftCode.$inferSelect
}

const EditCode : React.FC<EditCodeProps> = ({
    thisCode
}) => {

    const [currentName, setCurrentName] = useState(thisCode?.name);
    const [currentPlan, setCurrentPlan] = useState<string>(thisCode?.plan);
    const [currentAmount, setCurrentAmount] = useState<string | number>(thisCode?.inseratAmount);
    const [currentDate, setCurrentDate] = useState(thisCode?.expirationDate);
    const [currentUser, setCurrentUser] = useState<string | number>(thisCode?.userAmount);
    const [currentMonths, setCurrentMonths] = useState<string | number>(thisCode?.months);
    const [customCode, setCustomeCode] = useState(thisCode?.code);

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onSave = async () => {
        try {
            setIsLoading(true);

            const values = {
                name : currentName,
                plan : currentPlan,
                inseratAmount : currentAmount,
                availableAmount : currentUser,
                expirationDate : currentDate,
                months : currentMonths,
                userAmount : currentUser,
                ...customCode && { customCode : customCode } 
            }

            await axios.patch(`/api/giftcode/${thisCode.id}`, values)
                .then(() => {
                    router.refresh();
                    toast.success("Code erfolgreich geändert")
                })
        } catch(error : any) {
            toast.error("Fehler beim speichern des Codes");
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <Dialog>
            <DialogTrigger asChild>
            <Pencil1Icon className="w-4 h-4  hover:cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#191919]">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-md font-semibold flex items-center">
                          <CodeIcon className="w-4 h-4 mr-2" />  Code ändern
                        </h3>
                        <p className="text-xs dark:text-gray-200/70">
                            Bearbeite deinen Gutscheincode.
                        </p>
                    </div>

                    <div>
                    <Label className="flex items-center"> <FaSign  className="w-4 h-4 mr-2" />  Name </Label>
                        <Input 
                        className="dark:border-none dark:bg-[#0F0F0F] mt-2"
                        placeholder="Noch kein Name angegeben"
                        onChange={(e) => setCurrentName(e.target.value)}
                        value={currentName}
                        />
                    </div>

                    <div>
                    <Label className="flex items-center"> <FaBusinessTime  className="w-4 h-4 mr-2" />  Dauer </Label>
                        <Select
                        onValueChange={(value) => setCurrentMonths(value)}
                        value={String(currentMonths)}
                        >
                            <SelectTrigger className="w-full dark:border-none dark:bg-[#0F0F0F] mt-2">
                                <SelectValue placeholder="Wähle die gewünschte Dauer" />
                            </SelectTrigger>
                            <SelectContent className="dark:border-none dark:bg-[#191919]">
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="6">6</SelectItem>
                                
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                    <Label className="flex items-center"> <RiVipDiamondLine className="w-4 h-4 mr-2" />  Plan </Label>
                        <Select
                        onValueChange={(value) => setCurrentPlan(value)}
                        value={currentPlan}
                        >
                            <SelectTrigger className="w-full dark:border-none dark:bg-[#0F0F0F] mt-2">
                                <SelectValue placeholder="Wähle den gewünschten Plan" />
                            </SelectTrigger>
                            <SelectContent className="dark:border-none dark:bg-[#191919]">
                                <SelectItem value="BASIS">Basis</SelectItem>
                                <SelectItem value="PREMIUM">Premium</SelectItem>
                                <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                    <Label className="flex items-center"> <FaSortAmountUpAlt className="w-4 h-4 mr-2" />  Anzahl Inserate </Label>
                        <Select
                        
                        onValueChange={(value) => setCurrentAmount(value)}
                        value={String(currentAmount)}
                        >
                            <SelectTrigger className="w-full dark:border-none dark:bg-[#0F0F0F] mt-2">
                                <SelectValue placeholder="Wieviele Inserate" />
                            </SelectTrigger>
                            <SelectContent className="dark:border-none dark:bg-[#191919]">
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="40">40</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                    <Label className="flex items-center"> <CalendarCheck2 className="w-4 h-4 mr-2" />  Zeitraum </Label>
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal mt-2 dark:border-none dark:bg-[#131313]",
                                            !currentDate && "text-muted-foreground"
                                        )}
                                    >
                                        {currentDate ? (
                                            format(currentDate, "PPP", { locale : de})
                                        ) : (
                                            <span>Wähle dein Datum</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>

                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 dark:border-none" align="start">
                                    <Calendar
                                        mode="single"
                                        className="dark:border-none dark:bg-[#191919]"
                                        selected={currentDate}
                                        onSelect={(date) => setCurrentDate(date)}
                                        disabled={(date) =>
                                            date < new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                    </div>

                    <div>
                    <Label className="flex items-center"> <UserIcon className="w-4 h-4 mr-2" />  Anzahl Nutzer </Label>
                        <Select
                        onValueChange={(value) => setCurrentUser(value)}
                        value={String(currentUser)}
                        >
                            <SelectTrigger className="w-full dark:border-none dark:bg-[#0F0F0F] mt-2"
                            value={currentUser}
                            >
                                <SelectValue placeholder="Wieviele Nutzer sollen den Code benutzen können?" />
                            </SelectTrigger>
                            <SelectContent className="dark:border-none dark:bg-[#191919]">
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                                <SelectItem value="250">250</SelectItem>
                                <SelectItem value="500">500</SelectItem>
                                <SelectItem value="1000">1000</SelectItem>
                                <SelectItem value="2500">2500</SelectItem>
                                <SelectItem value="5000">5000</SelectItem>
                                <SelectItem value="10000">10000</SelectItem>


                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                    <Label className="flex items-center"> <FaBarcode   className="w-4 h-4 mr-2" />  Eigener Code </Label>
                        <Input 
                        className="dark:border-none dark:bg-[#0F0F0F] mt-2"
                        placeholder="z.B. Sommer24"
                        onChange={(e) => setCustomeCode(e.target.value)}
                        value={customCode}
                        />
                    </div>
                    <div className="mt-4 w-full ml-auto flex justify-end">
                    <Button className="dark:bg-indigo-800 dark:hover:bg-indigo-900 dark:hover:text-gray-300
                     dark:text-gray-200 font-semibold"
                     disabled={isLoading ||
                        !currentPlan ||
                        !currentAmount ||
                        !currentDate ||
                        !currentUser || 
                        !currentMonths
                    }
                    onClick={onSave}
                     >
                        Änderungen speichern
                    </Button>
                </div>
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default EditCode;