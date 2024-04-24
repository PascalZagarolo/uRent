'use client'


import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CalendarCheck2, UserIcon } from "lucide-react";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { FiCode } from "react-icons/fi";
import { RiVipDiamondLine } from "react-icons/ri";

const GenerateCode = () => {
    return (
        <div>
            <div>
                <h3 className="text-md font-semibold flex items-center"> <FiCode className="w-4 h-4 mr-2" />  Neuen Code generieren </h3>
            </div>
            <div> 

                <div className="w-full flex items-center mt-4 gap-x-8">
                    <div className="w-1/2">
                        <Label className="flex items-center"> <RiVipDiamondLine className="w-4 h-4 mr-2" />  Plan </Label>
                        <Select>
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
                        <Select>
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
                        <Select>
                            <SelectTrigger className="w-full dark:border-none dark:bg-[#0F0F0F] mt-2">
                                <SelectValue placeholder="Wieviele Monate?" />
                            </SelectTrigger>
                            <SelectContent className="dark:border-none dark:bg-[#191919]">
                                <SelectItem value="BASIS">Basis</SelectItem>
                                <SelectItem value="PREMIUM">Premium</SelectItem>
                                <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-1/2">
                    <Label className="flex items-center"> <UserIcon className="w-4 h-4 mr-2" />  Anzahl Nutzer </Label>
                        <Select>
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

            </div>
        </div>
    );
}

export default GenerateCode;