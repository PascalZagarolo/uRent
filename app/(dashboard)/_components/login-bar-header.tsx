'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";



const LoginBarHeader = () => {
    return (
        <div className="flex justify-start  items-center mt-4 mr-16">
            <Button variant="ghost"  className="outline outline-offset-1 outline-1 mr-4 bg-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border-2 border-gray-300" asChild>
                <Link href="/login">
                    Anmelden
                </Link>
            </Button>
            <p className="text-gray-200 font-bold hidden 2xl:flex"> oder </p>
            <Button variant="ghost"  className=" 2xl:flex hidden outline outline-offset-1 outline-1 ml-4 bg-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border-2 border-gray-300">
                <Link href="/register">
                    Registrieren
                </Link>
            </Button>
        </div>
    );
}

export default LoginBarHeader;