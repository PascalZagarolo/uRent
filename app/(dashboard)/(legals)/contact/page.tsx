import getCurrentUser from "@/actions/getCurrentUser";
import ContactFormular from "./_components/contact-formular";
import ContactOptions from "./_components/contact-options";
import StepPlan from "./_components/step-plan";

const ContactPage = async () => {
    
    const currentUser = await getCurrentUser();

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
                            <div className="mt-16 md:flex md:flex-row  md:px-8 px-4 md:space-x-8">
                                <div className="md:w-3/4 w-full">
                                    <ContactFormular />
                                </div>
                                <div className="md:w-1/4 w-full mt-16 md:mt-0">
                                    <ContactOptions 
                                    currentUser = {currentUser as any}
                                    />
                                </div>

                            </div>
                            <div className="md:mt-32 md:px-8 px-4 mt-16">
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