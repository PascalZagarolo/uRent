import React from 'react';
import Image from 'next/image';
import { BadgePercent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const DiscountCard = () => {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-[#1A1D2A] to-[#232738] overflow-hidden p-6 text-white flex flex-col justify-between">
      {/* Badge */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-purple-500/20 p-1.5 rounded-full">
            <BadgePercent className="h-3.5 w-3.5 text-purple-400" />
          </div>
          <span className="text-xs font-medium text-purple-400">Limited Time</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">20% Rabatt</span> auf deine nächste Buchung
        </h2>

        {/* Description */}
        <p className="text-xs text-gray-300 max-w-md">
          Für Neukunden auf die erste Buchung. Nutze den Code unten beim Checkout.
        </p>
      </div>

      {/* Coupon Code */}
      <div className="mt-4">
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-lg max-w-[320px]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-300">Promo Code:</p>
              <p className="text-lg font-bold font-mono tracking-wider text-white">URENT20</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-9"
              >
                Kopieren
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-10 -right-8 w-40 h-40 opacity-20">
        <Image 
          src="/images/discount-pattern.png" 
          alt="Discount Pattern" 
          width={200} 
          height={200}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default DiscountCard; 