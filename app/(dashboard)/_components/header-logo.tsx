'use client'

import { Button } from "@/components/ui/button";
import LoginBarHeader from "./login-bar-header";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoggedInBarHeader from "./logged-in-header";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import DashboardLayout from "../layout";
import DashboardLink from "./dashboard-link";
import Inserat from "./add-inserat";
import SearchItem from "./search-item";
import LocationBar from "./location-bar";

interface HeaderProps {
    currentUser: User;
}

const Header: React.FC<HeaderProps> = ({
    currentUser
}) => {

    const { data: session, status } = useSession();




    return (
        <div className=" bg-[#303655] h-[80px]">
            <div className="flex justify-between">
                <h3 className="flex justify-start items-center py-6 ml-8 text-2xl font-semibold text-white">
                    <p className="text-blue-100 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">u</p>Rent
                </h3>
                <div className="flex">
                    <div className="flex items-center">
                        <div className="mr-32 items-center">
                            <Inserat
                                currentUser={currentUser}
                            />
                        </div>

                        <div className="flex justify-center">
                            <SearchItem />
                        </div>
                        <div className="flex justify-center">
                            <LocationBar />
                        </div>
                    </div>
                    {
                        status === 'unauthenticated' ? (
                            <LoginBarHeader

                            />
                        ) : (
                            <div className="flex items-center justify-center mr-16">
                                <LoggedInBarHeader
                                    currentUser={currentUser}
                                />
                                <DashboardLink
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