import { Image } from "lucide-react";

const InseratImageUpload = () => {
    return ( 
        <div className="mt-2">
            <h3 className="flex justify-center font-semibold text-xl"> 
            <Image className="mr-2"/>
            Fotos und Anhänge </h3>
            <p className="text-gray-800/50 font-semibold text-sm italic flex justify-center mt-2"> Noch keine Anhänge oder Fotos hinzugefügt... </p>
        </div>
     );
}
 
export default InseratImageUpload;