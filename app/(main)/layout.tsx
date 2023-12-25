import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../utils/auth";

const LoginLayout = async (
    {children} : { children : React.ReactNode}
) => {

    const session = await getServerSession(authOptions)

    return ( 
        <div className="w-full h-full">
            <div>
                <h3 className="font-semibold text-4xl flex justify-center mt-8">
                    <p className="text-blue-800">u</p> Rent
                </h3>
                { session ? (
                    <h2>
                        Eingeloggt
                    </h2>
                ) : (
                    <h2>
                        Nicht eingeloggt
                    </h2>
                )}
            </div>
            <div className="mt-8">
            {
                children
            }
            </div>
            
        </div>
     );
}
 
export default LoginLayout;