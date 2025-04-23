"use client";

import OtherVSUrent from "./_components/others-vs-urent";
import ThreeArgumentsForUrent from "./_components/three-arguments-for-urent";
import ShortDescription from "./_components/short-description";
import { Tabs } from "./_components/tabs";
import Image from "next/image";
import { AnimatedTestimonials } from '../../../../components/ui/animated-testimonials';
import { motion } from "../../../../components/motion";

const AboutUsPage = () => {
    const testimonials = [
        {
          quote:
            "Erstelle ein Inserat und präsentiere deine Fahrzeuge in nur wenigen Minuten. Mit uRent ist es so einfach wie nie zuvor.",
          name: "Inserat schalten & Fahrzeuge präsentieren",
          designation: "In nur wenigen Minuten",
          src: "https://res.cloudinary.com/df1vnhnzp/image/upload/v1734212183/r2evpxliskta15hziyck.gif",
        },
        {
          quote:
            "Wähle aus einer vielzahl an Anbietern, vergleiche Preise, finde das passende Fahrzeug für deine Bedürfnisse und profitiere dabei von den besten Angeboten.",
          name: "Finde dein passendes Fahrzeug",
          designation: "Mit uRent kein Problem.",
          src: "https://res.cloudinary.com/df1vnhnzp/image/upload/v1734265485/y9tu5cncoiovrlr6zshu.gif",
        },
        {
          quote:
            "Profitiere von uRents integriertem Chat-System und trete direkt mit dem Anbieter in Kontakt - schneller als du dein Email Postfach öffnen könntest.",
          name: "Kontaktaufnehmen & Buchen",
          designation: "Direkt und unkompliziert",
          src: "https://res.cloudinary.com/df1vnhnzp/image/upload/v1734262169/fg1aa5bnq7whs44rnmb1.gif",
        },
        {
          quote:
            `uRent bietet die optimalen Tools um deine Fahrzeuge und Buchungen zu verwalten. 
             Mit uRent hast du alles im Blick & kannst dich auf das wesentliche konzentrieren.`,
          name: "Fahrzeuge & Buchungen verwalten",
          designation: "Mit uRent kein Problem.",
          src: "https://res.cloudinary.com/df1vnhnzp/image/upload/v1734272552/maomdysib8wmtd7s1qmb.gif",
        },
    ];

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#14151b] to-[#1a1c25]">
            <div className="flex justify-center py-12 sm:py-16 px-4 sm:px-8">
                <div className="sm:w-[1044px] w-full">
                    {/* Hero Section */}
                    <motion.div 
                        className="mb-16 text-center"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <div className="relative inline-block">
                            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                                Die Zukunft der <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Fahrzeugvermietung</span>
                            </h1>
                            <div className="absolute -bottom-2 w-full h-1 bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full"></div>
                        </div>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-6">
                            uRent revolutioniert die Art und Weise, wie Menschen Fahrzeuge mieten und vermieten - 
                            einfach, schnell und zuverlässig.
                        </p>
                    </motion.div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 gap-16">
                        {/* What is uRent Section */}
                        <motion.section 
                            className="bg-[#1a1d28]/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-indigo-500/10"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeIn}
                        >
                            <div className="flex items-center justify-center mb-8">
                                <h2 className="text-3xl font-bold text-white">Was ist <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">uRent</span>?</h2>
                            </div>
                            <ShortDescription />
                        </motion.section>

                        {/* Three Arguments Section */}
                        <motion.section 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeIn}
                            className="bg-[#1a1d28]/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-indigo-500/10"
                        >
                            <ThreeArgumentsForUrent />
                        </motion.section>

                        {/* Comparison Section */}
                        <motion.section 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeIn}
                            className="bg-[#1a1d28]/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-indigo-500/10"
                        >
                            <OtherVSUrent />
                        </motion.section>

                        {/* Testimonials Section */}
                        <motion.section 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerChildren}
                            className="bg-[#1a1d28]/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-indigo-500/10"
                        >
                            <div className="mb-8 text-center">
                                <h2 className="text-3xl font-bold text-white mb-4">Wie <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">uRent</span> funktioniert</h2>
                                <p className="text-gray-300">Entdecke den einfachen Prozess von der Anzeige bis zur Buchung</p>
                            </div>
                            <AnimatedTestimonials testimonials={testimonials}/>
                        </motion.section>

                        {/* CTA Section */}
                        <motion.section 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeIn}
                            className="text-center my-8"
                        >
                            <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-10 rounded-xl shadow-lg">
                                <h2 className="text-3xl font-bold text-white mb-6">Bereit, es selbst zu erleben?</h2>
                                <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
                                    Vermiete deine Fahrzeuge oder finde genau das, was du brauchst - direkt, einfach und zuverlässig.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a 
                                        href="/login" 
                                        className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        Jetzt anmelden
                                    </a>
                                    <a 
                                        href="/" 
                                        className="inline-block bg-transparent text-white border-2 border-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        Fahrzeuge entdecken
                                    </a>
                                </div>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUsPage;