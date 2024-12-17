import { FaBrush } from "react-icons/fa";
import { GiCrystalShine } from "react-icons/gi";
import { RiToolsFill } from "react-icons/ri";

const ThreeArgumentsForUrent = () => {
    return ( 
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       
       <div className="bg-[#222222] shadow-lg rounded-lg p-4 ">
           <div className="flex items-center mb-4 h-24">
               <div className="">
                 
                  <GiCrystalShine className="w-8 h-8 mr-4" /> 
               </div>
               <h3 className="text-gray-200 text-xl font-semibold ml-4">
                   Präsenz wo es zählt
               </h3>
           </div>
           <p className="text-gray-200/60">
               uRent ist extra für Vermieter und Mieter entwickelt und die zentrale Anlaufstelle für alle, die Fahrzeuge mieten und vermieten wollen. <br/>
               Vergleiche Preise und finde die passende Lösung für dich egal ob du Mieter oder Vermieter bist.
           </p>
       </div>

      
       <div className="bg-[#222222] shadow-lg rounded-lg p-4 ">
           <div className="flex items-center mb-4 h-24">
           <div className="">
                 
                 <FaBrush className="w-8 h-8" /> 
              </div>
               <h3 className="text-gray-200 text-xl font-semibold ml-4">
                   Gestalte uRent wie du willst
               </h3>
           </div>
           <p className="text-gray-200/60">
               uRent setzt dir keine Vorgaben oder Grenzen wie du deine Fahrzeuge zu mieten oder vermieten hast, sondern gibt dir die Freiheit es so zu machen wie du es willst. 
               Behalte deine Unabhängigkeit und gestalte die Mietprozesse genau wie du sie haben willst.
           </p>
       </div>

       
       <div className="bg-[#222222] shadow-lg rounded-lg p-4 ">
           <div className="flex items-center mb-4 h-24">
               <div>
               <RiToolsFill className="w-8 h-8" />
               </div>
               <h3 className="text-gray-200 text-xl font-semibold ml-4">
                   Tools die dein Leben vereinfachen
               </h3>
           </div>
           <p className="text-gray-200/60">
               Egal ob du Fahrzeuge suchst oder anbietest, uRent bietet dir jederzeit passende Tools an um dir dabei zu helfen dein gewünschtes Fahrzeug zu finden oder zu vermieten. <br/>
               Suche nach Fahrzeugen, vergleiche Preise oder stöbere einfach etwas herum.
           </p>
       </div>
   </div>
        </div>
     );
}
 
export default ThreeArgumentsForUrent;