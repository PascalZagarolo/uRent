
import { getCurrentUserWithNotifications } from "@/actions/getCurrentUserWithNotifications";
import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";

import TransferAccountBody from "./_components/transfer-account-body";

const TransferAccountPage = async () => {

    const currentUser = await getCurrentUserWithNotifications()

    

    return (
        <div className=" dark:bg-[#101114] min-h-screen no-scrollbar">
            {/* <div className="sm:hidden">
                <MobileHeader
                    currentUser={currentUser as any}
                    foundNotifications={currentUser?.notifications}
                />
            </div>
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser as any}
                    foundNotifications={currentUser?.notifications}
                />
            </div> */}
            <div className="flex flex-col justify-center items-center">
                <div className="w-[720px]">
                   <TransferAccountBody />
                </div>
            </div>
        </div>
    );
}

export default TransferAccountPage;