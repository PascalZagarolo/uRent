'use client'

import { CheckIcon, X } from "lucide-react";
import { CheckmarkIcon } from "react-hot-toast";
import { FaFileContract } from "react-icons/fa6";



const ComparisonPlans = () => {
    return (
        <div className="mt-4">
            <h3 className="text-md font-bold flex gap-x-2 sm:p-0 p-2">
            <FaFileContract />    Vergleich der Pläne
            </h3>
            <div className="w-full space-y-2 sm:p-2 mt-2">
                <table className="w-full table-auto text-sm ">
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
                        <tr className="border-t border-[#232323] font-semibold w-full">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Fahrzeuge <br className="block sm:hidden"/> und Verfügbar<br className="block sm:hidden"/>keiten verwalten</td>
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
                            <td className="px-4 py-2 font-medium max-w-[200px]">Hervorhebung <br className="block sm:hidden"/> von Inseraten*</td>
                            <td className="px-4 py-2 text-left font-medium"><X className="w-4 h-4 text-rose-800"/></td>
                            <td className="px-4 py-2 text-left">1</td>
                            <td className="px-4 py-2 text-left"> 2</td>
                        </tr>
                        
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Inseratspriorisierung bei der Suche*</td>
                            <td className="px-4 py-2 text-left font-medium"><X className="w-4 h-4 text-rose-800"/></td>
                            <td className="px-4 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="px-4 py-2 text-left"> <CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">uRent <br className="block sm:hidden"/> Mieter- & Buchungs
                            <br className="block sm:hidden"/>verwaltungs<br className="block sm:hidden"/>system</td>
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
                <div className="text-xs dark:text-gray-200/70  sm:p-0 p-2">
                    <div>
                    * Die Hervorhebung von Inseraten und die Suchpriorisierung des Inserates sind an bestimmten Bedingungen 
                    gekoppelt. </div> <div className="flex">Für mehr Informationen klicke <a 
                    className="underline px-1" target="_blank" href="/faqs/plan-features">hier</a></div>
                </div>
            </div>
        </div>
    );
}

export default ComparisonPlans;