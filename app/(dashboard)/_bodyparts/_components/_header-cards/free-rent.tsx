'use client'

import { CopyIcon, CheckIcon, TagIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const FreeRentCard = () => {
  const [copied, setCopied] = useState(false);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText("uRent24");
    setCopied(true);
    toast.success("Code kopiert!", {
      duration: 2000
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1A1D2A] to-[#232738] text-white">
      <div className="h-full flex flex-col md:flex-row items-center p-6 md:p-8 lg:p-10">
        {/* Left content */}
        <div className="md:w-3/5 space-y-5">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500/20 p-1.5 rounded-full">
              <TagIcon className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <span className="text-xs font-medium text-amber-400">Limitiertes Angebot</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">3 Monate Gratis</span> Vermietung
          </h2>
          
          <p className="text-sm text-gray-300 max-w-md pb-4">
            Vermiete 3 Monate kostenlos deine Fahrzeuge auf uRent und profitiere von unserem exklusiven Angebot bis zum 01.07.2025
          </p>
          
          <div className="flex items-center space-x-4 ">
            <div className="bg-[#161822] py-2 px-4 rounded-lg flex items-center max-w-fit">
              <span className="text-amber-400 font-medium mr-3">uRent24</span>
              <Button
                size="sm"
                onClick={copyCodeToClipboard}
                className={`rounded-lg  flex items-center justify-center transition-all ${
                  copied 
                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" 
                    : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                }`}
              >
                {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right illustration */}
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
            className="relative w-48 h-48"
          >
            <div className="absolute inset-0 rounded-full border-2 border-amber-500/20"></div>
            <div className="absolute inset-4 rounded-full border-2 border-amber-500/30 rotate-45"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
                className="bg-gradient-to-r from-amber-500/10 to-amber-300/10 rounded-full w-32 h-32 flex items-center justify-center"
              >
                <div className="bg-gradient-to-r from-amber-500/20 to-amber-300/20 rounded-full w-24 h-24 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-bold text-amber-400">3</span>
                  <span className="text-xs font-medium text-amber-300/80">MONATE</span>
                  <span className="text-sm font-semibold text-amber-400">GRATIS</span>
                </div>
              </motion.div>
            </div>
            
            {/* Dots around circle */}
            {[0, 72, 144, 216, 288].map((degree, i) => (
              <motion.div 
                key={i}
                className="absolute w-2 h-2 rounded-full bg-amber-500"
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

export default FreeRentCard;
