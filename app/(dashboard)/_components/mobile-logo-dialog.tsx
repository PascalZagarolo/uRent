'use client'
;

import { useRouter } from "next/navigation";

const MobileLogoDialog = () => {

    const router = useRouter();

    return (
        
                <h3 className="flex justify-start items-center py-6 ml-2 text-2xl font-semibold text-white hover:cursor-pointer" onClick={() => {
                    router.push('/')
                }}>
                    
                    <div className="text-[#4e5889] font-font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">u</div>
                    <p className="text-[#eaebf0] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)]">Rent</p>
                </h3>
            
    );
}

export default MobileLogoDialog;