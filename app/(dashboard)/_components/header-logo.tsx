'use client'

import { Button } from "@/components/ui/button";
import LoginBarHeader from "./login-bar-header";
import Link from "next/link";

const Header = () => {
    return ( 
        <div className="flex justify-center  w-full items-center">
            <Button variant="ghost">
                <Link href="/">
                <h3 className="text-4xl flex justify-center mt-4 font-semibold"> 
                <p className="text-blue-800 font-bold">u</p> Rent
            </h3>
                </Link>
            </Button>
            
            <div className="items-center">
                <LoginBarHeader/>
            </div>
        </div>
     );
}
 
export default Header;