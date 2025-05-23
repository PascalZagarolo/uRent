'use client'

import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, ExternalLink, InfoIcon, Lightbulb, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardTips = () => {
    const router = useRouter();

    const tips = [
        {
            id: "1",
            title: "So erstellst du das perfekte Inserat",
            description: "Ein gutes Inserat auf uRent ist der Schlüssel, um schnell Kunden zu gewinnen und deine Fahrzeuge öfter zu vermieten.",
            image: "https://res.cloudinary.com/df1vnhnzp/image/upload/v1731256227/jsqxprg0chz039z1kddh.jpg",
            url: "/blog/70ebfad7-3903-4c06-9b36-2388cd8dc098",
            color: "emerald",
            icon: <Lightbulb className="h-4 w-4" />
        },
        {
            id: "2",
            title: "So benutzt du das Dashboard optimal",
            description: "Finde heraus wie du Buchungen & Verfügbarkieten verwalten kannst, Termine & Aufgaben im Blick behältst und vieles mehr.",
            image: "https://res.cloudinary.com/df1vnhnzp/image/upload/v1731350751/jfzmgdv7syobrlb91z92.jpg",
            url: "https://www.urent-rental.de/blog/4f27b351-1d61-4966-938d-d3f9888eac2e",
            color: "indigo",
            icon: <InfoIcon className="h-4 w-4" />
        },
        {
            id: "3",
            title: "uRent RMS & weitere Zukunftspläne",
            description: "Erfahre mehr über geplante Funktionen und Verbesserungen, die in den nächsten Monaten auf dich zukommen.",
            image: "https://res.cloudinary.com/df1vnhnzp/image/upload/v1731442480/uxcgdspxsyt7l8srzool.webp",
            color: "amber",
            icon: <BookOpen className="h-4 w-4" />
        }
    ];

    const getColorClasses = (color: string) => {
        const colors = {
            emerald: {
                bg: "bg-emerald-100 dark:bg-emerald-900/20",
                text: "text-emerald-800 dark:text-emerald-400",
                border: "border-emerald-500 dark:border-emerald-700"
            },
            indigo: {
                bg: "bg-indigo-100 dark:bg-indigo-900/20",
                text: "text-indigo-800 dark:text-indigo-400",
                border: "border-indigo-500 dark:border-indigo-700"
            },
            amber: {
                bg: "bg-amber-100 dark:bg-amber-900/20",
                text: "text-amber-800 dark:text-amber-400",
                border: "border-amber-500 dark:border-amber-700"
            }
        };
        return colors[color] || colors.emerald;
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tips.map((tip) => {
                    const colorClasses = getColorClasses(tip.color);
                    return (
                        <div 
                            key={tip.id}
                            className="group overflow-hidden rounded-lg bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <img 
                                    src={tip.image}
                                    alt={tip.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium flex items-center ${colorClasses.bg} ${colorClasses.text}`}>
                                    {tip.icon}
                                    <span className="ml-1.5">Tipp</span>
                                </div>
                            </div>
                            
                            <div className="p-4">
                                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2 line-clamp-1">
                                    {tip.title}
                                </h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 min-h-[2rem]">
                                    {tip.description}
                                </p>
                                <a 
                                    href={tip.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center text-xs font-medium ${colorClasses.text} hover:underline`}
                                >
                                    <span>Mehr erfahren</span>
                                    <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="flex justify-center mt-2">
                <a 
                    href="https://www.urent-rental.de/blog" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                    <ExternalLink className="h-3.5 w-3.5 mr-1" />
                    <span>Alle Blogbeiträge ansehen</span>
                </a>
            </div>
        </div>
    );
}

export default DashboardTips;