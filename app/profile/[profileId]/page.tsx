import { db } from "@/utils/db";
import ProfileHeader from "./_components/profile-header";
import ProfileBody from "./_components/profile-body";
import getCurrentUser from "@/actions/getCurrentUser";
import ProfileFooter from "./_components/profile-footer";
import RightSideProfile from "./_components/right-side";

const ProfilePage = async ({ params } : { params : { profileId : string }}) => {

    const user = await db.user.findUnique({
        where : {
            id : params.profileId
        }
    })

    const currentUser = await getCurrentUser();

    const ownProfile = currentUser.id === user.id ? true : false;

    const inserate = await db.inserat.findMany({
        where : {
            userId : params.profileId,
            isPublished : true
        }, include : {
            images : true
        }
    })

    

    return ( 
        <div className="min-h-screen bg-[#404040]/10 flex">
            <div className="w-1/2 mr-8">
            <ProfileHeader 
            currentUser={user}
            user = {user}
            />
            </div>

            <div className="w-1/2 ml-8 mr-16">
            <RightSideProfile
            inserate = {inserate}
            />
            </div>
            

            
        </div>
     );
}
 
export default ProfilePage;