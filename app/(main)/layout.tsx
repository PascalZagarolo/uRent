import Link from "next/link";
import getCurrentUser from "../../actions/getCurrentUser";

const LoginLayout = async (
    { children }: { children: React.ReactNode }
) => {

   

    return (
        <div className="w-full h-full">
            <div className="">

                <h3 className="font-semibold text-5xl flex justify-center mt-8 rounded-md ">
                    
                        <Link href="/" className="flex drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] ">
                            <p className="text-[#414c78]">u</p> Rent
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