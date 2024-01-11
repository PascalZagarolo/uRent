'use client';

import { ArrowRight, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";



interface DashboardOptionsProps {
    label : string;
    icon : LucideIcon;
    link : string;
    userId : string
}


const DashboardOptions: React.FC<DashboardOptionsProps> = ({
    label,
    icon : Icon,
    link,
    userId
}) => {

    const pathname = usePathname();

    const isActive = pathname.includes(link)

    const router = useRouter();

    const onPush = () => {
        if (isActive) {
            router.push(
                `/dashboard/${userId}`
            )
        } else {
            router.push(
                `/dashboard/${userId}/${link}`
            )
        }
    }

    return ( 
        <div className="mt-6 flex ml-4 hover:cursor-pointer" onClick={onPush}>
            { isActive && (
                <ArrowRight
                className="h-4 w-4 text-[#44448e]"
                />
            )}
            <div className="flex ml-4 justify-center">
                <p>
                    <Icon size={24} />
                </p>
                <p className="ml-4 text-sm font-semibold">
                    {label}
                </p>
               
            </div>
           
        </div>
     );
}
 
export default DashboardOptions;