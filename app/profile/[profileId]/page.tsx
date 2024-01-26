import { db } from "@/utils/db";
import ProfileHeader from "./_components/profile-header";
import ProfileBody from "./_components/profile-body";
import getCurrentUser from "@/actions/getCurrentUser";
import ProfileFooter from "./_components/profile-footer";
import RightSideProfile from "./right-side";

const ProfilePage = async ({ params } : { params : { profileId : string }}) => {

    const user = await db.user.findUnique({
        where : {
            id : params.profileId
        }
    })

    const currentUser = await getCurrentUser();

    const ownProfile = currentUser.id === user.id ? true : false;

    

    return ( 
        <div className="min-h-screen bg-[#404040]/10 flex">
            <div className="w-1/2">
            <ProfileHeader 
            currentUser={user}
            user = {user}
            />
            </div>

            <div>
            <RightSideProfile/>
            </div>
            

            
        </div>
     );
}
 
export default ProfilePage;