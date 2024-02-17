import { db } from "@/utils/db";
import ProfileHeader from "./_components/profile-header";
import ProfileBody from "./_components/profile-body";
import getCurrentUser from "@/actions/getCurrentUser";
import ProfileFooter from "./_components/profile-footer";
import RightSideProfile from "./_components/right-side";
import { Rezension, User } from "@prisma/client";
import ReturnHomePage from "./_components/return-homepage";

type RezensionWithSender = Rezension & {
    sender: User;
  };

const ProfilePage = async ({ params } : { params : { profileId : string }}) => {

    const user = await db.user.findUnique({
        where : {
            id : params.profileId
        }
    })

    const currentUser = await getCurrentUser();

    const ownProfile = currentUser?.id === user.id ? true : false;

    const inserate = await db.inserat.findMany({
        where : {
            userId : params.profileId,
            isPublished : true
        }, include : {
            images : true
        }
    })
    
    
    const rezensionen: RezensionWithSender[] = await db.rezension.findMany({
        where : {
            receiverId : params.profileId
        }, include : {
            sender : true
                   
        }
    })

    

    return ( 
        <div className="min-h-screen bg-[#404040]/10 dark:bg-[#0F0F0F]">
            <div className="w-full p-4">
            <div className="flex p-8 rounded-md border-2 border-gray-300  bg-[#10121a] text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] w-full ">
                <h3 className="text-4xl font-semibold flex justify-start items-center">
                  <div className="mr-4">
                  <ReturnHomePage/> 
                </div>
                     <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  text-[#475aa7] text-5xl">P</p> rofilübersicht
                </h3>

            </div>
            </div>
            <div className="2xl:flex">
            <div className="2xl:w-1/2 mr-8">
            <ProfileHeader 
            currentUser={user}
            user = {user}
            ownProfile = {ownProfile}
            />
            </div>
            
            <div className="2xl:w-1/2 ml-8 mr-8">
            <RightSideProfile
            inserate = {inserate}
            rezensionen  = {rezensionen}
            />
            </div>
            </div>
            

            
        </div>
     );
}
 
export default ProfilePage;