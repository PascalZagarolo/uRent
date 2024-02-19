

import { User } from "@prisma/client";

interface HeaderProps {
    currentUser : User;
}

const Header: React.FC<HeaderProps> = async ({
    currentUser
}) => {


    return (
        <div className="w-full h-[60px] bg-blue-800/80 mt-4 mb-4 outline outline-1 outline-offset-0 items-center">

            <div className="flex justify-center items-center">

                
            </div>

        </div>
    );
}

export default Header;