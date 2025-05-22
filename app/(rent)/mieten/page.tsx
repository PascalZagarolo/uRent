"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "@/components/motion";
import { cities } from "@/data/cities/getCitites";
import Image from "next/image";
import { ImageIcon, CarFront, Truck } from "lucide-react";
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
import { weightClassesLkw } from "@/data/lkw/getlkwAttributes";

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
  // .replace(/ss/g, "ß"); // Only if you want to convert 'ss' to 'ß', but be careful as not all 'ss' are 'ß'
}

export default function MietenPage() {
  const [category, setCategory] = useState(categories[0].value);
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [pkwType, setPkwType] = useState<string>("");
  const [pkwBrand, setPkwBrand] = useState<string>("BELIEBIG");
  const [lkwWeightClass, setLkwWeightClass] = useState<string>("");
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

  const handleSearch = () => {
    if (!category || !city) return;
    setLoading(true);
    let url = `/mieten/${slugifyCity(city)}/${category}`;
    if (category === "pkw") {
      const brandPart = pkwBrand && pkwBrand !== "BELIEBIG" ? pkwBrand : "";
      const typePart = pkwType ? pkwType : "";
      let combined = [brandPart, typePart].filter(Boolean).join("-");
      if (combined) url += `/${combined}`;
    }
    if (category === "lkw" && lkwWeightClass) {
      url += `/${lkwWeightClass}`;
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
                Finde dein <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Mietfahrzeug</span>
              </h1>
              <div className="absolute -bottom-2 w-full h-1 bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full"></div>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-6 font-medium">
              Deutschlands größte Auswahl an Mietfahrzeugen – Autos, Transporter, LKWs und Anhänger. Schnell, flexibel und sicher buchen.
            </p>
          </motion.div>

          {/* Value Proposition / Stats Section */}
         

          {/* Category Selection - compact grid with icons */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
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
                        ? "bg-gradient-to-br from-indigo-500/80 to-indigo-700/80 border-indigo-400 shadow-lg scale-[1.04] text-white"
                        : "bg-[#1a1d28]/80 border-indigo-500/10 hover:border-indigo-400/40 hover:shadow-md hover:scale-105 text-gray-200"
                    )}
                    {...(isSelected ? { style: { boxShadow: '0 4px 24px 0 rgba(99,102,241,0.15)' } } : {})}
                  >
                    <Icon className={cn("mb-1", isSelected ? "text-white drop-shadow" : "text-indigo-300", "w-7 h-7 transition-colors duration-200")}/>
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
            {/* PKW Type Dropdown */}
            {category === "pkw" && (
              <>
              <div className="flex justify-center mt-4">
                <Select value={pkwType} onValueChange={setPkwType}>
                  <SelectTrigger className="w-56 bg-[#1a1d28]/80 border-indigo-500/30 text-white">
                    <SelectValue placeholder="Fahrzeugtyp auswählen" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1d28]/90 text-white max-h-60 overflow-y-auto">
                    {pkwTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="hover:bg-indigo-500/20">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-center mt-4">
                <Select value={pkwBrand} onValueChange={setPkwBrand}>
                  <SelectTrigger className="w-56 bg-[#1a1d28]/80 border-indigo-500/30 text-white">
                    <SelectValue placeholder="Marke auswählen" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1d28]/90 text-white max-h-60 overflow-y-auto">
                    <SelectItem value="BELIEBIG">Beliebig</SelectItem>
                    {Object.values(BrandEnumRender)
                      .filter((brand) => brand && brand !== "Sonstige")
                      .map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand.replace(/_/g, " ")}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              </>
            )}
            {/* LKW Weight Class Dropdown */}
            {category === "lkw" && (
              <div className="flex justify-center mt-4">
                <Select value={lkwWeightClass} onValueChange={setLkwWeightClass}>
                  <SelectTrigger className="w-56 bg-[#1a1d28]/80 border-indigo-500/30 text-white">
                    <SelectValue placeholder="Gewichtsklasse auswählen" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1d28]/90 text-white max-h-60 overflow-y-auto">
                    <SelectItem value={null}>Beliebig</SelectItem>
                    {weightClassesLkw.map((weight) => (
                      <SelectItem key={weight.value} value={weight.value} className="hover:bg-indigo-500/20">
                        {weight.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
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
              <h2 className="text-2xl font-bold text-white mb-2">Top Städte</h2>
              <p className="text-gray-400">Wähle eine der größten Städte Deutschlands oder suche in weiteren Städten</p>
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
                    ${city === cityObj.name ? "border-indigo-500 ring-2 ring-indigo-400" : "border-transparent hover:border-indigo-400/60"}`}
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
                      <div className="absolute inset-0 bg-indigo-500/20 pointer-events-none" />
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

          {/* Search Button */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center my-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white font-bold text-base py-4 px-8 rounded-xl shadow-lg hover:from-indigo-700 hover:to-indigo-500 transition-colors disabled:opacity-60 tracking-tight drop-shadow-lg"
              disabled={!category || !city || loading}
              onClick={handleSearch}
            >
              {loading ? "Lädt..." : "Fahrzeuge suchen"}
            </Button>
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
          className="w-64 justify-between bg-[#1a1d28]/80 border-indigo-500/30 text-white"
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
                  className="hover:bg-indigo-500/20"
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