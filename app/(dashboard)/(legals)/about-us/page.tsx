
import OtherVSUrent from "./_components/others-vs-urent";
import ThreeArgumentsForUrent from "./_components/three-arguments-for-urent";
import ShortDescription from "./_components/short-description";
import { Tabs } from "./_components/tabs";
import Image from "next/image";
import { AnimatedTestimonials } from '../../../../components/ui/animated-testimonials';


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

    return (
        <div>
            <div className="flex justify-center sm:p-8 bg-[#404040]/10">

                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">
                        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-4xl font-semibold flex justify-center items-center gap-x-3">
                                Was ist <div className="font-bold text-gray-200">uRent?</div>
                            </h3>
                            
                            <div>
                                <div className="flex flex-col h-full">
                                    <div className="mt-8">
                                        <ShortDescription />
                                    </div>
                                    <div className="mt-8">
                                        <ThreeArgumentsForUrent />
                                    </div>
                                    <div className="mt-8">
                                        <OtherVSUrent />
                                    </div>
                                    <div className="mt-8 ">
                                       <AnimatedTestimonials testimonials={testimonials}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default AboutUsPage;