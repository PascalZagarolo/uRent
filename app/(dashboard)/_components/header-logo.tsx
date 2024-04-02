'use client'


import LoginBarHeader from "./login-bar-header";

import { useSession } from "next-auth/react";





import Inserat from "./add-inserat";
import SearchItem from "./search-item";

import { Truck } from "lucide-react";
import { useRouter } from "next/navigation";


import { cn } from "@/lib/utils";

import MobileFilterSheet from "./mobile-filter-sheet";
import LocationBar from "./location-bar";

import LoggedInBarHeader from "./logged-in-header";
import { users } from "@/db/schema";



interface HeaderProps {
    currentUser: typeof users.$inferSelect;
    
}

const Header: React.FC<HeaderProps> = ({
    currentUser,
    
}) => {


    
    const { data: session, status } = useSession();

    const router = useRouter();

   

    return (
        <div className="bg-[#1f2332] h-[90px]  flex-shrink-1 hidden sm:block">
            <div className="flex 2xl:justify-start md:justify-evenly">
                <a className="flex justify-start items-center py-6 ml-8 sm:text-3xl font-semibold text-white hover:cursor-pointer" href="/">
                <Truck className="sm:ml-1 mr-2" />
                    <div className="text-[#3e466c]  font-font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">u</div>
                    <p className="text-[#eaebf0]  ">Rent</p>
                </a>

                <div className="flex w-full">
                    <div className={cn("flex items-center justify-center ", status === 'authenticated' ? "ml-auto" : "w-full")}>
                        <div className="2xl:mr-32 items-center sm:mr-8">

                            {status === 'authenticated' && currentUser && (
                                <Inserat
                                    currentUser={currentUser}
                                />
                            )}
                        </div>
                        <div className="p-4 xl:hidden flex rounded-md mt-2  items-center">
                            <MobileFilterSheet />
                        </div>
                        <div className="flex justify-center mt-2">
                            <SearchItem />
                        </div>
                        <div className="flex justify-center">

                        <LocationBar />
                        </div>
                    </div>
                    {
                        status === 'unauthenticated' || !currentUser ? (
                            <LoginBarHeader/>
                        ) : (
                            <div className="items-center flex ml-auto mr-8">
                                <LoggedInBarHeader
                                    currentUser={currentUser}
                                    
                                />

                            </div>
                        )
                    }
                </div>
            </div>





        </div>
    );
}

export default Header;