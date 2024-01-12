import { User } from "@prisma/client";
import ProfilAnzeigen from "./profil-anzeigen";
import ProfileDescription from "./profile-description";
import ProfileStatsLayout from "./profile-stats-layout";
import { db } from "@/utils/db";

interface ProfileBodyProps {
    ownProfile : boolean
    user : User
}

const ProfileBody: React.FC<ProfileBodyProps> = async ({
    ownProfile,
    user
}) => {
    const inserate = await db.inserat.findMany({
        where : {
            userId : user.id,
            isPublished : true
        }
    })
    return ( 
        <div className="mt-8 ">
            <div className="justify-center flex">
                <ProfileDescription
                ownProfile={ownProfile}
                />
                
            </div>
            <div className="mt-8">
            <ProfileStatsLayout
            inserate  = { inserate }
            />
            </div>
            <div className="flex justify-center">
            <ProfilAnzeigen/>
            </div>
            
        </div>
     );
}
 
export default ProfileBody;