
import LocationBar from "./location-bar";
import SearchItem from "./search-item";
import Inserat from "./add-inserat";
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

                <div className="mr-32 items-center">
                    <Inserat 
                    currentUser={currentUser}
                    />
                </div>

                <div className="flex justify-center">
                    <SearchItem />
                </div>
                <div className="flex justify-center">
                    <LocationBar />
                </div>
            </div>

        </div>
    );
}

export default Header;