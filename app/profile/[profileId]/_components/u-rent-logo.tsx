import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return ( 
        <div className="flex">
            <Button asChild variant="ghost">
                <Link href="/">
                <Image
            src="/LKW-Logo.jpg"
            height="240"
            width="240"
            alt="uRent Logo"
            />
                </Link>
            </Button>
            
        </div>
     );
}
 
export default Logo;