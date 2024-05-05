import BreadCrumpPage from "../_components/bread-crump-page";
import MenuBar from "../_components/menu-bar";

const CronPage = () => {
    return ( 
        <div className="flex justify-center sm:py-8  sm:px-4">
            <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="min-h-screen">
                    <div>
                    <MenuBar />
                        <div>
                        <BreadCrumpPage />
                        </div>
                    </div>
                    <div className="p-8">
                        
                        <div className="mt-4">
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CronPage;