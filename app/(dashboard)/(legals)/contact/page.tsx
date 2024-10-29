import ContactFormular from "./_components/contact-formular";
import ContactOptions from "./_components/contact-options";
import StepPlan from "./_components/step-plan";

const ContactPage = () => {
    return (
        <div>


            <div className="flex justify-center sm:p-8 bg-[#404040]/10">
                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">


                        <div className="sm:p-4 mt-4  rounded-lg ">

                            <div className="text-2xl font-semibold text-gray-200 mt-16 text-center">
                                Kontaktiere uRent
                            </div>
                            <p className="text-center text-gray-200/60">
                                Du bist Interessiert an uRent und möchtest mehr über uns erfahren? <br />
                                Wir sind für dich da und freuen uns deine Fragen zu beantworten.
                            </p>
                            <div className="mt-16 flex flex-row  px-8 space-x-8">
                                <div className="w-3/4">
                                    <ContactFormular />
                                </div>
                                <div className="w-1/4">
                                    <ContactOptions />
                                </div>

                            </div>
                            <div className="mt-32 px-8">
                                <StepPlan />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;