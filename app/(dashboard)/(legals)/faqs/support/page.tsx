import BackToFaqs from "./_components/back-to-faqs";
import SupportContactFormular from "./_components/contact-formular";


const SupportPage = () => {
    return (
        <div>
            <div className="flex justify-center sm:p-8 bg-[#404040]/10">
                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">
                        <div className="sm:p-4 p-2 mt-4  rounded-lg ">
                            <div>
                                <BackToFaqs />
                            </div>
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center mt-4">
                                Support - Hilfe & Kontakt
                            </h3>
                            <p className="text-xs text-gray-200/60">
                                Falls du Fragen oder Anregungen hast, kannst du uns gerne über das Kontaktformular kontaktieren. <br />
                                Wir werden uns so schnell wie möglich bei ihnen melden.
                            </p>
                            <div className="mt-8">
                                <SupportContactFormular />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupportPage;