import { db } from "@/utils/db";
import SwitchThroughAdverts from "./switch-through-adverts";
import { Images, Inserat, User } from "@prisma/client";

interface ProfileFooterProps {
    user : User
}

const ProfileFooter: React.FC<ProfileFooterProps> = async ({
    user
}) => {

    type InseratHandOver = Inserat & { images : Images[] }

    const inserateArray= await db.inserat.findMany({
        where : {
            userId : user.id,
            isPublished : true
        }, include : {
            images : true
                
            
        }
    })

    

    return ( 
        <div className="flex justify-center">
           
            <div className="mt-8 flex justify-center">
            <SwitchThroughAdverts
            inserate = { inserateArray }
            />
            </div>  
            
        </div>
     );
}
 
export default ProfileFooter;