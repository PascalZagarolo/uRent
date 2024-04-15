const Faqs = () => {
    return (

        <div>


            <div className="flex justify-center p-8 bg-[#404040]/10">

                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">
                        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                FAQ - Häufig gestellte Fragen
                            </h3>


                            <div className="mt-8 text-lg p-8 font-semibold">

                            <h1>
                                Themen
                            </h1>
                            <div className="w-full flex justify-center mt-8 gap-8">
                                <a className="w-full flex justify-center font-medium rounded-md p-8 dark:bg-[#141414] 
                                hover:underline hover:cursor-pointer" href="/faqs/bedienung">
                                    Bedienungshilfe
                                </a>
                                
                            </div>
                            <div className="w-full flex justify-center mt-8 gap-8">
                                <a className="w-1/2 flex justify-center font-medium rounded-md p-8 dark:bg-[#141414] 
                                hover:underline hover:cursor-pointer" href="/faqs/mieter">
                                    FAQ - Mieter
                                </a>
                                <a className="w-1/2 flex justify-center font-medium rounded-md p-8 dark:bg-[#141414] 
                                hover:underline hover:cursor-pointer" href="/faqs/vermieter">
                                    FAQ - Vermieter
                                </a>
                            </div>

                            <div className="w-full flex justify-center mt-8 gap-8">
                            <a className="w-1/2 flex justify-center font-medium rounded-md p-8 dark:bg-[#141414] 
                                hover:underline hover:cursor-pointer" href="/faqs/account">
                                    FAQ - Account
                                </a>
                                <a className="w-1/2 flex justify-center font-medium rounded-md p-8 dark:bg-[#141414] 
                                hover:underline hover:cursor-pointer" href="/faqs/inserat">
                                    FAQ - Inserat
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