'use client'

import { FaFileContract } from "react-icons/fa6";

const ComparisonPlans = () => {
    return (
        <div className="mt-4">
            <h3 className="text-md font-bold flex gap-x-2">
            <FaFileContract />    Vergleich der Pläne
            </h3>
            <div className="w-full mx-auto mt-2">
                <table className="w-full table-auto">
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
                            <td className="px-4 py-2">Preis</td>
                            <td className="px-4 py-2 text-left font-medium">25 €</td>
                            <td className="px-4 py-2 text-left">39 €</td>
                            <td className="px-4 py-2 text-left">49 €</td>
                        </tr>
                        
                    </tbody>

                    <tbody>
                        <tr className="border-t border-[#232323] font-semibold">
                            <td className="px-4 py-2">Laufzeit</td>
                            <td className="px-4 py-2 text-left font-medium">1 Monat</td>
                            <td className="px-4 py-2 text-left">1 Monat</td>
                            <td className="px-4 py-2 text-left">1 Monat</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ComparisonPlans;