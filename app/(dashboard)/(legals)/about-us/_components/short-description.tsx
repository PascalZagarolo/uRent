import { motion } from "@/components/motion";

const ShortDescription = () => {
    const paragraphVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, staggerChildren: 0.1 }
        }
    };

    const spanVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } }
    };

    return ( 
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={paragraphVariants}
            className="bg-gradient-to-r from-[#1e2130]/80 to-[#1a1d28]/80 p-6 rounded-lg border border-indigo-500/20"
        >
            <div className="font-medium text-gray-200 leading-relaxed">
                <motion.p variants={spanVariants} className="mb-4 text-lg"> 
                    uRent ist die <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-300 font-semibold">zentrale Plattform</span> für alle, die Fahrzeuge mieten oder vermieten möchten oder ihre Fahrzeuge einer breiten Zielgruppe präsentieren wollen.
                </motion.p>
                
                <motion.p variants={spanVariants} className="mb-4">
                    Wir bieten eine speziell entwickelte <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-300 font-semibold">Mietumgebung</span>, die optimal auf die Bedürfnisse von Mietern und Vermietern im Fahrzeugbereich zugeschnitten ist. Ob für private oder gewerbliche Zwecke – bei uRent findest du die ideale Lösung, um Fahrzeuge flexibel und unkompliziert zu mieten oder zu vermieten.
                </motion.p>
                
                <motion.p variants={spanVariants}>
                    Profitiere von <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-300 font-semibold">mehr Sichtbarkeit</span>, einer benutzerfreundlichen Plattform und effizienten Prozessen, die das Mieten und Vermieten von Fahrzeugen so einfach wie möglich machen.
                </motion.p>
            </div>
        </motion.div>
     );
}
 
export default ShortDescription;