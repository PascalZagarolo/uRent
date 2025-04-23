import { LucideIcon } from "lucide-react";
import { Globe, Paintbrush, SquareCode } from "lucide-react";
import { motion } from "@/components/motion";

interface ArgProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut" 
    }
  }
};

const Arg = ({ title, description, icon: Icon }: ArgProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center justify-center gap-4 text-center p-6 rounded-xl bg-gradient-to-r from-[#1e2130]/80 to-[#1a1d28]/80 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-900/20"
    >
      <motion.div
        variants={iconVariants}
        className="p-3 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700"
      >
        <Icon className="text-3xl text-white" size={24} />
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const ThreeArgumentsForUrent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col md:flex-row gap-6 justify-center"
    >
      <Arg
        title="Online Präsenz"
        description="Mit uRent bist du online präsent und deine Fahrzeuge werden einer breiten Zielgruppe vorgestellt."
        icon={Globe}
      />
      <Arg
        title="Individuell anpassbar"
        description="Passe dein Profil und deine Angebote nach deinen Vorstellungen an und hebe dich von der Konkurrenz ab."
        icon={Paintbrush}
      />
      <Arg
        title="Einfache Tools"
        description="Vereinfache den Mietprozess mit unseren Tools und mache das Vermieten und Mieten so einfach wie möglich."
        icon={SquareCode}
      />
    </motion.div>
  );
};

export default ThreeArgumentsForUrent;