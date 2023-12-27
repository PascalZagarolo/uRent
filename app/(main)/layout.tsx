import { getServerSession } from "next-auth";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginLayout = async (
    { children }: { children: React.ReactNode }
) => {

   

    return (
        <div className="w-full h-full">
            <div>

                <h3 className="font-semibold text-4xl flex justify-center mt-8">
                    
                        <Link href="/" className="flex ">
                            <p className="text-blue-800">u</p> Rent
                        </Link>
                    
                </h3>



            </div>
            <div className="mt-8">
                {
                    children
                }
            </div>

        </div>
    );
}

export default LoginLayout;