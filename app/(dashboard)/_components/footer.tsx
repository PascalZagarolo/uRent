'use client'

import { TruckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Footer = () => {

    const router = useRouter();

    return ( 
        <div className=" bottom-0 dark:bg-[#0F0F0F] bg-[#191B27] w-full sticky border-y border-gray-300/10">
 <div className="flex justify-center text-gray-200   dark:text-gray-900 mt-2    w-full">
    <div className="w-[1044px] bg-[#0b0c13]bg-[#0b0c13] rounded-lg p-8">
        <div className="flex ">
          <TruckIcon className="w-6 h-6 dark:text-gray-200 mr-2 sm:block hidden"/>
        <p className="dark:text-gray-100 text-xl font-semibold "> uRent </p>
        <p className="text-xs dark:text-gray-200 mr-8 ml-1"> 2024</p>
        <div className="flex justify-evenly dark:text-gray-100/80 font-semibold w-full text-sm sm:text-base">
          <div className="hover:underline hover:cursor-pointer" onClick={() => {router.push("/imprint")}}>
            Impressum
          </div>
          <div className="hover:underline hover:cursor-pointer text-sm sm:text-base" onClick={() => {router.push("/data-privacy")}}>
            Datenschutz
          </div>
          <a className="hover:underline hover:cursor-pointer text-sm sm:text-base" href="/agbs">
            AGBs
          </a>
          
          <a className="hover:underline hover:cursor-pointer text-sm sm:text-base" href="/faqs">
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
