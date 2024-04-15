'use client'

import { CheckIcon, X } from "lucide-react";
import { CheckmarkIcon } from "react-hot-toast";
import { FaFileContract } from "react-icons/fa6";

const ComparisonPlans = () => {
    return (
        <div className="mt-4">
            <h3 className="text-md font-bold flex gap-x-2">
            <FaFileContract />    Vergleich der Pläne
            </h3>
            <div className="w-full mx-auto mt-2">
                <table className="w-full table-auto text-md">
                    <thead>
                        <tr className="dark:bg-[#171717]">
                            <th className="px-4 py-2 text-left"></th>
                            <th className="px-4 py-2 text-left font-medium">Basis</th>
                            <th className="px-4 py-2 text-left">Premium</th>
                            <th className="px-4 py-2 text-left">Enterprise</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Preis</td>
                            <td className="px-4 py-2 text-left font-medium">29 €</td>
                            <td className="px-4 py-2 text-left">39 €</td>
                            <td className="px-4 py-2 text-left">49 €</td>
                        </tr>
                        
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Laufzeit</td>
                            <td className="px-4 py-2 text-left font-medium">1 Monat</td>
                            <td className="px-4 py-2 text-left">1 Monat</td>
                            <td className="px-4 py-2 text-left">1 Monat</td>
                        </tr>
                        
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Inserate erstellen</td>
                            <td className="px-4 py-2 text-left font-medium"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="px-4 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="px-4 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Fahrzeuge und Verfügbarkeiten verwalten</td>
                            <td className="px-4 py-2 text-left font-medium"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="px-4 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="px-4 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Exklusives Geschäftsprofil</td>
                            <td className="px-4 py-2 text-left font-medium"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="px-4 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="px-4 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Vermieter Dashboard</td>
                            <td className="px-4 py-2 text-left font-medium"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="px-4 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="px-4 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Anz. Bilder pro Inserat</td>
                            <td className="px-4 py-2 text-left font-medium">8</td>
                            <td className="px-4 py-2 text-left">12</td>
                            <td className="px-4 py-2 text-left">20</td>
                        </tr>
                        
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Hervorhebung von Inseraten*</td>
                            <td className="px-4 py-2 text-left font-medium"><X className="w-4 h-4 text-rose-800"/></td>
                            <td className="px-4 py-2 text-left">1</td>
                            <td className="px-4 py-2 text-left"> {'<'}2</td>
                        </tr>
                        
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Erste Seite Inserate*</td>
                            <td className="px-4 py-2 text-left font-medium"><X className="w-4 h-4 text-rose-800"/></td>
                            <td className="px-4 py-2 text-left">1</td>
                            <td className="px-4 py-2 text-left"> {'<'}2</td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">uRent Mieter- & Buchungsverwaltungssystem</td>
                            <td className="px-4 py-2 text-left font-medium"><X className="w-4 h-4 text-rose-800"/></td>
                            <td className="px-4 py-2 text-left"><X className="w-4 h-4 text-rose-800"/></td>
                            <td className="px-4 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Enterprise Betriebsstempel</td>
                            <td className="px-4 py-2 text-left font-medium"><X className="w-4 h-4 text-rose-800"/></td>
                            <td className="px-4 py-2 text-left"><X className="w-4 h-4 text-rose-800"/></td>
                            <td className="px-4 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-xs dark:text-gray-200/70 flex">
                    * Die Hervorhebung von Inseraten und die Anzeige als {'"'}Ersteseite-Inserat{'"'} sind an bestimmten Bedingungen 
                    gekoppelt. Für mehr Informationen klicke <p className="px-1 underline">hier</p>
                </div>
            </div>
        </div>
    );
}

export default ComparisonPlans;