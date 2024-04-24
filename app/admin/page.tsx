import db from "@/db/drizzle";
import BreadCrumpPage from "./_components/bread-crump-page";
import GenerateCode from "./_components/generate-code";
import MenuBar from "./_components/menu-bar";
import RenderCodes from "./_components/render-codes";

const AdminPage = async () => {

    const existingCodes = await db.query.giftCode.findMany({
        
    })

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
                    <div className="p-8">
                        <GenerateCode/>
                        <div className="mt-4">
                        <RenderCodes //@ts-ignore 
                        existingCodes={existingCodes}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;