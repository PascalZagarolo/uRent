import ContactFormular from "./_components/contact-formular";

const ContactPage = () => {
    return (
        <div>


            <div className="flex justify-center p-8 bg-[#404040]/10">
                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">


                        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                uRent - Kontakt 
                            </h3>
                            <div className="p-4">
                                Kontaktinformation:
                                <div className="text-sm">
                                    <p>Adresse: <span className="font-semibold">Sonnenstrasse 29, 42653 Solingen</span></p>
                                    <p>Telefon: <span className="font-semibold">+45 1234 5678</span></p>
                                    <p>E-mail: <span className="font-semibold">support@urent-rental.de</span></p>
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