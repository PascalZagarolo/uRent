import { CopyCheckIcon, UserIcon } from "lucide-react";
import { CiBank } from "react-icons/ci";
import { MdOutlineEditCalendar } from "react-icons/md";

const FaqCategoryRender = () => {

    const categoryRender = (name, description, icons) => {
        return (
            <div className="flex flex-col items-center px-4 py-4 bg-[#191919] shadow-lg rounded-md w-3/4 justify-center hover:bg-[#181818] hover:cursor-pointer">
                <div>
                    {icons}
                </div>
                <div className="text-sm mt-2">
                    {name}
                </div>
            </div>
        )
    }

    const existingCategorys = [
        {
            title : "Mein Profil",
            description : "",
            icons : <UserIcon className="w-6 h-6" />
        },
        {
            title : "Inserate",
            description : "",
            icons : <CopyCheckIcon className="w-6 h-6" />
        },
        {
            title : "Buchungen",
            description : "",
            icons : <MdOutlineEditCalendar className="w-6 h-6" />
        },
        {
            title : "Zahlungsverkehr",
            description : "",
            icons : <CiBank className="w-6 h-6" />
        },
        {
            title : "Mieter",
            description : "",
            icons : ""
        },
        {
            title : "Vermieter",
            description : "",
            icons : ""
        }
    ]

    return ( 
        <div className="mt-4">
            <div className="flex flex-col">
                <div className="grid grid-cols-3 items-center gap-y-4 justify-center">
                    {existingCategorys.map((category, index) => (
                        <div className="w-full flex justify-center"> 
                    {categoryRender(category.title, category.description, category.icons)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default FaqCategoryRender;