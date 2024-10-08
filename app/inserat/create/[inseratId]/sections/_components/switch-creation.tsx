'use client'

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation";

const SwitchCreation = () => {

    const router = useRouter();

    const onClick = () => {
       
        const params = new URLSearchParams("")
        params.set('sectionId', "1")
        window.history.pushState(null, '', `?${params.toString()}`)
    
    }

    const onReturn = () => {
        
        router.push("/")
    }

    return ( 
        <div className="w-full ml-auto flex  flex-row">
             <span className="flex flex-row items-center mr-auto text-sm text-gray-200/60 hover:text-gray-200 hover:underline hover:cursor-pointer" onClick={onReturn}>
             <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Startseite 
            </span>
            <span className="flex flex-row items-center ml-auto text-sm text-gray-200/60 hover:text-gray-200 hover:underline hover:cursor-pointer" 
            onClick={onClick}>
            Erstellungsansicht wechseln
                <ArrowRight className="w-4 h-4 ml-2" />
                
            </span>
        </div>
     );
}
 
export default SwitchCreation;