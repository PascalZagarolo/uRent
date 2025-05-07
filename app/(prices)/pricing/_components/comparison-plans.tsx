'use client'

import { CheckIcon, X } from "lucide-react";
import { CheckmarkIcon } from "react-hot-toast";
import { FaFileContract } from "react-icons/fa6";



const ComparisonPlans = () => {
    return (
        <div className="mt-8 w-full">
            <div className="rounded-2xl p-8 w-full shadow-2xl  bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-[#23244a] dark:via-[#181a2a] dark:to-[#23244a]">
                <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-600 shadow-lg">
                        <FaFileContract className="w-7 h-7 text-white" />
                    </span>
                    <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-700">Vergleich der Pläne</h3>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[600px] text-sm rounded-xl overflow-hidden bg-white dark:bg-[#181a2a]">
                        <thead>
                            <tr className="dark:bg-[#171717] bg-indigo-50/60">
                                <th className="min-w-[120px] md:px-4 px-2 py-4 text-left"></th>
                                <th className="min-w-[120px] md:px-4 px-2 py-4 text-left font-bold text-indigo-700 dark:text-indigo-200">Basis</th>
                                <th className="min-w-[120px] md:px-4 px-2 py-4 text-left font-bold text-indigo-800 dark:text-indigo-100 relative">
                                    Premium
                                </th>
                                <th className="min-w-[120px] px-2 pr-4 py-4 text-left font-bold text-indigo-700 dark:text-indigo-200">Enterprise</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="font-semibold hover:bg-indigo-50/40 dark:hover:bg-indigo-900/30 transition-all">
                                <td className="px-4 py-4 font-medium max-w-[200px]">Laufzeit</td>
                                <td className="md:px-4 px-2 py-4 text-left whitespace-nowrap">1 Monat</td>
                                <td className="md:px-4 px-2 py-4 text-left">1 Monat</td>
                                <td className="md:px-4 px-2 py-4 text-left">1 Monat</td>
                            </tr>
                            <tr className="font-semibold hover:bg-indigo-50/40 dark:hover:bg-indigo-900/30 transition-all">
                                <td className="px-4 py-4 font-medium max-w-[200px]">Inserate <br className="md:hidden block"/> erstellen</td>
                                <td className="md:px-4 px-2 py-4 text-left font-medium"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                                <td className="md:px-4 px-2 py-4 text-left"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                                <td className="md:px-4 px-2 py-4 text-left"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                            </tr>
                            <tr className="font-semibold hover:bg-indigo-50/40 dark:hover:bg-indigo-900/30 transition-all w-full">
                                <td className="px-4 py-4 font-medium max-w-[200px]">Fahrzeuge <br className="block md:hidden"/> und <br className="md:hidden block"/> Verfügbar<br className="block md:hidden"/>keiten verwalten</td>
                                <td className="md:px-4 px-2 py-4 text-left font-medium"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                                <td className="md:px-4 px-2 py-4 text-left"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                                <td className="md:px-4 px-2 py-4 text-left"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                            </tr>
                            <tr className="font-semibold hover:bg-indigo-50/40 dark:hover:bg-indigo-900/30 transition-all">
                                <td className="px-4 py-4 font-medium max-w-[200px]">Exklusives <br className="block md:hidden"/>Geschäftsprofil</td>
                                <td className="md:px-4 px-2 py-4 text-left font-medium"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                                <td className="md:px-4 px-2 py-4 text-left"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                                <td className="md:px-4 px-2 py-4 text-left"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                            </tr>
                            <tr className="font-semibold hover:bg-indigo-50/40 dark:hover:bg-indigo-900/30 transition-all">
                                <td className="px-4 py-4 font-medium max-w-[200px]">Vermieter<br className="block md:hidden"/> Dashboard</td>
                                <td className="md:px-4 px-2 py-4 text-left font-medium"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                                <td className="md:px-4 px-2 py-4 text-left"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                                <td className="md:px-4 px-2 py-4 text-left"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                            </tr>
                            <tr className="font-semibold hover:bg-indigo-50/40 dark:hover:bg-indigo-900/30 transition-all">
                                <td className="px-4 py-4 font-medium max-w-[200px]">Anz. Bilder <br className="md:hidden block"/> pro Inserat</td>
                                <td className="md:px-4 px-2 py-4 text-left font-medium">8</td>
                                <td className="md:px-4 px-2 py-4 text-left">12</td>
                                <td className="md:px-4 px-2 py-4 text-left">20</td>
                            </tr>
                            <tr className="font-semibold hover:bg-indigo-50/40 dark:hover:bg-indigo-900/30 transition-all">
                                <td className="px-4 py-4 font-medium max-w-[200px]">Hervorhebung <br className="block md:hidden"/> von Inseraten*</td>
                                <td className="md:px-4 px-2 py-4 text-left font-medium"><X className="w-5 h-5 text-rose-800"/></td>
                                <td className="md:px-4 px-2 py-4 text-left">1</td>
                                <td className="md:px-4 px-2 py-4 text-left">2</td>
                            </tr>
                            <tr className="font-semibold hover:bg-indigo-50/40 dark:hover:bg-indigo-900/30 transition-all">
                                <td className="px-4 py-4 font-medium max-w-[200px]">Inserats<br className="md:hidden block"/>priorisierung <br className="md:hidden block"/> bei der Suche*</td>
                                <td className="md:px-4 px-2 py-4 text-left font-medium"><X className="w-5 h-5 text-rose-800"/></td>
                                <td className="md:px-4 px-2 py-4 text-left"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                                <td className="md:px-4 px-2 py-4 text-left"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                            </tr>
                            <tr className="font-semibold hover:bg-indigo-50/40 dark:hover:bg-indigo-900/30 transition-all">
                                <td className="px-4 py-4 font-medium max-w-[200px]">uRent <br className="block md:hidden"/> Mieter- & Buchungs<br className="block md:hidden"/>verwaltungs<br className="block md:hidden"/>system</td>
                                <td className="md:px-4 px-2 py-4 text-left font-medium"><X className="w-5 h-5 text-rose-800"/></td>
                                <td className="md:px-4 px-2 py-4 text-left"><X className="w-5 h-5 text-rose-800"/></td>
                                <td className="md:px-4 px-2 py-4 text-left"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                            </tr>
                            <tr className="font-semibold hover:bg-indigo-50/40 dark:hover:bg-indigo-900/30 transition-all">
                                <td className="px-4 py-4 font-medium max-w-[200px]">Enterprise Betriebsstempel</td>
                                <td className="md:px-4 px-2 py-4 text-left font-medium"><X className="w-5 h-5 text-rose-800"/></td>
                                <td className="md:px-4 px-2 py-4 text-left"><X className="w-5 h-5 text-rose-800"/></td>
                                <td className="md:px-4 px-2 py-4 text-left"><CheckIcon className="w-5 h-5 text-emerald-600" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="text-xs dark:text-gray-200/70 text-indigo-900/80 bg-indigo-50/60 dark:bg-indigo-900/40 rounded-xl mt-6 p-4 md:p-6">
                    * Die Hervorhebung von Inseraten und die Suchpriorisierung des Inserates sind an bestimmte Bedingungen gekoppelt.<br />
                    Für mehr Informationen klicke <a className="underline px-1" target="_blank" href="/faqs/plan-features">hier</a>
                </div>
            </div>
        </div>
    );
}

export default ComparisonPlans;