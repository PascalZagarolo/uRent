'use client'


import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Banknote } from "lucide-react";

const PriceFormFilter = () => {
    return (
        <div>
            <h3 className="flex justify-start text-lg text-gray-100 items-center rounded-md border-2 border-black p-2">
                <Banknote className="mr-4"/> Preis
            </h3>
            <div className="flex gap-x-4 mt-4">
                <div >
                    <h3 className="text-sm  text-gray-300  mb-1">
                        Von :
                    </h3>
                    <Select>
                        <SelectTrigger className="w-[120px] font-semibold rounded-lg border-[#282c45]">
                            <SelectValue className="font-bold" placeholder="Start" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Startpreis</SelectLabel>
                                <SelectItem value="0" className="font-bold">0 €</SelectItem>
                                <SelectItem value="50" className="font-bold">50 €</SelectItem>
                                <SelectItem value="75" className="font-bold">75 €</SelectItem>
                                <SelectItem value="100" className="font-bold">100 €</SelectItem>
                                <SelectItem value="125" className="font-bold">125 €</SelectItem>
                                <SelectItem value="150" className="font-bold">150 €</SelectItem>
                                <SelectItem value="200" className="font-bold">200 €</SelectItem>
                                <SelectItem value="250" className="font-bold">250 €</SelectItem>
                                <SelectItem value="300" className="font-bold">300 €</SelectItem>
                                <SelectItem value="400" className="font-bold">400 €</SelectItem>
                                <SelectItem value="500" className="font-bold">500 €</SelectItem>
                                <SelectItem value="max" className="font-bold"> &lt; 500 €</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="">
                <h3 className="text-sm  text-gray-300 mb-1">
                        Bis :
                    </h3>
                <Select>
                        <SelectTrigger className="w-[120px] font-semibold rounded-lg border-2 border-[#282c45]">
                            <SelectValue placeholder="Endpreis" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                            <SelectLabel>Ende</SelectLabel>               
                                <SelectItem value="50" className="font-bold">50 €</SelectItem>
                                <SelectItem value="75" className="font-bold">75 €</SelectItem>
                                <SelectItem value="100" className="font-bold">100 €</SelectItem>
                                <SelectItem value="125" className="font-bold">125 €</SelectItem>
                                <SelectItem value="150" className="font-bold">150 €</SelectItem>
                                <SelectItem value="200" className="font-bold">200 €</SelectItem>
                                <SelectItem value="250" className="font-bold">250 €</SelectItem>
                                <SelectItem value="300" className="font-bold">300 €</SelectItem>
                                <SelectItem value="400" className="font-bold">400 €</SelectItem>
                                <SelectItem value="500" className="font-bold">500 €</SelectItem>
                                <SelectItem value="max" className="font-bold"> &lt; 500 €</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}

export default PriceFormFilter;