'use client'


import { Instagram, MailCheckIcon, MailIcon, TruckIcon, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";
import { EmailIcon } from "react-share";

const Footer = () => {

  const router = useRouter();

  return (
    <div className=" bottom-0 mt-1 dark:bg-[#0F0F0F] bg-[#191B27] w-full sticky border-y border-gray-300/10">
      <div className="flex flex-row items-center p-4 sm:hidden ">
                  <a
                  href="https://www.instagram.com/urent.de/"
                  >
                  <Instagram className="w-6 h-6 mr-4" />
                  </a>
                  <a>
                    <Twitter className="w-6 h-6 mr-4" />
                  </a>
                  <a href="mailto:support@urent-rental.de">
  <MailIcon className="w-6 h-6 mr-4" />
</a>
                </div>
      <div className="flex justify-center text-gray-200   dark:text-gray-900 sm:mt-2    w-full">
      
        <div className="2xl:w-[1044px]  w-full bg-[#0b0c13]bg-[#0b0c13] rounded-lg pb-4 px-4 sm:p-4">
          <div className="flex items-center">
            
            <div className="dark:text-gray-100 text-lg sm:text-xl font-semibold md:block hidden pl-16"> uRent </div>

            <div className="flex justify-evenly gap-x-8 sm:gap-x-0 dark:text-gray-200 font-medium sm:font-semibold w-full sm:text-sm text-xs">
            <div className="font-medium flex-col">

<a className="hover:underline hover:cursor-pointer  text-sm sm:text-sm block" href="/about-us">
    Über uns
  </a>
  <a className="hover:underline hover:cursor-pointer  text-sm sm:text-sm block" href="/contact">
    Kontakt
  </a>
  <a className="hover:underline hover:cursor-pointer  text-sm sm:text-sm block" href="/career">
    Karriere
  </a>
</div>

              <div className="font-medium flex-col">
                <a className="hover:underline hover:cursor-pointer  text-sm sm:text-sm block" href="/imprint">
                  Impressum
                </a>
                <a className="hover:underline hover:cursor-pointer  text-sm sm:text-sm block" href="/data-privacy">
                  Datenschutz
                </a>
                <a className="hover:underline hover:cursor-pointer  text-sm sm:text-sm block" href="/agbs">
                  AGBs
                </a>
              </div>

              <div className="flex flex-col">
              <a className="hover:underline hover:cursor-pointer  sm:text-sm text-sm" href="/faqs">
               FAQs & Hilfe
              </a>
              <a className="hover:underline hover:cursor-pointer  sm:text-sm text-sm" href="/blog">
               Blogs & News
              </a>
              
              </div>

              <div className="hidden sm:block">
                
                <div className="flex flex-row items-center mt-2">
                  <a
                  href="https://www.instagram.com/urent.de/"
                  >
                  <Instagram className="w-6 h-6 mr-4" />
                  </a>
                  <a>
                    <Twitter className="w-6 h-6 mr-4" />
                  </a>
                  <a href="mailto:support@urent-rental.de">
  <MailIcon className="w-6 h-6 mr-4" />
</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
