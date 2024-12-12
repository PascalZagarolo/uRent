'use client'

import Inserat from "@/app/(dashboard)/_components/add-inserat";
import { userTable } from "@/db/schema";
import { TruckIcon, CarIcon, CaravanIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaRegHandPointer } from "react-icons/fa";
import { PiCursorClickLight, PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";

interface BasicUrentBannerProps {
    isLoggedIn? : boolean;
    isBusiness? : boolean;
    currentUser : typeof userTable.$inferSelect;
}

const BasicUrentBanner = ({
    isLoggedIn,
    isBusiness,
    currentUser
} : BasicUrentBannerProps) => {

    const router = useRouter();

    const onRent = () => {
        try {
            if(!isLoggedIn) {
                router.push("login")
            }

            if(isBusiness) {
                toast.error(`Du muss dein Konto umwandeln um Inserate schalten zu können. \n Gehe dafür auf dein Profil und wähle \n 'Zum Vermieterkonto umwandeln'.`)
            }
        } catch(e : any) {
            console.log(e);
        }
    }

    const onMiet = () => {
        try {
            if(!isLoggedIn) {
                router.push("login")
            }
        } catch(e : any) {
            console.log(e);
        }
    }

  return (
    <div className="w-full bg-[#1B1E2C]  text-white rounded-lg p-12 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="space-y-0">
          <h2 className="text-4xl font-bold text-gray-200">
            Fahrzeuge in <span className="text-indigo-500 mr-2">nur ein paar Klicks</span>
            mieten & vermieten
          </h2>
          <p className="text-base text-gray-300 flex items-center">
            Wähle aus Pkw, Lkw, Anhängern und Transportern{" "}

            <PiCursorClickLight className="w-8 h-8 text-gray-200 ml-2 animate-bounce" />
          </p>

          <div className="flex gap-8 items-center mt-8 mb-8">
            <div className="flex flex-col items-center">
              <CarIcon className="w-12 h-12 text-indigo-500 hover:text-indigo-400 transition" />
              <p className="mt-2 text-lg">Pkw</p>
            </div>
            <div className="flex flex-col items-center">
              <TruckIcon className="w-12 h-12 text-indigo-500 hover:text-indigo-400 transition" />
              <p className="mt-2 text-lg">Lkw</p>
            </div>
            <div className="flex flex-col items-center">
              <RiCaravanLine className="w-12 h-12 text-indigo-500 hover:text-indigo-400 transition" />
              <p className="mt-2 text-lg">Anhänger</p>
            </div>
            <div className="flex flex-col items-center">
              <PiVanFill className="w-12 h-12 text-indigo-500 hover:text-indigo-400 transition" />
              <p className="mt-2 text-lg">Transporter</p>
            </div>
          </div>

          <div className="flex flex-row items-center ">
            <button className="px-6 py-3 bg-indigo-600 rounded-lg text-white font-semibold flex flex-row justify-center items-center hover:bg-indigo-500 transition mt-4 w-full" onClick={onMiet}>
             <UserIcon className="w-6 h-6 mr-2" /> Jetzt kostenlos registrieren & loslegen
            </button>
            {/* {(!isLoggedIn || !isBusiness) ? (
              <button className="ml-4 px-6 py-3 border border-indigo-500 rounded-lg text-indigo-500 hover:bg-indigo-500 hover:text-white transition" onClick={onRent}>
              Jetzt Vermieten
            </button>
            ) : (
              <Inserat currentUser={currentUser} isEvent={true} />
            )} */}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center justify-center space-y-0">
          <h3 className="text-2xl font-semibold">Mieten? Vermieten?</h3>
          <div className="relative w-[200px] h-[200px]">
            <img
              src="/uRent.png"
              alt="uRent"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-base text-center text-gray-400">
            Miete & Vermiete Fahrzeuge so einfach wie noch nie. 
            {/* <span className="font-semibold text-gray-200">uRent</span> */}
          </div> 
        </div>
      </div>
    </div>
  );
};

export default BasicUrentBanner;
