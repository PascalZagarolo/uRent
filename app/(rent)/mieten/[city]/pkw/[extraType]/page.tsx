import { notFound } from "next/navigation";
import RelevanteInserate from "@/app/(dashboard)/_bodyparts/relevant-inserate";
import { cities } from "@/data/cities/getCitites";
import { CategoryEnumRender as CategoryEnum, CategoryEnumRender, BrandEnumRender, CarTypeEnumRender } from "@/db/schema";
import Image from "next/image";
import { CarFront, Truck } from "lucide-react";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PaginationComponent from "@/app/(dashboard)/_components/pagination-component";
import { convertVowel } from "@/actions/convertVowel/convertVowel";
import { extraTypes } from "@/data/cities/getExtraTypes";

interface MietenCityPkwExtraTypeProps {
  params: {
    city: string;
    extraType: string;
  };
}

const categoryLabels: Record<string, string> = {
  pkw: "Autos",
  lkw: "LKWs",
  transporter: "Transporter",
  anhaenger: "Anhänger",
};
const categoryIcons: Record<string, any> = {
  pkw: CarFront,
  lkw: Truck,
  transporter: PiVanFill,
  anhaenger: RiCaravanLine,
};
const allowedCategories = ["PKW", "LKW", "TRAILER", "TRANSPORT"] as const;
type AllowedCategory = typeof allowedCategories[number];
const categoryEnumMap: Record<string, AllowedCategory> = {
  pkw: "PKW",
  lkw: "LKW",
  transporter: "TRANSPORT",
  anhaenger: "TRAILER",
};
function isAllowedCategory(val: string): val is AllowedCategory {
  return (allowedCategories as readonly string[]).includes(val);
}



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

// Converts carBrand like 'Mercedes_Benz' to 'Mercedes Benz'
function readableCarBrand(brand: string | undefined): string {
  if (!brand) return '';
  return brand.replace(/_/g, ' ');
}

let carBrand;
let extraType
function parseBrandAndType(param: string) {
  if (!param) return { carBrand: undefined, extraType: undefined };
  const parts = param.split("-").filter(Boolean);
  
  for (const part of parts) {
    //@ts-ignore
    if (Object.values(BrandEnumRender).includes(part)) {
      carBrand = part;
      //@ts-ignore
    } else if (Object.values(CarTypeEnumRender).includes(part)) {
      extraType = part;
    }
  }
  return { carBrand, extraType };
}

// Use extraTypes from data/cities/getExtraTypes for PKW types
const pkwTypes = extraTypes.filter(e => e.category === "pkw");

// Add PKW type labels for SEO

const MietenCityPkwExtraType = ({ params }: MietenCityPkwExtraTypeProps) => {
  const { city, extraType: extraTypeParam } = params;
  const { carBrand, extraType } = parseBrandAndType(extraTypeParam);
  const category = "pkw";
  const cityObj = cities.find(c => slugifyCity(c.name) === city.toLowerCase());
  const categoryLabel = categoryLabels[category] || category;
  const categoryEnumValue = categoryEnumMap[category];
  const allowedCategoryEnumValue = categoryEnumValue as AllowedCategory;
  const Icon = categoryIcons[category];

  // Get human-readable label for extraType (PKW type)
  let extraTypeLabel = extraType;
  if (category === "pkw" && extraType) {
    const found = pkwTypes.find(t => t.name === extraType);
    if (found) extraTypeLabel = found.name;
  }

  //Write a function that takes in a carBrand and returns a more readable version => Mercedes_Benz => Mercedes Benz

  if (!cityObj || !categoryLabel || !categoryEnumValue || !isAllowedCategory(categoryEnumValue)) return notFound();

  return (
    <div className="bg-gradient-to-b from-[#14151b] to-[#1a1c25] min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full flex justify-center items-center" style={{ minHeight: 220 }}>
        {cityObj.imageUrl ? (
          <Image
            src={cityObj.imageUrl}
            alt={cityObj.name}
            fill
            className="object-cover w-full h-[220px] sm:rounded-b-2xl opacity-80"
            style={{ zIndex: 1, minHeight: 220, maxHeight: 320 }}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/80 to-indigo-400/60 sm:rounded-b-2xl" style={{ zIndex: 1, minHeight: 220, maxHeight: 320 }} />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <div className="bg-black/60 rounded-2xl px-6 py-6 flex flex-col items-center max-w-2xl w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mb-2">
             {readableCarBrand(carBrand ?? "")} {extraTypeLabel?.slice(0,1)?.toUpperCase() + extraTypeLabel?.slice(1)?.toLowerCase()} mieten in 
            </h1>
            <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-600 drop-shadow-lg">
              {convertVowel(cityObj.name)} 
            </span>
            <p className="text-gray-200 text-lg mt-3 max-w-xl text-center">
              Entdecke die besten Angebote für {readableCarBrand(carBrand ?? "")} {extraTypeLabel?.slice(0,1)?.toUpperCase() + extraTypeLabel?.slice(1)?.toLowerCase()} in {convertVowel(cityObj.name)}.
            </p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-3 justify-center mt-8 mb-8">
        <span className="flex items-center gap-2 bg-indigo-600/10 text-indigo-400 px-4 py-2 rounded-full font-semibold text-base shadow-sm">
          {Icon && <Icon className="w-5 h-5" />} {categoryLabel}
        </span>
        <span className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full font-semibold text-base shadow-sm">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" /></svg>
          {convertVowel(cityObj.name)}
        </span>
      </div>

      {/* Back to Overview */}
      <div className="flex justify-center px-4 mt-8">
        <div className="w-full sm:w-[1044px]">
          <Link
            href="/mieten"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-base mb-4 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Zurück zur Übersicht
          </Link>
        </div>
      </div>

      {/* Inserate Results Card */}
      <div className="flex justify-center px-4">
        <div className="w-full sm:w-[1044px] p-0">
          <RelevanteInserate
            title={""}
            thisCategory={allowedCategoryEnumValue as unknown as typeof CategoryEnumRender}
            filter={""}
            start={""}
            end={""}
            page={1}
            periodBegin={""}
            periodEnd={""}
            startTime={0}
            endTime={0}
            startDateDynamic={""}
            endDateDynamic={""}
            reqTime={""}
            minTime={""}
            location={convertVowel(cityObj.name)}
            amount={""}
            reqAge={undefined}
            reqLicense={undefined}
            //@ts-ignore
            thisBrand={carBrand && Object.values(BrandEnumRender).includes(carBrand as any) ? (carBrand as typeof BrandEnumRender[keyof typeof BrandEnumRender]) : undefined}
            doors={undefined}
            doorsMax={undefined}
            initial={undefined}
            initialMax={undefined}
            power={undefined}
            powerMax={undefined}
            seats={undefined}
            seatsMax={undefined}
            fuel={undefined}
            transmission={undefined}
            //@ts-ignore
            thisType={extraType && Object.values(CarTypeEnumRender).includes(extraType as any) ? (extraType as typeof CarTypeEnumRender[keyof typeof CarTypeEnumRender]) : undefined}
            freeMiles={undefined}
            extraCost={undefined}
            ahk={undefined}
            weightClass={undefined}
            weightClassMax={undefined}
            payload={undefined}
            payloadMax={undefined}
            drive={undefined}
            loading={undefined}
            application={undefined}
            lkwBrand={undefined}
            transportBrand={undefined}
            trailerType={undefined}
            coupling={undefined}
            extraType={undefined}
            axis={undefined}
            axisMax={undefined}
            brake={undefined}
            currentUser={undefined}
            volume={undefined}
            loading_l={undefined}
            loading_b={undefined}
            loading_h={undefined}
            radius={50}
            userId={undefined}
            caution={undefined}
          />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center w-full mt-8 ">
        <div className="w-full sm:w-[1044px]">
          <PaginationComponent category={category} city={cityObj.name} extraType={extraTypeLabel} radius={1} />
        </div>
      </div>
    </div>
  );
};

export default MietenCityPkwExtraType;

export async function generateMetadata({ params }: MietenCityPkwExtraTypeProps) {
  // Find city and category label
  const { city, extraType } = params;
  const category = "pkw";
  // Find city object from cities data
  const cityObj = cities.find(c => slugifyCity(c.name) === city.toLowerCase());
  // Get readable category label
  const categoryLabel = categoryLabels[category] || category;
  // Fallbacks
  const cityNameRaw = cityObj?.name || city;
  const cityName = convertVowel(cityNameRaw);

  // Parse brand and type from param
  const { carBrand, extraType: parsedExtraType } = parseBrandAndType(extraType);
  let extraTypeLabel = parsedExtraType;
  if (category === "pkw" && parsedExtraType) {
    const found = pkwTypes.find(t => t.name === parsedExtraType);
    if (found) extraTypeLabel = found.name;
  }
  const carBrandLabel = readableCarBrand(carBrand ?? "");
  const fullLabel = carBrandLabel ? `${carBrandLabel} ${extraTypeLabel && (extraTypeLabel?.trim()?.slice(0,1) ?? "" + extraTypeLabel?.slice(1)?.toLowerCase() ?? "")}` : extraTypeLabel;

  // SEO title and description
  const title = `${fullLabel} mieten in ${cityName}`;
  const description = `Jetzt ${fullLabel.toLowerCase()} in ${cityName} günstig mieten. Vergleiche Angebote für ${fullLabel.toLowerCase()} in ${cityName} – flexibel, schnell & sicher. Cabrio, Sportwagen, SUV, Limousine und mehr auf uRent.`;

  // SEO keywords (optional, not used by all search engines but good for completeness)
  const keywords = [
    `${fullLabel} mieten ${cityName}`,
    `${fullLabel} leihen ${cityName}`,
    `${fullLabel} buchen ${cityName}`,
    `Auto mieten ${cityName}`,
    `Mietwagen ${cityName}`,
    `uRent ${cityName}`,
    `Fahrzeugvermietung ${cityName}`,
    `Günstig mieten ${cityName}`
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}