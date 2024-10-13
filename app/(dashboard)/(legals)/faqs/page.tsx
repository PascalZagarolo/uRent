import FaqCategoryRender from "./_components/category-render";
import CategorySwitch from "./_components/category-switch";
import FurtherInformations from "./_components/further-informations";
import SearchFaqs from "./_components/search-faqs";

const Faqs = () => {
    return (

        <div>


            <div className="flex justify-center sm:p-8 bg-[#404040]/10">

                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <CategorySwitch />
                </div>
            </div>
        </div>
    );
}

export default Faqs;