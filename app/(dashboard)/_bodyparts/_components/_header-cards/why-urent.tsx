import React from 'react';
import { ShieldCheck, Truck, Clock, HeartIcon, CheckIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyURent = () => {
  // Animation variants for the icons
  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Sicherheit',
      description: 'Vollkasko-Versicherung bei jeder Anmietung inklusive',
      gradient: 'from-emerald-400/20 to-emerald-500/20',
      iconGradient: 'from-emerald-500 to-emerald-700',
      hoverColor: 'group-hover:text-emerald-400'
    },
    {
      icon: <Truck className="w-5 h-5 text-blue-400" />,
      title: 'Mobilität',
      description: 'Für jeden Anlass das passende Fahrzeug',
      gradient: 'from-blue-400/20 to-blue-500/20',
      iconGradient: 'from-blue-500 to-blue-700',
      hoverColor: 'group-hover:text-blue-400'
    },
    {
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      title: 'Schnelligkeit',
      description: 'Einfach online buchen - per App starten',
      gradient: 'from-amber-400/20 to-amber-500/20',
      iconGradient: 'from-amber-500 to-amber-700',
      hoverColor: 'group-hover:text-amber-400'
    },
    {
      icon: <HeartIcon className="w-5 h-5 text-red-400" />,
      title: 'Kundenzufriedenheit',
      description: 'Bestbewertete Autovermietung',
      gradient: 'from-red-400/20 to-red-500/20',
      iconGradient: 'from-red-500 to-red-700',
      hoverColor: 'group-hover:text-red-400'
    }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1A1D2A] to-[#232738] p-6 text-white flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-teal-500/20 p-1.5 rounded-full">
            <CheckIcon className="h-3.5 w-3.5 text-teal-400" />
          </div>
          <span className="text-xs font-medium text-teal-400">Vorteile</span>
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold">
          Warum <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">uRent?</span>
        </h2>
        
        <p className="text-xs text-gray-300 max-w-md">
          Entdecke die Vorteile von uRent - deine moderne Fahrzeugvermietung
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover="hover"
            variants={{
              hover: { y: -5 }
            }}
            className={`bg-gradient-to-br ${feature.gradient} p-3 rounded-lg group transition-transform`}
          >
            <div className="flex items-start space-x-2">
              <motion.div
                variants={iconVariants}
                className={`bg-gradient-to-r ${feature.iconGradient} p-1.5 rounded-full flex-shrink-0`}
              >
                {feature.icon}
              </motion.div>
              <div>
                <h3 className={`text-sm font-semibold transition-colors ${feature.hoverColor}`}>
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-300 mt-0.5">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyURent; 