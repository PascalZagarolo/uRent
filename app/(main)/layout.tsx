import Image from "next/image";

const LoginLayout = (
    {children} : { children : React.ReactNode}
) => {
    return ( 
        <div className="w-full h-full">
            <div>
                <h3 className="font-semibold text-4xl flex justify-center mt-8">
                    <p className="text-blue-800">u</p> Rent
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