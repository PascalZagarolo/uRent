'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import NotificationUnauthorizedShortCut from "./notification-unauthorized";

interface LoginBarHeaderProps {
    foundNotifications : any;
}

const LoginBarHeader : React.FC<LoginBarHeaderProps> = ({
    foundNotifications
}) => {
    return (
        <div className="flex justify-start  items-center mt-4 mr-16">
            <div className="flex lg:gap-x-2">
                <div className="sm:block hidden">
                    <NotificationUnauthorizedShortCut 
                    foundNotifications={foundNotifications}
                    />
                </div>
            </div>
            <Button variant="ghost"  className="outline outline-offset-1 outline-1 mr-4 bg-white 
            drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)] border-2 border-gray-300
            dark:bg-slate-800 dark:border-none  dark:hover:bg-slate-700 dark:outline-none
            " asChild>
                <Link href="/login">
                    Anmelden
                </Link>
            </Button>
            <p className="text-gray-200 font-bold hidden 2xl:flex"> oder </p>
            <Button variant="ghost"  className=" 2xl:flex hidden outline outline-offset-1 outline-1 ml-4 bg-white 
            drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)] border-2 border-gray-300
            dark:bg-slate-800 dark:border-none dark:hover:bg-slate-700 dark:outline-none
            ">
                <Link href="/login">
                    Registrieren
                </Link>
            </Button>
        </div>
    );
}

export default LoginBarHeader;