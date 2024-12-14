'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Start = () => {

    const router = useRouter()
    
    return ( 
        <div className="bg-[#222222] shadow-lg rounded-lg p-8">
            <div>
                <div className="flex flex-row items-center justify-center bg-[#222222]">

                </div>
                <h3 className="text-2xl font-semibold">
                    Worauf wartest du noch?
                </h3>
                <p className="text-gray-200/60 text-sm">
                    Teste uRent 3 Monate unverbindlich und überzeuge dich selbst! <br/>
                    Du musst keine Kreditkarte hinterlegen und erlebst den vollen Umfang.
                </p>
            </div>
            <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300 mt-2" onClick={() => {router.push("/register")}}>
            
                Jetzt kostenlos testen <ArrowRight className="w-4 h-4 ml-2" />
          
            </Button>
        </div>
     );
}
 
export default Start;