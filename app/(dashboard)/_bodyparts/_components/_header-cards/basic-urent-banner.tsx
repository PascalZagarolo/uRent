'use client'

import Inserat from "@/app/(dashboard)/_components/add-inserat";
import { userTable } from "@/db/schema";
import { TruckIcon, CarIcon, UserIcon, ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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

    const vehicleTypes = [
        { icon: CarIcon, label: "Pkw" },
        { icon: TruckIcon, label: "Lkw" },
        { icon: RiCaravanLine, label: "Anhänger" },
        { icon: PiVanFill, label: "Transporter" }
    ];

    return (
        <div className="w-full h-full bg-gradient-to-br from-[#1A1D2A] to-[#232738] text-white flex items-center">
            <div className="w-full h-full flex flex-col md:flex-row items-center p-6">
                {/* Left content area */}
                <div className="md:w-3/5 space-y-4">
                    <div className="flex items-center h-6">
                        <div className="bg-indigo-500/20 p-1.5 rounded-full flex items-center justify-center">
                            <CarIcon className="h-3.5 w-3.5 text-indigo-400" />
                        </div>
                        <span className="text-xs font-medium text-indigo-400 ml-2">Fahrzeuge</span>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Fahrzeuge</span> mieten & vermieten
                    </h2>
                    
                    <p className="text-sm text-gray-300 max-w-md">
                        Finde das passende Fahrzeug oder biete deine eigenen zur Vermietung an
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                        {vehicleTypes.map((vehicle, index) => (
                            <motion.div 
                                key={index}
                                whileHover={{ y: -2 }}
                                className="flex items-center gap-2 bg-white/10 px-2 py-1.5 rounded-lg"
                            >
                                <vehicle.icon className="w-3 h-3 text-indigo-400" />
                                <span className="text-xs font-medium">{vehicle.label}</span>
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="flex items-center space-x-3 pt-2">
                        <Button 
                            onClick={onMiet}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-10 px-4 rounded-lg group"
                        >
                            Jetzt registrieren
                            <ArrowRightIcon className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                        </Button>
                        
                        {(!isLoggedIn) ? (
                            <Button 
                                variant="outline"
                                onClick={onRent}
                                className="border-white/20 text-white hover:bg-white/10 hover:border-white/20 text-xs h-10 px-4"
                            >
                                Vermieten
                            </Button>
                        ) : (
                            !isBusiness ? (
                                <Button 
                                    variant="outline"
                                    onClick={onRent}
                                    className="border-white/20 text-white hover:bg-white/10 hover:border-white/20 text-xs h-10 px-4"
                                >
                                    Vermieten
                                </Button>
                            ) : (
                                <Inserat currentUser={currentUser} isEvent={true} />
                            )
                        )}
                    </div>
                </div>
                
                {/* Right content area */}
                <div className="hidden md:flex md:w-2/5 h-full items-center justify-center">
                    <motion.div 
                        animate={{ 
                            rotate: [0, 360],
                        }}
                        transition={{ 
                            duration: 40,
                            repeat: Infinity, 
                            ease: "linear"
                        }}
                        className="relative w-36 h-36"
                    >
                        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20"></div>
                        <div className="absolute inset-4 rounded-full border-2 border-indigo-500/30 rotate-45"></div>
                        
                        <motion.div 
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ 
                                scale: [1, 1.05, 1],
                            }}
                            transition={{ 
                                duration: 4,
                                repeat: Infinity, 
                                ease: "easeInOut"
                            }}
                        >
                            <div className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full w-24 h-24 flex items-center justify-center">
                                <img
                                    src="/uRent.png"
                                    alt="uRent Logo"
                                    className="w-20 h-20 object-contain"
                                />
                            </div>
                        </motion.div>
                        
                        {/* Dots around circle */}
                        {[0, 72, 144, 216, 288].map((degree, i) => (
                            <motion.div 
                                key={i}
                                className="absolute w-1.5 h-1.5 rounded-full bg-indigo-500"
                                style={{
                                    top: `${50 + 45 * Math.sin(degree * Math.PI / 180)}%`,
                                    left: `${50 + 45 * Math.cos(degree * Math.PI / 180)}%`,
                                }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ 
                                    duration: 2,
                                    repeat: Infinity, 
                                    ease: "easeInOut",
                                    delay: i * 0.3,
                                }}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BasicUrentBanner;
