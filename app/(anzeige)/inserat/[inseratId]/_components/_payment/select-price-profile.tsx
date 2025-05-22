import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock price profiles
const priceProfiles = [
  {
    id: "basic",
    name: "Standard Tarif",
    description: "Ideal für kurze Fahrten. Inklusive 100km/Tag.",
    price: 49,
    perks: ["100km/Tag inklusive", "Vollkasko", "24h Pannenhilfe"]
  },
  {
    id: "flex",
    name: "Flex Tarif",
    description: "Flexible Konditionen für Vielnutzer.",
    price: 65,
    perks: ["250km/Tag inklusive", "Flexible Stornierung", "Premium Support"]
  },
  {
    id: "premium",
    name: "Premium Tarif",
    description: "Maximaler Komfort und Leistung.",
    price: 89,
    perks: ["Unbegrenzte Kilometer", "Premium Versicherung", "VIP Hotline"]
  }
];

const SelectPriceProfile = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6 bg-[#f4f6fa] dark:bg-[#181a22]/80 rounded-2xl">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-indigo-200 mb-1">Preisprofil wählen</h2>
        <p className="text-gray-500 text-sm">Wähle das passende Preisprofil für deine Buchung. Alle Preise inkl. MwSt.</p>
      </div>
      <div className="grid gap-4">
        {priceProfiles.map((profile) => (
          <button
            key={profile.id}
            type="button"
            onClick={() => setSelected(profile.id)}
            className={`relative w-full text-left rounded-2xl border transition-all duration-200 p-5 bg-white/90 dark:bg-[#23263a] shadow-sm hover:shadow-md focus:outline-none flex flex-col gap-2
              ${selected === profile.id ? "border-indigo-500 ring-2 ring-indigo-300 dark:ring-indigo-700" : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-400"}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-semibold text-indigo-800 dark:text-indigo-200">{profile.name}</span>
                <span className="ml-2 text-base font-bold text-indigo-600 dark:text-emerald-400">{profile.price}€</span>
              </div>
              {selected === profile.id && (
                <CheckCircle2 className="w-7 h-7 text-emerald-500 drop-shadow" />
              )}
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm mb-1">{profile.description}</div>
            <ul className="flex flex-wrap gap-2 mt-1">
              {profile.perks.map((perk) => (
                <li key={perk} className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                  {perk}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>
      {selected && (
        <div className="flex justify-end mt-2">
          <Button variant="ghost" size="sm" onClick={() => setSelected(null)} className="text-gray-400 hover:text-red-500">
            Auswahl entfernen
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectPriceProfile;
