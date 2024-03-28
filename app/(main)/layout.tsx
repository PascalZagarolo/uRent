import { Truck } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import HeaderRedirect from "./_components/logo-redirect";


const LoginLayout = async (
    { children }: { children: React.ReactNode }
) => {



    return (
        <div className="min-w-screen min-h-screen flex flex-col  dark:bg-[#0F0F0F]">
    <div>
    <div className="bg-[#1f2332] h-[90px]  flex-shrink-1 hidden sm:block">
            <div className="flex 2xl:justify-start md:justify-evenly">
                <HeaderRedirect />

                <div className="flex w-full">
                   
                    
                </div>
            </div>





        </div>
    </div>


    <div className="mt-8 flex-grow h-full items-center">
       
        {children}
        
    </div>
</div>

    );
}

export default LoginLayout;