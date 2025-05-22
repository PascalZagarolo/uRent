import { useState } from "react";

// Mock extras data
const EXTRAS = [
  { id: 1, name: "Navigationssystem", description: "Modernes GPS-Navi für entspannte Fahrten.", price: 8 },
  { id: 2, name: "Kindersitz", description: "Sicherer Kindersitz für kleine Mitfahrer.", price: 5 },
  { id: 3, name: "Zusatzfahrer", description: "Erlaube einen weiteren Fahrer.", price: 12 },
  { id: 4, name: "Vollkasko Versicherung", description: "Rundum-Schutz für deine Fahrt.", price: 20 },
  { id: 5, name: "Dachbox", description: "Mehr Stauraum für Gepäck.", price: 10 },
];

const SelectExtrasPage = () => {
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);

  const toggleExtra = (id: number) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const total = selectedExtras.reduce(
    (sum, id) => sum + (EXTRAS.find((e) => e.id === id)?.price || 0),
    0
  );

  return (
    <div className="max-w-xl mx-auto p-4 bg-[#f4f6fa] dark:bg-[#181a22]/80 rounded-2xl shadow-md space-y-4">
      <div>
        <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-200 mb-1">Extras auswählen</h2>
        <p className="text-gray-600 dark:text-gray-400 text-xs mb-3">Wähle optionale Extras für deine Buchung aus. Die Preise gelten pro Buchung.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {EXTRAS.map((extra) => {
          const checked = selectedExtras.includes(extra.id);
          return (
            <button
              key={extra.id}
              type="button"
              onClick={() => toggleExtra(extra.id)}
              className={`flex flex-col items-start p-2 rounded-lg border-2 transition-all duration-150 shadow-sm focus:outline-none text-left min-h-[90px]
                ${checked ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40" : "border-indigo-100 dark:border-indigo-900/40 bg-white dark:bg-[#23263a] hover:border-indigo-400"}
              `}
              aria-pressed={checked}
            >
              <div className="flex items-center mb-1 w-full">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleExtra(extra.id)}
                  className="accent-indigo-600 w-4 h-4 mr-2 rounded focus:ring-2 focus:ring-indigo-400"
                  tabIndex={-1}
                  aria-label={extra.name}
                />
                <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-100 truncate w-full" title={extra.name}>{extra.name}</span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-300 mb-1 line-clamp-2 break-words w-full" title={extra.description}>{extra.description}</span>
              <span className="text-sm font-bold text-indigo-700 dark:text-indigo-200 mt-auto">+{extra.price.toFixed(2)} €</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-900/40 flex flex-col gap-1">
        <span className="font-bold text-indigo-700 dark:text-indigo-200 text-base">Zusammenfassung</span>
        {selectedExtras.length === 0 ? (
          <span className="text-gray-500 dark:text-gray-400 text-sm">Keine Extras ausgewählt.</span>
        ) : (
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-sm">
            {selectedExtras.map((id) => {
              const extra = EXTRAS.find((e) => e.id === id);
              return (
                <li key={id} className="flex justify-between items-center">
                  <span>{extra?.name}</span>
                  <span className="font-semibold text-indigo-700 dark:text-indigo-200">+{extra?.price.toFixed(2)} €</span>
                </li>
              );
            })}
          </ul>
        )}
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-indigo-100 dark:border-indigo-900/40">
          <span className="font-bold text-indigo-900 dark:text-indigo-100">Gesamt</span>
          <span className="text-lg font-extrabold text-indigo-700 dark:text-indigo-200">{total.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
};

export default SelectExtrasPage;
