import { db } from "@/app/utils/db";
import ProfileHeader from "./_components/profile-header";

const ProfilePage = async ({ params } : { params : { profileId : string }}) => {

    const user = await db.user.findUnique({
        where : {
            id : params.profileId
        }
    })

    return ( 
        <div>
            <ProfileHeader 
            currentUser={user}
            />
        </div>
     );
}
 
export default ProfilePage;