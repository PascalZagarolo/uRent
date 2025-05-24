"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "@/components/motion";
import { cities } from "@/data/cities/getCitites";
import Image from "next/image";
import { ImageIcon, CarFront, Truck, Euro } from "lucide-react";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { BrandEnumRender } from "@/db/schema";

const categories = [
  { label: "Pkw", value: "pkw", icon: CarFront },
  { label: "Lkw", value: "lkw", icon: Truck },
  { label: "Transporter", value: "transporter", icon: PiVanFill },
  { label: "Anhänger", value: "anhaenger", icon: RiCaravanLine },
];

const top10Cities = cities.slice(0, 10);
const otherCities = cities.slice(10);

const pkwTypes = [
  { value: null, label: "Beliebig" },
  { value: "CABRIO", label: "Cabrio" },
  { value: "COUPE", label: "Coupe" },
  { value: "PICKUP", label: "Geländewagen/Pickup" },
  { value: "KASTENWAGEN", label: "Kastenwagen" },
  { value: "KLEINBUS", label: "Kleinbus" },
  { value: "KLEIN", label: "Kleinwagen" },
  { value: "KOMBI", label: "Kombi" },
  { value: "LIMOUSINE", label: "Limousine" },
  { value: "SPORT", label: "Sportwagen" },
  { value: "SUPERSPORT", label: "Supersportwagen" },
  { value: "SUV", label: "SUV" },
  { value: "VAN", label: "Van" },
];

// Display helper: replace ae/oe/ue/ss with ä/ö/ü/ß for German city names
function displayGermanUmlauts(name: string) {
  return name
    .replace(/ae/g, "ä")
    .replace(/oe/g, "ö")
    .replace(/ue/g, "ü")
    .replace(/Ae/g, "Ä")
    .replace(/Oe/g, "Ö")
    .replace(/Ue/g, "Ü");
}

export default function VermietenPage() {
  const [category, setCategory] = useState(categories[0].value);
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [pkwType, setPkwType] = useState<string>("");
  const [pkwBrand, setPkwBrand] = useState<string>("BELIEBIG");
  const router = useRouter();

  // Slugify for German cities (handles umlauts, ß, spaces, etc.)
  function slugifyCity(str: string) {
    return str
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/ /g, "-");
  }

  const handleContinue = () => {
    if (!category || !city) return;
    setLoading(true);
    let url = `/vermieten/${slugifyCity(city)}/${category}`;
    if (category === "pkw") {
      const brandPart = pkwBrand && pkwBrand !== "BELIEBIG" ? pkwBrand : "";
      const typePart = pkwType ? pkwType : "";
      let combined = [brandPart, typePart].filter(Boolean).join("-");
      if (combined) url += `/${combined}`;
    }
    router.push(url);
  };

  return (
    <div className="bg-gradient-to-b from-[#14151b] to-[#1a1c25] min-h-screen">
      <div className="flex justify-center py-12 sm:py-16 px-4 sm:px-8">
        <div className="sm:w-[1044px] w-full">
          {/* Hero Section */}
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative inline-block">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Vermiete dein <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Fahrzeug</span>
              </h1>
              <div className="absolute -bottom-2 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"></div>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-6 font-medium">
              Generiere zusätzliches Einkommen mit deinem Fahrzeug. Einfach registrieren, Fahrzeug inserieren und Anfragen erhalten.
            </p>
            <div className="mt-6">
              <span className="inline-flex items-center px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                3 Monate kostenlos testen
              </span>
            </div>
          </motion.div>

          {/* Enhanced Value Proposition Cards */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-[#1a1d28]/80 border border-emerald-500/20 rounded-xl p-6 shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 hover:translate-y-[-5px]">
                <div className="rounded-full bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Euro className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Steigere deinen Umsatz</h3>
                <p className="text-gray-300">Optimiere die Rentabilität deiner Fahrzeuge durch effiziente Vermietung in ungenutzten Zeiträumen.</p>
              </div>
              
              <div className="bg-[#1a1d28]/80 border border-emerald-500/20 rounded-xl p-6 shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 hover:translate-y-[-5px]">
                <div className="rounded-full bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Präsentiere dein Fuhrpark</h3>
                <p className="text-gray-300">Stelle deine Fahrzeuge professionell vor und erhöhe deine Sichtbarkeit.</p>
              </div>
              
              <div className="bg-[#1a1d28]/80 border border-emerald-500/20 rounded-xl p-6 shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 hover:translate-y-[-5px]">
                <div className="rounded-full bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Erreiche aktive Kunden</h3>
                <p className="text-gray-300">Gewinne Kunden, die gezielt nach deinen Fahrzeugen suchen.</p>
              </div>
              
              <div className="bg-[#1a1d28]/80 border border-emerald-500/20 rounded-xl p-6 shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 hover:translate-y-[-5px]">
                <div className="rounded-full bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Vielfältige Tools</h3>
                <p className="text-gray-300">Nutze unsere Verwaltungs- & Buchungstools für maximale Effizienz.</p>
              </div>
            </div>
          </motion.section>

          {/* Why uRent - Testimonial/Features Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 bg-gradient-to-br from-[#192025] to-[#1a1d28] rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Warum uRent?</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="rounded-full bg-emerald-500/20 w-8 h-8 flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">Maximale Kontrolle</h3>
                      <p className="text-gray-300 mt-1">Du entscheidest über Verfügbarkeit, Preise und Anfragen.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="rounded-full bg-emerald-500/20 w-8 h-8 flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">Intelligente Verwaltung</h3>
                      <p className="text-gray-300 mt-1">Nutze unser Dashboard für Buchungen, Einnahmen und Statistiken.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="rounded-full bg-emerald-500/20 w-8 h-8 flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">Starke Community</h3>
                      <p className="text-gray-300 mt-1">Werde Teil der wachsenden uRent-Gemeinschaft in ganz Deutschland.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#151820] p-8 md:p-10 border-l border-emerald-500/10">
                <h3 className="text-xl font-bold text-white mb-6">uRent in Zahlen</h3>
                
                <div className="space-y-6">
                  <div className="bg-[#1a1d28] p-6 rounded-xl border border-emerald-500/10">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <span className="block text-3xl font-bold text-white">100+</span>
                        <span className="text-gray-400">Vermieter die uRent vertrauen</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#1a1d28] p-6 rounded-xl border border-emerald-500/10">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CarFront className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div className="ml-4">
                        <span className="block text-3xl font-bold text-white">400+</span>
                        <span className="text-gray-400">Fahrzeuge auf uRent inseriert</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1a1d28] p-6 rounded-xl border border-emerald-500/10">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <span className="block text-3xl font-bold text-white">10.000+</span>
                        <span className="text-gray-400">Erreichte Kunden</span>
                      </div>
                    </div>
                  </div>

                  
                </div>
                
                <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20 mt-6">
                  <div>
                    <h4 className="text-emerald-400 font-bold text-lg">3 Monate kostenlos</h4>
                    <p className="text-gray-300 text-sm">Starte jetzt ohne Risiko</p>
                  </div>
                  <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Platform Benefits Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Deine Verwaltungstools</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Einfache und effiziente Werkzeuge für die professionelle Verwaltung deiner Fahrzeuge</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#1a1d28]/70 rounded-xl p-6 border border-emerald-500/10 hover:border-emerald-500/30 transition-all shadow-lg">
                <div className="rounded-full bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Kalender & Verfügbarkeit</h3>
                <p className="text-gray-300">Definiere genau, wann deine Fahrzeuge verfügbar sind. Blockiere Zeiträume und synchronisiere mit deinem Kalender.</p>
              </div>
              
              <div className="bg-[#1a1d28]/70 rounded-xl p-6 border border-emerald-500/10 hover:border-emerald-500/30 transition-all shadow-lg">
                <div className="rounded-full bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Buchungsmanagement</h3>
                <p className="text-gray-300">Verwalte Anfragen und Buchungen mit wenigen Klicks. Bestätige oder lehne ab direkt aus der App heraus.</p>
              </div>
              
              <div className="bg-[#1a1d28]/70 rounded-xl p-6 border border-emerald-500/10 hover:border-emerald-500/30 transition-all shadow-lg">
                <div className="rounded-full bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Statistiken & Einnahmen</h3>
                <p className="text-gray-300">Behalte den Überblick über deine Vermietungen und Einnahmen mit detaillierten Auswertungen.</p>
              </div>
            </div>
          </motion.section>

          {/* Category Selection - compact grid with icons */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Was möchtest du vermieten?</h2>
              <p className="text-gray-400">Wähle die Kategorie deines Fahrzeugs</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 cursor-pointer border focus:outline-none w-full min-h-[80px] shadow-sm",
                      isSelected
                        ? "bg-gradient-to-br from-emerald-500/80 to-emerald-700/80 border-emerald-400 shadow-lg scale-[1.04] text-white"
                        : "bg-[#1a1d28]/80 border-emerald-500/10 hover:border-emerald-400/40 hover:shadow-md hover:scale-105 text-gray-200"
                    )}
                    {...(isSelected ? { style: { boxShadow: '0 4px 24px 0 rgba(16,185,129,0.15)' } } : {})}
                  >
                    <Icon className={cn("mb-1", isSelected ? "text-white drop-shadow" : "text-emerald-300", "w-7 h-7 transition-colors duration-200")}/>
                    <span className={cn(
                      "text-sm font-semibold text-center transition-colors duration-200",
                      isSelected ? "text-white" : "text-gray-200"
                    )}>
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.section>

          {/* City Spotlight */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Wo befindet sich dein Fahrzeug?</h2>
              <p className="text-gray-400">Wähle eine Stadt aus oder suche nach deinem Standort</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center mb-8">
              {top10Cities.map((cityObj) => (
                <motion.button
                  key={cityObj.name}
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  aria-pressed={city === cityObj.name}
                  tabIndex={0}
                  className={`group focus:outline-none transition-all duration-200 rounded-2xl shadow-lg border-2 bg-[#181a22] 
                    flex flex-col items-center justify-end relative overflow-hidden h-40 w-full min-w-[140px] max-w-[220px] mx-auto
                    ${city === cityObj.name ? "border-emerald-500 ring-2 ring-emerald-400" : "border-transparent hover:border-emerald-400/60"}`}
                  onClick={() => setCity(cityObj.name)}
                >
                  <div className="relative w-full h-40 overflow-hidden" style={{borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem'}}>
                    {cityObj.imageUrl ? (
                      <Image
                        src={cityObj.imageUrl}
                        alt={cityObj.name}
                        fill
                        className="object-cover w-full h-full transition-all duration-200 group-hover:scale-105"
                        style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <ImageIcon className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    {city === cityObj.name && (
                      <div className="absolute inset-0 bg-emerald-500/20 pointer-events-none" />
                    )}
                    <span
                      className="absolute bottom-0 left-0 w-full text-center font-bold text-white text-lg bg-black/70 rounded-b-2xl px-3 py-2 shadow-lg"
                      style={{
                        textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 1px 0 #000',
                        letterSpacing: '0.01em',
                        borderBottomLeftRadius: '1rem',
                        borderBottomRightRadius: '1rem',
                      }}
                    >
                      {displayGermanUmlauts(cityObj.name)}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-400">Weitere Städte:</span>
              {/* Combobox for other cities */}
              <CityCombobox
                city={city}
                setCity={setCity}
                otherCities={otherCities.sort((a, b) => a.name.localeCompare(b.name))}
                displayGermanUmlauts={displayGermanUmlauts}
              />
            </div>
          </motion.section>

          {/* Earnings Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 bg-[#1a1d28]/80 border border-emerald-500/20 rounded-xl p-6 shadow-lg"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Verdienst-Potenzial</h2>
              <p className="text-gray-400">So viel könntest du mit deinem Fahrzeug verdienen</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#14151b] rounded-lg p-4 border border-emerald-500/10">
                <h3 className="text-emerald-400 font-semibold mb-2">PKW</h3>
                <p className="text-3xl font-bold text-white">€20-600<span className="text-sm text-gray-400">/Tag</span></p>
                <p className="text-gray-400 text-sm mt-2">Je nach Modell und Ausstattung</p>
              </div>
              
              <div className="bg-[#14151b] rounded-lg p-4 border border-emerald-500/10">
                <h3 className="text-emerald-400 font-semibold mb-2">Transporter</h3>
                <p className="text-3xl font-bold text-white">€30-200<span className="text-sm text-gray-400">/Tag</span></p>
                <p className="text-gray-400 text-sm mt-2">Je nach Größe und Nutzlast</p>
              </div>
              
              <div className="bg-[#14151b] rounded-lg p-4 border border-emerald-500/10">
                <h3 className="text-emerald-400 font-semibold mb-2">LKW</h3>
                <p className="text-3xl font-bold text-white">€130-650<span className="text-sm text-gray-400">/Tag</span></p>
                <p className="text-gray-400 text-sm mt-2">Je nach Gewichtsklasse und Typ</p>
              </div>
            </div>
          </motion.section>

          {/* How It Works Section - NEW */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">So funktioniert's</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">In nur wenigen Schritten zu deiner ersten Vermietung</p>
            </div>
            
            <div className="relative">
              <div className="flex flex-col space-y-16">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">1</div>
                  <div className="flex-1 max-w-2xl">
                    <div className="bg-[#1a1d28]/80 rounded-xl p-8 border border-emerald-500/20 shadow-lg">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Registriere dein Fahrzeug</h3>
                      <p className="text-gray-300 text-lg">Wähle die Fahrzeugkategorie und füge Fotos sowie Informationen hinzu, um dein Fahrzeug optimal zu präsentieren. Unser System führt dich Schritt für Schritt durch den Prozess.</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">2</div>
                  <div className="flex-1 max-w-2xl">
                    <div className="bg-[#1a1d28]/80 rounded-xl p-8 border border-emerald-500/20 shadow-lg">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Lege Verfügbarkeit & Preise fest</h3>
                      <p className="text-gray-300 text-lg">Bestimme, wann dein Fahrzeug verfügbar ist und zu welchem Preis. Du behältst jederzeit die volle Kontrolle über deinen Kalender und kannst Preise je nach Saison anpassen.</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">3</div>
                  <div className="flex-1 max-w-2xl">
                    <div className="bg-[#1a1d28]/80 rounded-xl p-8 border border-emerald-500/20 shadow-lg">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Erhalte Buchungsanfragen</h3>
                      <p className="text-gray-300 text-lg">Interessenten schicken dir Anfragen, die du annehmen oder ablehnen kannst. Der integrierte Chat erleichtert die Kommunikation und hilft, alle Details zu klären.</p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">4</div>
                  <div className="flex-1 max-w-2xl">
                    <div className="bg-[#1a1d28]/80 rounded-xl p-8 border border-emerald-500/20 shadow-lg">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Übergebe & generiere Einkommen</h3>
                      <p className="text-gray-300 text-lg">Nach der erfolgreichen Übergabe regelst du die Bezahlung direkt mit dem Mieter – uRent ist am Zahlungsverkehr nicht beteiligt.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Connecting line */}
              <div className="hidden md:block absolute left-10 top-[4.5rem] bottom-16 w-0.5 bg-gradient-to-b from-emerald-500 to-emerald-500/10"></div>
            </div>
          </motion.section>

          {/* Continue Button */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center my-12"
          >
            <div className="bg-[#1a1d28]/80 border border-emerald-500/20 rounded-xl p-8 mb-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Starte jetzt und profitiere von 3 Monaten kostenloser Nutzung</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Registriere dein Fahrzeug in wenigen Minuten und erreiche sofort Tausende potenzielle Mieter in deiner Stadt.</p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-white font-bold text-base py-4 px-8 rounded-xl shadow-lg hover:from-emerald-700 hover:to-emerald-500 transition-colors disabled:opacity-60 tracking-tight drop-shadow-lg"
                disabled={!category || !city || loading}
                onClick={handleContinue}
              >
                {loading ? "Lädt..." : "Fahrzeug kostenlos registrieren"}
              </Button>
              <p className="text-gray-400 mt-4 text-sm">
                Keine Kreditkarte erforderlich. Keine versteckten Kosten. Jederzeit kündbar.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

function CityCombobox({ city, setCity, otherCities, displayGermanUmlauts }: {
  city: string;
  setCity: (city: string) => void;
  otherCities: { name: string }[];
  displayGermanUmlauts: (name: string) => string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-64 justify-between bg-[#1a1d28]/80 border-emerald-500/30 text-white"
        >
          {city && !otherCities.some((c) => c.name === city)
            ? displayGermanUmlauts(city)
            : city
            ? displayGermanUmlauts(city)
            : "Stadt auswählen"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 bg-[#1a1d28]/90 text-white">
        <Command>
          <CommandInput placeholder="Stadt suchen..." className="h-9" />
          <CommandList>
            <CommandEmpty>Keine Stadt gefunden.</CommandEmpty>
            <CommandGroup>
              {otherCities.map((cityObj) => (
                <CommandItem
                  key={cityObj.name}
                  value={cityObj.name}
                  onSelect={() => {
                    setCity(cityObj.name);
                    setOpen(false);
                  }}
                  className="hover:bg-emerald-500/20"
                >
                  {displayGermanUmlauts(cityObj.name)}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      city === cityObj.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
