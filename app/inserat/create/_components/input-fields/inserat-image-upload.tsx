'use client'

import { Image } from "lucide-react";
import ImageList from "./image-list";
import { Inserat } from "@prisma/client";


interface InseratImageUploadProps {
    inserat : Inserat;
}

const InseratImageUpload: React.FC<InseratImageUploadProps> = ({
    inserat
}) => {
    return ( 
        <div className="mt-2">
            <h3 className="flex justify-center font-semibold text-xl"> 
            <Image className="mr-2"/>
            Fotos und Anhänge </h3>
            <p className="text-gray-800/50 font-semibold text-sm italic flex justify-center mt-2"> Noch keine Anhänge oder Fotos hinzugefügt... </p>
            <ImageList 
            onEdit = {() => {}}
            onReorder = {() => {}}
            items = {inserat.image || []}
            />
        </div>
     );
}
 
export default InseratImageUpload;