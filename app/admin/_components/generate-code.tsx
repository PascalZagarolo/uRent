'use client'


import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import axios from "axios";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarCheck2, CalendarIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaBarcode, FaBusinessTime, FaSign, FaSortAmountUpAlt } from "react-icons/fa";
import { FiCode } from "react-icons/fi";
import { RiVipDiamondLine } from "react-icons/ri";

const GenerateCode = () => {
    const [currentName, setCurrentName] = useState(null);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [currentAmount, setCurrentAmount] = useState(null);
    const [currentDate, setCurrentDate] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentMonths, setCurrentMonths] = useState(null);
    const [customCode, setCustomeCode] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onCreate = async () => {
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

            console.log(currentDate)

            await axios.post('/api/giftcode', values)
                .then(() => {
                    router.refresh();
                    toast.success("Code wurde erfolgreich erstellt");
                })
        } catch {
            console.error("Error creating code");
            toast.error("Etwas ist schief gelaufen");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div>
                <h3 className="text-md font-semibold flex items-center"> <FiCode className="w-4 h-4 mr-2" />  Neuen Code generieren </h3>
            </div>
            <div>

            <div className="w-full flex items-center mt-4 gap-x-8">
                    <div className="w-1/2 pr-4">
                        <Label className="flex items-center"> <FaSign  className="w-4 h-4 mr-2" />  Name </Label>
                        <Input 
                        className="dark:border-none dark:bg-[#0F0F0F] mt-2"
                        placeholder="Noch kein Name angegeben"
                        onChange={(e) => setCurrentName(e.target.value)}
                        />
                    </div>
                    <div className="w-1/2">
                        <Label className="flex items-center"> <FaBusinessTime  className="w-4 h-4 mr-2" />  Dauer </Label>
                        <Select
                        onValueChange={(value) => setCurrentMonths(value)}
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
                </div>

                <div className="w-full flex items-center mt-4 gap-x-8">
                    <div className="w-1/2">
                        <Label className="flex items-center"> <RiVipDiamondLine className="w-4 h-4 mr-2" />  Plan </Label>
                        <Select
                        onValueChange={(value) => setCurrentPlan(value)}
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
                    <div className="w-1/2">
                        <Label className="flex items-center"> <FaSortAmountUpAlt className="w-4 h-4 mr-2" />  Anzahl Inserate </Label>
                        <Select
                        onValueChange={(value) => setCurrentAmount(value)}
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
                </div>

                <div className="w-full flex items-center mt-4 gap-x-8">
                    <div className="w-1/2">
                        <Label className="flex items-center"> <CalendarCheck2 className="w-4 h-4 mr-2" />  Zeitraum </Label>
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal mt-2 dark:border-none dark:bg-[#191919]",
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
                    <div className="w-1/2">
                        <Label className="flex items-center"> <UserIcon className="w-4 h-4 mr-2" />  Anzahl Nutzer </Label>
                        <Select
                        onValueChange={(value) => setCurrentUser(value)}
                        >
                            <SelectTrigger className="w-full dark:border-none dark:bg-[#0F0F0F] mt-2">
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
                </div>

                <div className="w-full flex items-center mt-4 gap-x-8">
                    <div className="w-1/2">
                        
                        <Label className="flex items-center"> <FaBarcode   className="w-4 h-4 mr-2" />  Eigener Code </Label>
                        <Input 
                        className="dark:border-none dark:bg-[#0F0F0F] mt-2"
                        placeholder="z.B. Sommer24"
                        onChange={(e) => setCustomeCode(e.target.value)}
                        />
                    </div>
                    
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
                    onClick={onCreate}
                     >
                        Code erstellen
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default GenerateCode;