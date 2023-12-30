import ProfilAnzeigen from "./profil-anzeigen";
import ProfileDescription from "./profile-description";
import ProfileStatsLayout from "./profile-stats-layout";

interface ProfileBodyProps {
    ownProfile : boolean
}

const ProfileBody: React.FC<ProfileBodyProps> = ({
    ownProfile
}) => {
    return ( 
        <div className="mt-8 ">
            <div className="justify-center flex">
                <ProfileDescription
                ownProfile={ownProfile}
                />
                
            </div>
            <div className="mt-8">
            <ProfileStatsLayout/>
            </div>
            <div className="flex justify-center">
            <ProfilAnzeigen/>
            </div>
            
        </div>
     );
}
 
export default ProfileBody;