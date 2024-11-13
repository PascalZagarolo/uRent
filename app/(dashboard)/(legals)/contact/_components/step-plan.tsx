'use client'

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

const StepPlan = () => {
    
    
    const router = useRouter();
    




    return (
        <div className="space-y-4">
    <div className="text-xl font-bold text-gray-100">
        Nicht gefunden wonach du suchst?
    </div>
    
    <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 w-full">
        {/* Card Component */}
        <div className="bg-[#1e1e1e] shadow-md hover:shadow-lg transition-transform transform hover:scale-105 rounded-lg w-full md:w-1/3">
            <img 
                src="https://res.cloudinary.com/df1vnhnzp/image/upload/v1731527499/jvx4phcwwg6lsge3h2eo.jpg"
                alt="FAQ Search"
                className="object-cover h-52 w-full rounded-t-lg"
            />
            <div className="p-5">
                <h3 className="text-lg font-semibold text-white">
                    FAQs durchsuchen
                </h3>
                <p className="text-sm text-gray-400 mt-2 h-24">
                    Manchmal kann es sein, dass deine Frage bereits beantwortet wurde. Oft gestellte Fragen werden in unseren FAQs beantwortet.
                </p>
                <div className="mt-2">
                    <Button className="bg-[#383838] hover:bg-[#4a4a4a] shadow-md hover:shadow-lg transition rounded-md text-white flex items-center space-x-2"
                    onClick={() => router.push("/faqs")}
                    >
                        <span>Zu den FAQs</span> 
                        <ArrowUpRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>

        {/* Card Component */}
        <div className="bg-[#1e1e1e] shadow-md hover:shadow-lg transition-transform transform hover:scale-105 rounded-lg w-full md:w-1/3">
            <img 
                src="https://res.cloudinary.com/df1vnhnzp/image/upload/v1731527716/tfdnx0w0f0gep26iwgfi.jpg"
                alt="About Us"
                className="object-cover h-52 w-full rounded-t-lg"
            />
            <div className="p-5">
                <h3 className="text-lg font-semibold text-white">
                    Über Uns ansehen
                </h3>
                <p className="text-sm text-gray-400 mt-2 h-24">
                    Bei persönlicheren Fragen kann das „Über Uns“ helfen. <br/> Dort findest du mehr Informationen über uRent & Co.
                </p>
                <div className="mt-2">
                    <Button className="bg-[#383838] hover:bg-[#4a4a4a] shadow-md hovser:shadow-lg transition rounded-md text-white flex items-center space-x-2"
                    onClick={() => router.push("/about-us")}
                    >
                        <span>Mehr erfahren</span> 
                        <ArrowUpRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>

        {/* Card Component */}
        <div className="bg-[#1e1e1e] shadow-md hover:shadow-lg transition-transform transform hover:scale-105 rounded-lg w-full md:w-1/3">
            <img 
                src="https://res.cloudinary.com/df1vnhnzp/image/upload/v1731527667/azakudbedzjz8d3vfeoh.jpg"
                alt="Contact Us"
                className="object-cover h-52 w-full rounded-t-lg"
            />
            <div className="p-5">
                <h3 className="text-lg font-semibold text-white">
                    Kontaktier uns
                </h3>
                <p className="text-sm text-gray-400 mt-2 h-24">
                    Falls deine Frage oder dein Anliegen nicht geklärt werden konnte, kannst du uns gerne direkt kontaktieren. <br/> Gerne helfen wir dir weiter.
                </p>
                <div className="mt-2">
                    <Button className="bg-[#383838] hover:bg-[#4a4a4a] shadow-md hover:shadow-lg transition rounded-md text-white flex items-center space-x-2"
                    onClick={() => router.push("/contact")}
                    >
                        <span>Kontakt aufnehmen</span> 
                        <ArrowUpRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
</div>

    );
    
}
 
export default StepPlan;