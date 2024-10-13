import FaqCategoryRender from "../category-render";
import FurtherInformations from "../further-informations";
import SearchFaqs from "../search-faqs";

const OverviewSection = () => {
    return (
        <div className="  min-h-screen">
            <div className="sm:p-4 p-2 mt-4  rounded-lg ">
                <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                    FAQ - Häufig gestellte Fragen
                </h3>


                <div className="text-lg sm:p-8 p-2 font-semibold">

                    <div className="mt-8">
                        <SearchFaqs />
                    </div>
                    <div className=" mt-4">
                        <h1>
                            Willkommen bei den häufig gestellten Fragen {`(`}FAQs{`)`} von uRent!
                        </h1>
                        <div className=" font-normal text-sm text-gray-200/90">
                            Wir haben diese Seite zusammengestellt, um dir bei allen Fragen und Anliegen
                            rund um unserer Plattform weiterzuhelfen. <br /> <br />
                            Solltest du neu auf uRent sein, könnte das Benutzerhandbuch für dich hilfreich sein. <br />
                            Vielen Dank, dass du dich für uRent entschieden hast!
                        </div>
                    </div>


                    <div>
                        <FaqCategoryRender />
                    </div>
                    <div className="mt-8">
                        <FurtherInformations />
                    </div>


                </div>

            </div>



        </div>
    );
}

export default OverviewSection;