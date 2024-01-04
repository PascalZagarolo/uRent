import { Separator } from "@/components/ui/separator";
import { Images, Inserat, User } from "@prisma/client";


interface InseratRenderProps {
    inserat : Inserat
}

const InseratRender: React.FC<InseratRenderProps> = ({
    inserat
}) => {
    return ( 
        <div>
            <div className="flex justify-start mr-10">
                {inserat.title}
                
            </div>
            <Separator className="w-16 bg-black flex justify-start"/>
            <div className="flex justify-start mt-2">
                <div>
                    {inserat.price}
                </div>
            </div>
        </div>
     );
}
 
export default InseratRender;