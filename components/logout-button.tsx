'use client'


import { signOut } from "@/actions/signout";
import { Button } from "./ui/button";
import { ArrowRight, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LogOutButton = () => {

    const router = useRouter();

    const onAction = async () => {
        try {
            console.log('signing out')
            await signOut();
            router.push('/login');
        } catch(error) {
            toast.error(error)
        }
    }

    return ( 
        <>
            <Button className="hidden bg-[#e1dfdf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 2xl:block border-2 border-gray-900
            dark:bg-slate-800 dark:border-none dark:text-gray-100
            " variant="ghost" onClick={() => {
                console.log('signing out')
            }}>
            <p className="hidden lg:block">Abmelden</p>
            
        </Button>
        <p className="2xl:hidden mr-2 text-white hover:cursor-pointer"> <LogOut/> </p>
        </>
        


     );
}
 
export default LogOutButton;