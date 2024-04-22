'use client'

import { TruckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Footer = () => {

    const router = useRouter();

    return ( 
        <div className=" bottom-0 dark:bg-[#0F0F0F] bg-[#191B27] w-full sticky border-y border-gray-300/10">
 <div className="flex justify-center text-gray-200   dark:text-gray-900 mt-2    w-full">
    <div className="sm:w-[1044px] w-full bg-[#0b0c13]bg-[#0b0c13] rounded-lg py-4 px-2 sm:p-4">
        <div className="flex items-center">
          <TruckIcon className="w-6 h-6 dark:text-gray-200 mr-2 sm:block hidden"/>
        <p className="dark:text-gray-100 text-lg sm:text-xl font-semibold "> uRent </p>
        
        <div className="flex justify-evenly dark:text-gray-200 font-medium sm:font-semibold w-full sm:text-sm text-xs">
        <div className="font-medium">
          
          <a className="hover:underline hover:cursor-pointer text-xs sm:text-sm" href="/contact">
            Kontakt
          </a>
          </div>
          <div className="font-medium">
          <div className="hover:underline hover:cursor-pointer  text-xs sm:text-sm" onClick={() => {router.push("/imprint")}}>
            Impressum
          </div>
          <div className="hover:underline hover:cursor-pointer  text-xs sm:text-sm" onClick={() => {router.push("/data-privacy")}}>
            Datenschutz
          </div>
          <a className="hover:underline hover:cursor-pointer  text-xs sm:text-sm" href="/agbs">
            AGBs
          </a>
          </div>
          
          <a className="hover:underline hover:cursor-pointer  sm:text-sm text-xs" href="/faqs">
            FAQs
          </a>
          
        </div>
        </div>
    </div>
  </div>
 </div>
     );
}
 
export default Footer;
