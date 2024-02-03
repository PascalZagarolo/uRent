'use client'

import { Button } from "@/components/ui/button";
import { AlignCenterHorizontal, Book, HeartHandshakeIcon, HomeIcon, User2 } from "lucide-react";

const NavigationBar = () => {
    return (
        <div>
            <div className="flex">

                <div className="p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                    <Button className="" variant="ghost">
                        <HomeIcon className="mr-1 " /> <p className="hidden md:block"> Home </p>
                    </Button>
                </div>

                <div className="p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                    <Button className="" variant="ghost">
                        <User2 className="mr-1" /> <p className="hidden md:block"> Über uns </p>
                    </Button>
                </div>

                <div className="p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                    <Button className="" variant="ghost">
                        <AlignCenterHorizontal className="mr-1" /> <p className="hidden md:block"> Features </p>
                    </Button>
                </div>

                <div className="p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                    <Button className="" variant="ghost">
                        <HeartHandshakeIcon className="mr-1" /> <p className="hidden md:block"> Preise </p>
                    </Button>
                </div>

                <div className="p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                    <Button className="" variant="ghost">
                        <Book className="mr-1" /> <p className="hidden md:block"> Impressum </p>
                    </Button>
                </div>


            </div>
        </div>
    );
}

export default NavigationBar;