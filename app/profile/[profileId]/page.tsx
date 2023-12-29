import { db } from "@/app/utils/db";
import ProfileHeader from "./_components/profile-header";
import ProfileBody from "./_components/profile-body";
import getCurrentUser from "@/app/actions/getCurrentUser";

const ProfilePage = async ({ params } : { params : { profileId : string }}) => {

    const user = await db.user.findUnique({
        where : {
            id : params.profileId
        }
    })

    const currentUser = await getCurrentUser();

    const ownProfile = currentUser.id === user.id ? true : false;

    

    return ( 
        <div>
            <ProfileHeader 
            currentUser={user}
            />

            
            <ProfileBody
            ownProfile = { ownProfile }
            />
        </div>
     );
}
 
export default ProfilePage;