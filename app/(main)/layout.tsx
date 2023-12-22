import Image from "next/image";

const LoginLayout = (
    {children} : { children : React.ReactNode}
) => {
    return ( 
        <div className="w-full h-full">
            <h3>
                <img src="https://www.dropbox.com/scl/fi/wahybxd3r4csu5vbhtzli/u-rent_wei.PNG?rlkey=s3nd48yxcvli0kd41ftbuusa5&dl=0" alt="logo"/>
            </h3>
            {
                children
            }
        </div>
     );
}
 
export default LoginLayout;