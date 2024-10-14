import db from "@/db/drizzle";
import FaqCategoryRender from "./_components/category-render";
import CategorySwitch from "./_components/category-switch";
import FurtherInformations from "./_components/further-informations";
import SearchFaqs from "./_components/search-faqs";
import { eq } from "drizzle-orm";
import { faqs } from "@/db/schema";

const Faqs = async () => {

    
    const findMatchingFaqs = await db.query.faqs.findMany();

    

    return (

        <div>


            <div className="flex justify-center sm:p-8 bg-[#404040]/10">

                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <CategorySwitch foundFaqs={findMatchingFaqs} />
                </div>
            </div>
        </div>
    );
}

export default Faqs;