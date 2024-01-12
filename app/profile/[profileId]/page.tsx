import { db } from "@/utils/db";
import ProfileHeader from "./_components/profile-header";
import ProfileBody from "./_components/profile-body";
import getCurrentUser from "@/actions/getCurrentUser";
import ProfileFooter from "./_components/profile-footer";

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
            user = { user }
            />

            <ProfileFooter
            user = { user}
            />
        </div>
     );
}
 
export default ProfilePage;