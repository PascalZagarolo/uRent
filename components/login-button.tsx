import { Link } from "lucide-react";
import { Button } from "./ui/button";

const LoginButton = () => {
    return ( 
        <Button asChild className="bg-blue-800">
            <Link href="/login">
                Anmelden
            </Link>
        </Button>
     );
}
 
export default LoginButton;