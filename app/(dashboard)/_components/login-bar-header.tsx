'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";



const LoginBarHeader = () => {
    return (
        <div className="flex justify-start ml-20 items-center mt-4">
            <Button variant="ghost" size="sm" className="outline outline-offset-1 outline-1 mr-4" asChild>
                <Link href="/login">
                    Anmelden
                </Link>
            </Button>
            <p> oder </p>
            <Button variant="ghost" size="sm" className="outline outline-offset-1 outline-1 ml-4">
                <Link href="/register">
                    Registrieren
                </Link>
            </Button>
        </div>
    );
}

export default LoginBarHeader;