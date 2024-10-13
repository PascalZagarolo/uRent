'use client'

import { CopyCheckIcon, MessageSquareIcon, Settings2Icon, UserIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { CiBank } from "react-icons/ci";
import { FaUserFriends, FaUserTie } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { MdOutlineEditCalendar } from "react-icons/md";

const FaqCategoryRender = () => {

    const categoryRender = (name, description, icons, value) => {
        return (
            <div className="flex flex-col items-center px-4 py-4 bg-[#191919] shadow-lg rounded-md w-3/4 justify-center hover:bg-[#181818] hover:cursor-pointer"
            onClick={() => onClick(value)}>
                <div>
                    {icons}
                </div>
                <div className="text-sm mt-2 hover:underline">
                    {name}
                </div>
                <div className="text-xs text-gray-200/60 font-medium text-center mt-2 h-[40px]">
                    {description}
                </div>
            </div>
        )
    }

    const currentCategory = useSearchParams().get('category')


    const onClick = (usedCategory: string) => {
            const params = new URLSearchParams("")
            params.set('category', usedCategory)
            window.history.pushState(null, '', `?${params.toString()}`)
    }

    const existingCategorys = [
        {
            title : "Mein Profil",
            description : "Wissenwertes über dein Profil",
            icons : <UserIcon className="w-6 h-6" />,
            value : "profile"
        },
        {
            title : "Inserate",
            description : "Wie erstelle ich ein Inserat?",
            icons : <CopyCheckIcon className="w-6 h-6" />,
            value : "inserate"
        },
        {
            title : "Buchungen",
            description : "Alles Rund ums Buchungssystem",
            icons : <MdOutlineEditCalendar className="w-6 h-6" />,
            value : "bookings"
        },
        {
            title : "Chat",
            description : "Wie funktioniert das Chatsystem?",
            icons : <MessageSquareIcon className="w-6 h-6" />,
            value : "chat"
        },
        {
            title : "Einstellungen",
            description : "Sicherheit, Privatsphäre und mehr..",
            icons : <Settings2Icon className="w-6 h-6" />,
            value : "settings"
        },
        {
            title : "Zahlungsverkehr",
            description : "Rechnungen, Zahlungen und mehr..",
            icons : <CiBank className="w-6 h-6" />,
            value : "payments"
        },
        {
            title : "Mieter",
            description : "Wissenswertes für Mieter",
            icons : <FaUserTie className="w-6 h-6"/>,
            value : "mieter"
        },
        {
            title : "Vermieter",
            description : "Wissenswertes für Vermieter",
            icons : <FaUserFriends className="w-6 h-6"/>,
            value : "vermieter"
        },
        {
            title : "Benutzerhandbuch",
            description : "Tipps und Tricks für den optimalen Einstieg ins uRent Ökosystem",
            icons : <FiBookOpen  className="w-6 h-6" />,
            value : "benutzerhandbuch"
        }
    ]

    return ( 
        <div className="mt-4">
            <div className="flex flex-col">
                <div className="grid grid-cols-3 items-center gap-y-4 justify-center">
                    {existingCategorys.map((category, index) => (
                        <div className="w-full flex justify-center" key={index}> 
                    {categoryRender(category.title, category.description, category.icons, category.value)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default FaqCategoryRender;