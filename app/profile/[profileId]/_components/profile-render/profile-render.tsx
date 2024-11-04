import { userTable } from "@/db/schema";
import DisplayBusinessNames from "../business-render/display-business-names";
import ProfileRenderHeader from "./profile-render-header";
import ProfileDescription from "./profile-description";
import RegisterBusiness from "../register-business";

interface ProfileRenderProps {
    thisUser : typeof userTable.$inferSelect;
    ownProfile : boolean
    currentUser : typeof userTable.$inferSelect;
}

const ProfileRender = ({ thisUser, ownProfile, currentUser } : ProfileRenderProps) => {
    return ( 

            <div className="flex flex-col">
            <div>
                <ProfileRenderHeader 
                userImage={thisUser.image}
                ownProfile={ownProfile}
                currentUser={currentUser}
                />
            </div>
            <div className="md:flex md:flex-row items-center w-full md:space-x-4">
                <div className="md:w-1/2 w-full">
                    <DisplayBusinessNames
                        name={thisUser.name}
                        sharesRealName={thisUser?.sharesRealName}
                        firstName={thisUser?.vorname}
                        lastName={thisUser?.nachname}
                        joinedAt={thisUser?.createdAt}
                        ownProfile={ownProfile}
                    />
                </div>
                <div className="md:w-1/2 w-full mr-8 px-4 md:px-0">
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