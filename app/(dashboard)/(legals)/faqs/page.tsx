const Faqs = () => {
    return (

        <div>


            <div className="flex justify-center sm:p-8 bg-[#404040]/10">

                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">
                        <div className="sm:p-4 p-2 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                FAQ - Häufig gestellte Fragen
                            </h3>


                            <div className="sm:mt-8 mt-4 text-lg sm:p-8 p-2 font-semibold">
                                <div className="text-md">
                                    <h1>
                                        Willkommen bei den häufig gestellten Fragen {`(`}FAQs{`)`} von uRent!
                                    </h1>
                                    <div className=" font-normal text-sm text-gray-200/90">
                                        Wir haben diese Seite zusammengestellt, um Ihnen bei allen Fragen und Anliegen 
                                        rund um unsere Mietservices weiterzuhelfen. <br/>
                                        Hier finden Sie Antworten auf die am häufigsten gestellten Fragen unserer Kunden, 
                                        die Ihnen helfen können, Ihre Mieterfahrung so reibungslos wie möglich zu gestalten.<br/> <br/>

                                        Sollten Sie hier keine Antwort auf Ihre Frage finden oder weitere Unterstützung benötigen, zögern Sie bitte nicht, uns direkt zu kontaktieren. Unser Support-Team steht Ihnen unter der E-Mail-Adresse support@urent-rental.de gerne zur Verfügung.
                                        <br/><br/>
                                        Vielen Dank, dass Sie sich für uRent entschieden haben!
                                    </div>
                                </div>
                                <h1 className="mt-8">
                                    Themen
                                </h1>
                                <div className="w-full flex justify-center  mt-2 gap-8">
                                    <a className="w-full flex justify-center font-medium rounded-md p-8 dark:bg-[#141414] 
                                hover:underline hover:cursor-pointer" href="/faqs/bedienung">
                                        Bedienungshilfe
                                    </a>

                                </div>
                                <div className="w-full flex justify-center sm:mt-8 mt-2 gap-8">
                                    <a className="w-full flex justify-center font-medium rounded-md p-8 dark:bg-[#141414] 
                                hover:underline hover:cursor-pointer" href="/faqs/bookings">
                                        uRent - Buchungssystem
                                    </a>

                                </div>
                                <div className="w-full sm:flex justify-center sm:mt-8 mt-4 gap-8 space-y-4 sm:space-y-0">
                                    <a className="w-full sm:w-1/2 flex justify-center font-medium rounded-md p-8 dark:bg-[#141414] 
                                hover:underline hover:cursor-pointer" href="/faqs/mieter">
                                        FAQ - Mieter
                                    </a>
                                    <a className="w-full sm:w-1/2 flex justify-center font-medium rounded-md p-8 dark:bg-[#141414] 
                                hover:underline hover:cursor-pointer" href="/faqs/vermieter">
                                        FAQ - Vermieter
                                    </a>
                                </div>



                            </div>

                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}

export default Faqs;