
const Bookings = async ({
    params
}: { params: { userId: string } }) => {

    
    

    // const bookings = await db.query.booking.findMany({
    //     where : (
    //         eq(booking.userId, params.userId)
    //     ), with : {
    //         inserat : {
    //             with : {
    //                 images : true,
    //                 user : true
    //             }
    //         }
    //     }
    // })

    // const currentUser = await getCurrentUser();
    
    return (
            <div className="flex justify-center py-8 px-4 ">
                
                {/* <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className=" min-h-screen">
                    <div>
                        <MenuBar 
                        isBusiness = {currentUser.isBusiness}
                        setCurrentTab={null}
                        />
                        <div>
                            <BreadCrumpPage />
                        </div>
                    </div>
                    

                        <div className="md:p-4 mt-4  rounded-lg ">
                        <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center md:px-0 px-4">
                                <CalendarSearchIcon className="mr-4" /> Meine Buchungen <p className="ml-4 text-lg"> </p>
                            </h3>
                            <p className="text-xs dark:text-gray-200/60 ">
                            Andere Fahrzeuge, bei denen du als Mieter eingetragen wurdest - falls du mal nicht der Vermieter sein solltest.
                            
                            </p>
                            <div className="md:p-4 p-2 md:pb-0 pb-4">
                                {bookings.length > 0 ? (
                                    <BookingRenderList 
                                    //@ts-ignore
                                    bookings={bookings}
                                    />
                                ) : (
                                    <div className="flex justify-center text-gray-200/60 text-sm">
                                        Noch keine Fahrzeuge gebucht...
                                    </div>
                                )}
                            </div>
                        </div>
                        
                    </div>
                </div> */}
            </div>
       
    );
}

export default Bookings;