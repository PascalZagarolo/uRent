import Link from "next/link";
import getCurrentUser from "../../actions/getCurrentUser";

const LoginLayout = async (
    { children }: { children: React.ReactNode }
) => {

   

    return (
        <div className="w-full h-full">
            <div>

                <h3 className="font-semibold text-4xl flex justify-center mt-8">
                    
                        <Link href="/" className="flex ">
                            <p className="text-blue-800">u</p> Rent
                        </Link>
                       
                    
                </h3>



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