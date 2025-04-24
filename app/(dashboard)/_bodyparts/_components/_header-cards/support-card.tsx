import React from 'react';
import { LifeBuoy, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactMethod = ({ 
  icon: Icon, 
  title, 
  value, 
  bgColor, 
  textColor 
}: { 
  icon: any; 
  title: string; 
  value: string; 
  bgColor: string; 
  textColor: string; 
}) => {
  return (
    <motion.div 
      className="flex items-center p-3 rounded-lg space-x-3 hover:bg-white/5 transition-colors cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`${bgColor} p-2 rounded-full`}>
        <Icon className={`h-4 w-4 ${textColor}`} />
      </div>
      <div>
        <p className="text-xs text-gray-400">{title}</p>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </motion.div>
  );
};

const SupportCard = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1A1D2A] to-[#232738] p-6 text-white flex flex-col">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500/20 p-1.5 rounded-full">
            <LifeBuoy className="h-3.5 w-3.5 text-blue-400" />
          </div>
          <span className="text-xs font-medium text-blue-400">Support</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold">
          Wir sind für dich da
        </h2>

        {/* Description */}
        <p className="text-xs text-gray-300 max-w-md">
          Unsere Kundenbetreuung steht dir jederzeit zur Verfügung. Kontaktiere uns direkt über einen der folgenden Wege.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="mt-6 space-y-2">
        <ContactMethod 
          icon={Phone} 
          title="Telefon" 
          value="+49 (0) 30 123 456 789" 
          bgColor="bg-green-500/20" 
          textColor="text-green-400" 
        />
        
        <ContactMethod 
          icon={Mail} 
          title="E-Mail" 
          value="support@urent.de" 
          bgColor="bg-blue-500/20" 
          textColor="text-blue-400" 
        />
      </div>

      {/* Business Hours */}
      <div className="mt-auto pt-6">
        <p className="text-xs text-gray-400">Geschäftszeiten</p>
        <p className="text-sm text-white">Mo - Fr: 8:00 - 18:00 Uhr</p>
      </div>
    </div>
  );
};

export default SupportCard; 