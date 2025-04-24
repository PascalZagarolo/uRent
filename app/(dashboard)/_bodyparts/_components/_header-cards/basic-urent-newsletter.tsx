'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { Mail, BellIcon, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegNewspaper } from "react-icons/fa";
import { motion } from "framer-motion";

interface BasicUrentNewsletterProps {
    userId: string
}

const BasicUrentNewsletter = ({ userId }: BasicUrentNewsletterProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onSubscribe = async() => {
        try {
            setIsLoading(true);
            if(!userId) {
                router.push('/login');
                return;
            }

            const values = {
                newsletter: true
            }

            await axios.patch(`/api/profile/${userId}`, values);
            router.refresh();
            toast.success('Wir halten dich von nun an auf dem laufenden!', {
                icon: '📬'
            });
            setIsOpen(false);
        } catch(e: any) {
            console.log(e);
            toast.error('Etwas ist schiefgelaufen');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-full bg-gradient-to-br from-[#1A1D2A] to-[#232738] text-white flex items-center">
            <div className="w-full h-full flex flex-col md:flex-row items-center p-6">
                {/* Left content */}
                <div className="md:w-3/5 space-y-4">
                    <div className="flex items-center h-6">
                        <div className="bg-purple-500/20 p-1.5 rounded-full flex items-center justify-center">
                            <BellIcon className="h-3.5 w-3.5 text-purple-400" />
                        </div>
                        <span className="text-xs font-medium text-purple-400 ml-2">Newsletter</span>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-bold">
                        Bleib auf dem <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Laufenden</span>
                    </h2>
                    
                    <div className="text-sm text-gray-300 max-w-md mb-8 pb-10">
                        Abonniere unseren Newsletter und erhalte regelmäßig Updates zu neuen Fahrzeugen
                    </div>
                    
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild className="mt-8">
                            <Button 
                                className="bg-gradient-to-r from-purple-600 mt-8 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs px-4 h-10 rounded-lg group"
                            >
                                <FaRegNewspaper className="w-3 h-3 mr-1.5" /> 
                                Newsletter abonnieren
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-[#1B1E2C] border-none text-white">
                            <div className="p-4">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-purple-500/20 p-3 rounded-full">
                                        <Mail className="h-5 w-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Newsletter abonnieren</h3>
                                        <p className="text-xs text-gray-400">Bleibe immer auf dem neuesten Stand</p>
                                    </div>
                                </div>
                                
                                <p className="text-sm text-gray-300 mb-6">
                                    Der Newsletter informiert dich über neue Angebote und Neuigkeiten auf uRent.
                                    Du kannst dich jederzeit wieder abmelden.
                                </p>
                                
                                <div className="flex justify-end gap-3">
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white text-xs h-10">
                                            Abbrechen
                                        </Button>
                                    </DialogTrigger>
                                    <Button 
                                        onClick={onSubscribe} 
                                        disabled={isLoading}
                                        className="bg-purple-600 hover:bg-purple-700 text-white text-xs h-10"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Wird angemeldet...
                                            </span>
                                        ) : (
                                            <span className="flex items-center">
                                                <CheckIcon className="w-3.5 h-3.5 mr-1.5" /> Anmelden
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                
                {/* Right illustration */}
                <div className="hidden md:flex md:w-2/5 h-full items-center justify-center">
                    <div className="relative">
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
                            <div className="absolute inset-0 rounded-full border-2 border-purple-500/20"></div>
                            <div className="absolute inset-4 rounded-full border-2 border-purple-500/30 rotate-45"></div>
                            
                            {/* Email icon */}
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
                                <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full w-24 h-24 flex items-center justify-center">
                                    <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full w-16 h-16 flex items-center justify-center">
                                        <Mail className="h-8 w-8 text-purple-400" />
                                    </div>
                                </div>
                            </motion.div>
                            
                            {/* Dots around circle */}
                            {[0, 72, 144, 216, 288].map((degree, i) => (
                                <motion.div 
                                    key={i}
                                    className="absolute w-1.5 h-1.5 rounded-full bg-purple-500"
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
        </div>
    );
}

export default BasicUrentNewsletter;