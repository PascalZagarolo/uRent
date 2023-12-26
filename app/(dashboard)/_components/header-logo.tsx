import LoginBarHeader from "./login-bar-header";

const Header = () => {
    return ( 
        <div className="flex justify-center  w-full items-center">
            <h3 className="text-4xl flex justify-center mt-4 font-semibold"> 
                <p className="text-blue-800 font-bold">u</p> Rent
            </h3>
            <div className="items-center">
                <LoginBarHeader/>
            </div>
        </div>
     );
}
 
export default Header;