import { userTable } from "@/db/schema";
import DisplayBusinessNames from "../business-render/display-business-names";
import ProfileRenderHeader from "./profile-render-header";
import ProfileDescription from "./profile-description";
import RegisterBusiness from "../register-business";

interface ProfileRenderProps {
    thisUser : typeof userTable.$inferSelect;
    ownProfile : boolean
    currentUserId : string
}

const ProfileRender = ({ thisUser, ownProfile, currentUserId } : ProfileRenderProps) => {
    return ( 

            <div className="flex flex-col">
            <div>
                <ProfileRenderHeader 
                userImage={thisUser.image}
                ownProfile={ownProfile}
                currentUserId={currentUserId}
                />
            </div>
            <div className="flex flex-row items-center w-full space-x-4">
                <div className="w-1/2">
                    <DisplayBusinessNames
                        name={thisUser.name}
                        sharesRealName={thisUser?.sharesRealName}
                        firstName={thisUser?.vorname}
                        lastName={thisUser?.nachname}
                        joinedAt={thisUser?.createdAt}
                    />
                </div>
                <div className="w-1/2 mr-8">
                <RegisterBusiness />
                </div>
            </div>
            <div>
               <ProfileDescription 
                ownProfile={ownProfile}
                user={thisUser}
               />
            </div>
            <div className="mt-8">
                {/* <ContentSwitch 
                ownProfile={ownProfile}
                thisUser={thisUser}
                currentUser = {currentUser}
                /> */}
            </div>
        </div>
       
     );
}
 
export default ProfileRender;