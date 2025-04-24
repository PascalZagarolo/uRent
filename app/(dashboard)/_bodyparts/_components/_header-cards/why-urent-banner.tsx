'use client'

import React from 'react';
import { ArrowRightIcon, HelpCircle, BarChart3, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const WhyURent = () => {
  const router = useRouter();

  const features = [
    { icon: Clock, text: "Zeitsparend" },
    { icon: Shield, text: "Sicher" },
    { icon: BarChart3, text: "Effizient" },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1A1D2A] to-[#232738] text-white">
      <div className="h-full flex flex-col md:flex-row items-center p-6">
        {/* Left content */}
        <div className="md:w-3/5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500/20 p-1.5 rounded-full">
              <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
            </div>
            <span className="text-xs font-medium text-indigo-400">Vorteile</span>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold">
            Warum <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">uRent?</span>
          </h2>
          
          <p className="text-xs text-gray-300 max-w-md">
            Erfahre was uRent von anderen Plattformen abhebt und wie du & dein Geschäft profitieren können
          </p>
          
          <div className="flex flex-wrap gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg"
              >
                <feature.icon className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
          
          <div>
            <Button 
              onClick={() => router.push("/why-urent")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 h-10 rounded-lg group mt-2"
            >
              Mehr erfahren
              <ArrowRightIcon className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
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
            className="relative w-36 h-36"
          >
            <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20"></div>
            <div className="absolute inset-4 rounded-full border-2 border-indigo-500/30 rotate-45"></div>
            
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
                className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full w-24 h-24 flex items-center justify-center"
              >
                <div className="bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center text-center">
                  <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">uRent</span>
                </div>
              </motion.div>
            </div>
            
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

export default WhyURent;
