import BreadCrumpPage from "./_components/bread-crump-page";
import GenerateCode from "./_components/generate-code";
import MenuBar from "./_components/menu-bar";

const AdminPage = () => {
    return (
        <div className="flex justify-center py-8 px-4">
            <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="min-h-screen">
                    <div>
                    <MenuBar />
                        <div>
                        <BreadCrumpPage />
                        </div>
                    </div>
                    <div className=" p-8">
                        <GenerateCode/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;