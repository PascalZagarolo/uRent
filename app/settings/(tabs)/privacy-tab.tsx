import { MdOutlinePrivacyTip } from "react-icons/md";
import AccountPrivacy from "../(routes)/privacy/_components/account-privacy";
import DataUsage from "../(routes)/privacy/_components/data-usage";
import { userTable } from '../../../db/schema';

interface PrivacyTabProps {
    currentUser: typeof userTable.$inferSelect | any;
}

const PrivacyTab = ({ currentUser } : PrivacyTabProps) => {
    return (
        <div className="p-4 mt-4  rounded-lg ">
            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                <MdOutlinePrivacyTip className="w-6 h-6 mr-2" /> Privatsphäre  <p className="ml-4 text-lg"> </p>

            </h3>
            <div className="w-full sm:p-4 mt-2 rounded-md">
                
                <div className="pb-4 px-4">
                    <AccountPrivacy
                        thisUser={currentUser}
                    />
                </div>

                <div className="sm:p-4 mt-4 sm:mt-0">
                    <DataUsage
                        usesNewsletter={currentUser?.newsletter}
                        currentUserId={currentUser?.id}
                    />
                </div>

            </div>
        </div>
    );
}

export default PrivacyTab;