import { CopyCheckIcon, MessageSquareIcon, Settings2Icon, UserIcon } from "lucide-react";
import { CiBank } from "react-icons/ci";
import { FaUserFriends, FaUserTie } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { MdOutlineEditCalendar, MdOutlineTipsAndUpdates } from "react-icons/md";

const FaqCategoryRender = () => {

    const categoryRender = (name, description, icons) => {
        return (
            <div className="flex flex-col items-center px-4 py-4 bg-[#191919] shadow-lg rounded-md w-3/4 justify-center hover:bg-[#181818] hover:cursor-pointer">
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

    const existingCategorys = [
        {
            title : "Mein Profil",
            description : "Wissenwertes über dein Profil",
            icons : <UserIcon className="w-6 h-6" />
        },
        {
            title : "Inserate",
            description : "Wie erstelle ich ein Inserat?",
            icons : <CopyCheckIcon className="w-6 h-6" />
        },
        {
            title : "Buchungen",
            description : "Alles Rund ums Buchungssystem",
            icons : <MdOutlineEditCalendar className="w-6 h-6" />
        },
        {
            title : "Chat",
            description : "Wie funktioniert das Chatsystem?",
            icons : <MessageSquareIcon className="w-6 h-6" />
        },
        {
            title : "Einstellungen",
            description : "Sicherheit, Privatsphäre und mehr..",
            icons : <Settings2Icon className="w-6 h-6" />
        },
        {
            title : "Zahlungsverkehr",
            description : "Rechnungen, Zahlungen und mehr..",
            icons : <CiBank className="w-6 h-6" />
        },
        {
            title : "Mieter",
            description : "Wissenswertes für Mieter",
            icons : <FaUserTie className="w-6 h-6"/>
        },
        {
            title : "Vermieter",
            description : "Wissenswertes für Vermieter",
            icons : <FaUserFriends className="w-6 h-6"/>
        },
        {
            title : "Benutzerhandbuch",
            description : "Tipps und Tricks für den optimalen Einstieg ins uRent Ökosystem",
            icons : <FiBookOpen  className="w-6 h-6" />
        }
    ]

    return ( 
        <div className="mt-4">
            <div className="flex flex-col">
                <div className="grid grid-cols-3 items-center gap-y-4 justify-center">
                    {existingCategorys.map((category, index) => (
                        <div className="w-full flex justify-center" key={index}> 
                    {categoryRender(category.title, category.description, category.icons)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default FaqCategoryRender;