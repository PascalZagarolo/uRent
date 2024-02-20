'use client'

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User } from "@prisma/client";
import { MessageCircleIcon, Settings, Settings2Icon, SettingsIcon, TrendingUp, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";


interface LoggedInBarHeaderProps {
    currentUser: User;
}

const LoggedInBarHeader: React.FC<LoggedInBarHeaderProps> = ({
    currentUser
}) => {

    const router = useRouter();


    const onClick = () => {
        router.push(`/profile/${currentUser.id}`);
    }

    const onDashboard = () => {
        router.push(`/dashboard/${currentUser.id}`)
    }

    const onMessages = () => {
        router.push(`/conversation`)
    }


    return (
        <div className="flex justify-start  items-center mt-2">
            <div className="  font-semibold mr-4 text-xs text-gray-200  hidden items-center 2xl:flex">
                🎉 Willkommen zurück
                <p className="ml-1 font-bold hidden 2xl:flex  text-gray-100 mr-2">{currentUser.name.toUpperCase() || ""}</p> 🎉
            </div>

            <Popover>
                <PopoverTrigger>
                    <img
                        src={currentUser.image || "/placeholder-person.jpg"}
                        className="w-[40px] h-[40px] rounded-full border-gray-100 border"
                        
                    />
                </PopoverTrigger>
                <PopoverContent className="dark:bg-[#0F0F0F] dark:text-gray-100">
                    <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                        border-2 border-gray-300   w-full dark:bg-[#1b1b1b] dark:hover:bg-[#171717] flex justify-start"
                        onClick={onClick}
                        >
                            <UserIcon className="mr-4 w-6 h-6" />
                            <p>
                                Mein Profil
                            </p>
                    </Button>

                    <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                        border-2 border-gray-300   w-full dark:bg-[#1b1b1b] dark:hover:bg-[#171717] flex justify-start mt-2"
                        onClick={onDashboard}
                        >
                            <TrendingUp className="mr-4" />
                            <p>
                                Dashboard
                            </p>
                    </Button>

                    <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                        border-2 border-gray-300   w-full dark:bg-[#1b1b1b] dark:hover:bg-[#171717] flex justify-start mt-2"
                        onClick={onMessages}
                        >
                            <MessageCircleIcon className="mr-4" />
                            <p>
                                Nachrichten
                            </p>
                    </Button>
                </PopoverContent>
            </Popover>

            

        </div>
    );
}

export default LoggedInBarHeader;