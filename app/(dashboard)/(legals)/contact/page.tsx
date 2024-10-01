import ContactFormular from "./_components/contact-formular";

const ContactPage = () => {
    return (
        <div>


            <div className="flex justify-center sm:p-8 bg-[#404040]/10">
                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">


                        <div className="sm:p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                Kontaktmöglichkeiten
                            </h3>
                            <div className="p-4">
                                Kontaktinformation:
                                <div className="text-sm">
                                    <p>E-mail: <span className="font-semibold">info@urent-rental.com</span></p>
                                </div>
                                <div className="mt-16">
                                    <ContactFormular />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;