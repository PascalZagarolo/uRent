import { Button } from "@/components/ui/button";
import { motion } from "@/components/motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const Hero = () => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center text-center py-12 md:py-24 max-w-4xl mx-auto px-6"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-6"
      >
        Wir machen Vermieten einfacher denn je
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="text-xl text-gray-300 leading-relaxed mb-8"
      >
        Seit 2023 entwickeln wir uRent, die Plattform für Mieter und Vermieter. 
        Wir bieten dir eine einfache Lösung, um deine Fahrzeuge zu vermieten oder zu mieten.
      </motion.p>
      
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link href="/contact">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white border-none"
          >
            Kontaktiere uns
          </Button>
        </Link>
        <Link href="/pricing">
          <Button 
            variant="outline" 
            size="lg"
            className="border-indigo-500 text-indigo-400 hover:bg-indigo-950/30 hover:text-indigo-300"
          >
            Preise ansehen
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Hero; 