'use client'

import { userTable } from "@/db/schema";
import UploadBusinessPics from "../upload-business-pics";
import DisplayBusinessNames from "./display-business-names";
import BusinessDescriptionNew from "./business-description";
import BusinessContact from "./business-contact";
import ContentSwitch from "./content-switch";


interface BusinessrenderProps {
    thisUser: typeof userTable.$inferSelect;
    ownProfile: boolean;
    currentUser : typeof userTable.$inferSelect;
}

const BusinessRender = ({
    thisUser,
    ownProfile,
    currentUser
}: BusinessrenderProps) => {
    return (
        <div className="flex flex-col">
            <div>
                <UploadBusinessPics
                    usedImages={thisUser.business.businessImages}
                    businessId={thisUser.business.id}
                    ownProfile={true}
                    userImage={thisUser.image}
                    currentUserId = {currentUser.id}
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
                <div className="w-1/2">
                    <BusinessContact 
                        telephone={thisUser.business.telephone_number}
                        email={thisUser.business.email}
                        website={thisUser.business.website}
                        fax={thisUser.business.fax}
                        ownProfile={ownProfile}
                        thisBusiness={thisUser.business}
                    />
                </div>
            </div>
            <div>
                <BusinessDescriptionNew
                    ownProfile={ownProfile}
                    user={thisUser}
                />
            </div>
            <div className="mt-8">
                <ContentSwitch 
                ownProfile={ownProfile}
                thisUser={thisUser}
                currentUser = {currentUser}
                />
            </div>
        </div>
    );
}

export default BusinessRender;