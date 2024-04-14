'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IoMdGift } from "react-icons/io";


const RedeemCode = () => {

    const [usedCode, setUsedCode] = useState("");

    return ( 
        <div className="sm:w-1/4">
            <h1 className="text-sm font-semibold flex items-center">
            <IoMdGift className="w-4 h-4 mr-2" />  Code einlösen
            </h1>
            <div className="w-full mt-2">
                <Input 
                 placeholder="XXXX-XXXX-XXXX-XXXX"
                 className="dark:border-none dark:bg-[#171717]"
                 onChange={(e) => {
                    setUsedCode(e.target.value);
                 }}
                />
            </div>
            <div className="ml-auto flex justify-end">
                <Button className="" size="sm"
                 variant="ghost" disabled={!usedCode}>
                    Einlösen
                </Button>
            </div>
        </div>
     );
}
 
export default RedeemCode;