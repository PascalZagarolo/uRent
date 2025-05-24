import { Metadata } from "next";
import { CarFront, Truck, Euro } from "lucide-react";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";
import { cities } from "@/data/cities/getCitites";
import Image from "next/image";

export const dynamic = "force-static";

function convertVowel(name: string) {
  return name
    .replace(/ae/g, "ä")
    .replace(/oe/g, "ö")
    .replace(/ue/g, "ü")
    .replace(/Ae/g, "Ä")
    .replace(/Oe/g, "Ö")
    .replace(/Ue/g, "Ü")
    .replace(/ss/g, "ß");
}

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function slugifyCity(str: string) {
  return str
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/ /g, "-");
}

export async function generateMetadata({ params }: { params: { city: string; category: string } }): Promise<Metadata> {
  const city = decodeURIComponent(params.city || "Stadt");
  const category = decodeURIComponent(params.category || "Fahrzeug");
  const cityDisplay = capitalizeFirst(convertVowel(city));
  const title = `${category.charAt(0).toUpperCase() + category.slice(1)} vermieten in ${cityDisplay}`;
  const description = `Jetzt ${category} in ${cityDisplay} vermieten – Starte sofort mit uRent und erreiche mehr Kunden. Einfach, sicher und flexibel.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://urent.de/vermieten/${city}/${category}`,
      siteName: "uRent",
      type: "website",
    },
  };
}

const categoryIcons: Record<string, any> = {
  pkw: CarFront,
  lkw: Truck,
  transporter: PiVanFill,
  anhaenger: RiCaravanLine,
};

export default function CategoryCityPage({ params }: { params: { city: string; category: string } }) {
  const city = decodeURIComponent(params.city || "Stadt");
  const category = decodeURIComponent(params.category || "Fahrzeug");
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const Icon = categoryIcons[category] || CarFront;

  // Find city object by slugified name
  const cityObj = cities.find(c => slugifyCity(c.name) === city.toLowerCase());
  const cityImage = cityObj?.imageUrl;

  return (
    <div className="bg-gradient-to-b from-[#14151b] to-[#1a1c25] min-h-screen">
      {/* Hero Section (no image background) */}
      <div className="flex justify-center py-12 sm:py-16 px-4 sm:px-8">
        <div className="sm:w-[1044px] w-full">
          <div className="mb-10 text-center">
            <div className="relative inline-block">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
                {categoryLabel} vermieten in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">{
                  convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
                }</span>
              </h1>
              <div className="absolute -bottom-2 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"></div>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-6 font-medium">
              Verdiene Geld mit deinem {categoryLabel} in {
                convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
              }. <br/> uRent macht das Vermieten einfach, sicher und flexibel. <br/> Starte jetzt und erreiche gezielt Mieter in deiner Stadt – maximale Sichtbarkeit, volle Kontrolle, keine versteckten Kosten!
            </p>
            <div className="mt-6">
              <span className="inline-flex items-center px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                3 Monate kostenlos testen
              </span>
            </div>
          </div>

          {/* City Image as visual highlight below hero, no text overlay */}
          {cityImage && (
            <div className="w-full flex justify-center mb-12">
              <div className="w-full sm:w-[900px] rounded-2xl overflow-hidden shadow-xl border-emerald-500/20 border bg-[#181a22]">
                <Image
                  src={cityImage}
                  alt={convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)}
                  width={900}
                  height={320}
                  className="object-cover w-full h-[220px] sm:h-[320px]"
                  style={{ maxHeight: 320, minHeight: 180 }}
                  priority
                />
              </div>
            </div>
          )}

          {/* Value Proposition Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-[#1a1d28]/80 border border-emerald-500/20 rounded-xl p-6 shadow-lg">
              <div className="rounded-full bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                <Euro className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mehr Umsatz in {
                convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
                }</h3>
              <p className="text-gray-300">Nutze ungenutzte Zeiten deines {categoryLabel}s und steigere deine Einnahmen.</p>
            </div>
            <div className="bg-[#1a1d28]/80 border border-emerald-500/20 rounded-xl p-6 shadow-lg">
              <div className="rounded-full bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sichtbarkeit in {
                convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
                }</h3>
              <p className="text-gray-300">Dein {categoryLabel} wird von vielen potenziellen Mietern in {
                convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
                } gefunden.</p>
            </div>
            <div className="bg-[#1a1d28]/80 border border-emerald-500/20 rounded-xl p-6 shadow-lg">
              <div className="rounded-full bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Gezielte Kunden</h3>
              <p className="text-gray-300">Erreiche Menschen, die gezielt nach einem {categoryLabel} in {
                convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
                } suchen.</p>
            </div>
            <div className="bg-[#1a1d28]/80 border border-emerald-500/20 rounded-xl p-6 shadow-lg">
              <div className="rounded-full bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Einfache Verwaltung</h3>
              <p className="text-gray-300">Behalte den Überblick über Buchungen, Verfügbarkeit und Einnahmen.</p>
            </div>
          </div>

          {/* Warum uRent Section */}
          <div className="mb-12 bg-gradient-to-br from-[#192025] to-[#1a1d28] rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Warum uRent in {
                convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
                }?</h2>
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
                      <p className="text-gray-300 mt-1">Du entscheidest über Verfügbarkeit, Preise und Anfragen für dein {categoryLabel}.</p>
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
                      <p className="text-gray-300 mt-1">Unser Dashboard macht die Verwaltung deines {categoryLabel}s in {
                convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
                } einfach und übersichtlich.</p>
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
                      <p className="text-gray-300 mt-1">Werde Teil der wachsenden uRent-Gemeinschaft in {
                convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
                } und ganz Deutschland.</p>
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
                        <span className="text-gray-400">Vermieter vertrauen uRent</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#1a1d28] p-6 rounded-xl border border-emerald-500/10">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div className="ml-4">
                        <span className="block text-3xl font-bold text-white">400+</span>
                        <span className="text-gray-400">{categoryLabel}s auf uRent inseriert</span>
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
          </div>

          {/* How It Works Section */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">So funktioniert{`'`}s</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">In nur wenigen Schritten zu deiner ersten Vermietung in {
                convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
                }</p>
            </div>
            <div className="relative">
              <div className="flex flex-col space-y-16">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">1</div>
                  <div className="flex-1 max-w-2xl">
                    <div className="bg-[#1a1d28]/80 rounded-xl p-8 border border-emerald-500/20 shadow-lg">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Registriere dein {categoryLabel}</h3>
                      <p className="text-gray-300 text-lg">Füge Fotos und Informationen hinzu, um dein {categoryLabel} in {
                convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
                } optimal zu präsentieren.</p>
                    </div>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">2</div>
                  <div className="flex-1 max-w-2xl">
                    <div className="bg-[#1a1d28]/80 rounded-xl p-8 border border-emerald-500/20 shadow-lg">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Lege Verfügbarkeit & Preise fest</h3>
                      <p className="text-gray-300 text-lg">Bestimme, wann dein {categoryLabel} in {
                convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
                } verfügbar ist und zu welchem Preis.</p>
                    </div>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">3</div>
                  <div className="flex-1 max-w-2xl">
                    <div className="bg-[#1a1d28]/80 rounded-xl p-8 border border-emerald-500/20 shadow-lg">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Erhalte Buchungsanfragen</h3>
                      <p className="text-gray-300 text-lg">Interessenten aus {
                convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
                } schicken dir Anfragen, die du annehmen oder ablehnen kannst.</p>
                    </div>
                  </div>
                </div>
                {/* Step 4 */}
                <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">4</div>
                  <div className="flex-1 max-w-2xl">
                    <div className="bg-[#1a1d28]/80 rounded-xl p-8 border border-emerald-500/20 shadow-lg">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Übergabe & Auszahlung</h3>
                      <p className="text-gray-300 text-lg">Nach der erfolgreichen Übergabe regelst du die Bezahlung direkt mit dem Mieter – uRent ist am Zahlungsverkehr nicht beteiligt.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Connecting line */}
              <div className="hidden md:block absolute left-10 top-[4.5rem] bottom-16 w-0.5 bg-gradient-to-b from-emerald-500 to-emerald-500/10"></div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center my-12">
            <div className="bg-[#1a1d28]/80 border border-emerald-500/20 rounded-xl p-8 mb-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Jetzt {categoryLabel} in {
                convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
                } vermieten und profitieren!</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Registriere dich kostenlos und erreiche sofort potenzielle Mieter in {
                convertVowel(city)?.slice(0,1)?.toUpperCase() + convertVowel(city)?.slice(1)
                }. Keine Kreditkarte erforderlich. Jederzeit kündbar.</p>
              <a
                href="/login"
                className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-400 text-white font-bold text-base py-4 px-8 rounded-xl shadow-lg hover:from-emerald-700 hover:to-emerald-500 transition-colors tracking-tight drop-shadow-lg"
              >
                Jetzt starten
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
