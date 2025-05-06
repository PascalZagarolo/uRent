'use client'

import { userTable } from "@/db/schema";
import UploadBusinessPics from "../upload-business-pics";
import DisplayBusinessNames from "./display-business-names";
import BusinessDescriptionNew from "./business-description";
import BusinessContact from "./business-contact";
import ContentSwitch from "./content-switch";


interface BusinessrenderProps {
    thisUser: typeof userTable.$inferSelect & { business };
    ownProfile: boolean;
    currentUser: typeof userTable.$inferSelect;
}

const BusinessRender = ({
    thisUser,
    ownProfile,
    currentUser
}: BusinessrenderProps) => {
    return (
        <div className="flex flex-col w-full space-y-8">
            <div className="w-full">
                <UploadBusinessPics
                    usedImages={thisUser.business.businessImages}
                    businessId={thisUser.business.id}
                    ownProfile={ownProfile}
                    userImage={thisUser.image}
                    currentUser={currentUser}
                />
            </div>
            <div className="grid md:grid-cols-2 gap-8 w-full">
                <div className="w-full">
                <DisplayBusinessNames
                        name={thisUser.name}
                        sharesRealName={thisUser?.sharesRealName}
                        firstName={thisUser?.vorname}
                        lastName={thisUser?.nachname}
                        joinedAt={thisUser?.createdAt}
                        ownProfile={ownProfile}
                    />
                </div>
                <div className="w-full h-full">
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
            <div className="w-full">
                <BusinessDescriptionNew
                    ownProfile={ownProfile}
                    user={thisUser}
                />
            </div>
            <div className="w-full pt-4 border-t border-indigo-900/20">
                <ContentSwitch
                    ownProfile={ownProfile}
                    thisUser={thisUser}
                    currentUser={currentUser}
                />
            </div>
        </div>
    );
}

export default BusinessRender;