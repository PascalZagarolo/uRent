'use client'

import { CheckIcon, X } from "lucide-react";
import { CheckmarkIcon } from "react-hot-toast";
import { FaFileContract } from "react-icons/fa6";



const ComparisonPlans = () => {
    return (
        <div className="mt-4 w-full">
            <h3 className="text-md font-bold flex gap-x-2 md:p-0 p-2">
            <FaFileContract />    Vergleich der Pläne
            </h3>
            <div className="w-full space-y-2 md:p-2 mt-2">
                <table className="w-full md:table-auto text-sm ">
                    <thead>
                        <tr className="dark:bg-[#171717]">
                            <th className="md:px-4 px-2 py-2 text-left"></th>
                            <th className="md:px-4 px-2 py-2 text-left font-medium">Basis</th>
                            <th className="md:px-4 px-2 py-2 text-left">Premium</th>
                            <th className="px-2 pr-4 py-2 text-left">Enterprise</th>
                        </tr>
                    </thead>
                    

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Laufzeit</td>
                            <td className="md:px-4 px-2 py-2 text-left whitespace-nowrap">1 Monat</td>
                            <td className="md:px-4 px-2 py-2 text-left">1 Monat</td>
                            <td className="md:px-4 px-2 py-2 text-left">1 Monat</td>
                        </tr>
                        
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Inserate <br className="md:hidden block"/> erstellen</td>
                            <td className="md:px-4 px-2 py-2 text-left font-medium"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="md:px-4 px-2 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="md:px-4 px-2 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold w-full">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Fahrzeuge <br className="block md:hidden"/> und <br className="md:hidden block"/> Verfügbar<br className="block md:hidden"/>keiten verwalten</td>
                            <td className="md:px-4 px-2 py-2 text-left font-medium"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="md:px-4 px-2 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="md:px-4 px-2 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4  py-2 font-medium max-w-[200px]">Exklusives <br className="block md:hidden"/>Geschäftsprofil</td>
                            <td className="md:px-4 px-2 py-2 text-left font-medium"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="md:px-4 px-2 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="md:px-4 px-2 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Vermieter<br className="block md:hidden"/> Dashboard</td>
                            <td className="md:px-4 px-2 py-2 text-left font-medium"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="md:px-4 px-2 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="md:px-4 px-2 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Anz. Bilder <br className="md:hidden block"/> pro Inserat</td>
                            <td className="md:px-4 px-2 py-2 text-left font-medium">8</td>
                            <td className="md:px-4 px-2 py-2 text-left">12</td>
                            <td className="md:px-4 px-2 py-2 text-left">20</td>
                        </tr>
                        
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Hervorhebung <br className="block md:hidden"/> von Inseraten*</td>
                            <td className="md:px-4 px-2 py-2 text-left font-medium"><X className="w-4 h-4 text-rose-800"/></td>
                            <td className="md:px-4 px-2 py-2 text-left">1</td>
                            <td className="md:px-4 px-2 py-2 text-left"> 2</td>
                        </tr>
                        
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Inserats<br className="md:hidden block"/>priorisierung <br className="md:hidden block"/> bei der Suche*</td>
                            <td className="md:px-4 px-2 py-2 text-left font-medium"><X className="w-4 h-4 text-rose-800"/></td>
                            <td className="md:px-4 px-2 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                            <td className="md:px-4 px-2 py-2 text-left"> <CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">uRent <br className="block md:hidden"/> Mieter- & Buchungs
                            <br className="block md:hidden"/>verwaltungs<br className="block md:hidden"/>system</td>
                            <td className="md:px-4 px-2 py-2 text-left font-medium"><X className="w-4 h-4 text-rose-800"/></td>
                            <td className="md:px-4 px-2 py-2 text-left"><X className="w-4 h-4 text-rose-800"/></td>
                            <td className="md:px-4 px-2 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2 font-medium max-w-[200px]">Enterprise Betriebsstempel</td>
                            <td className="md:px-4 px-2 py-2 text-left font-medium"><X className="w-4 h-4 text-rose-800"/></td>
                            <td className="md:px-4 px-2 py-2 text-left"><X className="w-4 h-4 text-rose-800"/></td>
                            <td className="md:px-4 px-2 py-2 text-left"><CheckIcon className="w-4 h-4 text-emerald-600" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-xs dark:text-gray-200/70  md:p-0 p-2">
                    <div>
                    * Die Hervorhebung von Inseraten und die Suchpriorisierung des Inserates sind an bestimmte Bedingungen 
                    gekoppelt. </div> <div className="flex">Für mehr Informationen klicke <a 
                    className="underline px-1" target="_blank" href="/faqs/plan-features">hier</a></div>
                </div>
            </div>
        </div>
    );
}

export default ComparisonPlans;