'use client';

import { useRouter } from "next/navigation";

const MobileLogoDialog = () => {

    const router = useRouter();

    return (
        
                <h3 className="flex justify-start items-center py-6 ml-2 text-2xl font-semibold text-white hover:cursor-pointer" onClick={() => {
                    router.push('/')
                }}>
                    
                    <span className="text-xl text-gray-200 font-semibold shadow-lg">
                        uRent
                    </span>
                </h3>
            
    );
}

export default MobileLogoDialog;