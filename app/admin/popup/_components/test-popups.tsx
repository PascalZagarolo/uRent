'use client'

import BookingRequestToast from "@/app/(dashboard)/_components/used-toasts/booking-request-toast";
import NewMessageToast from "@/app/(dashboard)/_components/used-toasts/new-message-toast";
import { Button } from "@/components/ui/button";
import { MessageCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import { FaGift } from "react-icons/fa";
import { FcExpired } from "react-icons/fc";
import { RiGlobalFill } from "react-icons/ri";
import { TbMailExclamation } from "react-icons/tb";

const TestPopups = () => {

    const otherUserName = [
        "Max Mustermann",
        "John Doe",
        "Jane Doe",
        "Peter Parker",
        "Clark Kent",
        "Bruce Wayne",
        "Gniesbert Haselmus",
        "Gustav Gans",
        "Pneubert Hinterhuber",
    ]

    const inseratTitle = "VW Golf 7 GTI | Langzeitmiete möglich | 300 PS | 5-Türer | 2021"

    const imageUrl = [
        "https://res.cloudinary.com/df1vnhnzp/image/upload/v1717775601/keibul18qirqzupcxfe4.png",
        "https://res.cloudinary.com/df1vnhnzp/image/upload/v1718094900/h2jn6jqkrxkriryjufmi.jpg",
        "https://lh3.googleusercontent.com/a/ACg8ocK7pUAYzdW9uOnNdv-iMJGNgD2S1x64ebAoZZ0P0a6y7Sax7xPO=s96-c",
        "https://lh3.googleusercontent.com/a/ACg8ocKx-5rK_EQ2jiPM_8WdDBLF7N-k0IVEbZI1PrAwSqekFkhex7U=s96-c",
        "https://res.cloudinary.com/df1vnhnzp/image/upload/v1713388075/upju0lzpazlrofwssnkf.jpg",
        "https://res.cloudinary.com/df1vnhnzp/image/upload/v1716032136/cy0eklvp6nqtg7bgbhvo.jpg",
        "https://res.cloudinary.com/df1vnhnzp/image/upload/v1718094900/h2jn6jqkrxkriryjufmi.jpg",
        "https://res.cloudinary.com/df1vnhnzp/image/upload/v1715687670/rzmpwlprbudcnugmjjhq.jpg",
        "https://lh3.googleusercontent.com/a/ACg8ocKn981z7kbFd7kazAXAb2j8MzPRFGMcrlEErudhG2R8xHw4RA=s96-c",
        "https://lh3.googleusercontent.com/a/ACg8ocLffJMKat_QCxoSd47gBbc_J_RgmGA1gDK1zfzxhC9UMPTk1SIx=s96-cv",
        "https://res.cloudinary.com/df1vnhnzp/image/upload/v1717775601/keibul18qirqzupcxfe4.png",
        "https://res.cloudinary.com/df1vnhnzp/image/upload/v1713459676/japfib3kwdjazhktii3j.jpgv",
        "https://res.cloudinary.com/df1vnhnzp/image/upload/v1713728877/g1km2hjkahtzh0idmilq.jpg",
        "https://res.cloudinary.com/df1vnhnzp/image/upload/v1716406978/tzrp4wfebykyqposohsx.png"

    ]

    const inseratImage = [
        "https://res.cloudinary.com/df1vnhnzp/image/upload/v1716398399/sif4yodgryeij26zvwir.jpg",
        "https://res.cloudinary.com/df1vnhnzp/image/upload/v1716405868/w853jnr9h3zgggdohrya.jpg",
        "https://res.cloudinary.com/df1vnhnzp/image/upload/v1714233338/ystqwtmfyllqy8ignc9x.jpg",
        "https://res.cloudinary.com/df1vnhnzp/image/upload/v1714223886/pcawq8y6k9fm8y5dir0f.jpg"
    ]

    


    const createdNotificationBookingRequest = {
        userId: "111",
        conversationId: "2222",
        notificationType: "MESSAGE",
        content: inseratTitle
    }

    const onMessage = () => {
        const randomNumberImage = Math.floor(Math.random() * 14) + 1;
        const randomNumberTitle = Math.floor(Math.random() * 10) + 1;

        const createdNotificationMessage = {
            userId: "111",
            conversationId: "2222",
            notificationType: "MESSAGE",
            content: otherUserName[randomNumberTitle]
        }

        toast.custom((t) => (
            <NewMessageToast 
                t={t}
                usedImageUrl={imageUrl[randomNumberImage]}
                notification={createdNotificationMessage}
            />
        ))
    }

    const onBookingRequest = () => {

        const randomNumberImage = Math.floor(Math.random() * 3) + 1;
        toast.custom((t) => (
            <BookingRequestToast
                t={t}
                usedImageUrl={inseratImage[randomNumberImage]}
                notification={createdNotificationBookingRequest} />
        ))
    }

    return (
        <div>
            <div>
                <h3 className="text-lg text-gray-200 font-semibold">
                    Globale Popups (von uRent)
                </h3>
            </div>
            <div className="flex flex-row space-x-4 items-center">
                <div className="bg-[#0F0F0F] rounded-md p-4 w-1/4 flex-col space-y-2 border border-[#1F2332]">
                    <div>
                        <h3 className="text-base font-semibold text-gray-200 flex flex-row items-center gap-x-2">
                           <RiGlobalFill  className="w-4 h-4" /> uRent News
                        </h3>
                    </div>
                    <div>
                        <Button className="bg-[#1F2332] hover:bg-[#191c28] text-gray-200 hover:text-gray-300 w-full text-sm"
                        onClick={onMessage}
                        >
                            Popup-Vorschau
                        </Button>
                    </div>
                    <div>
                        <Button className="w-full text-sm bg-[#1C1C1C] text-gray-200 hover:text-gray-200" variant="ghost">
                            Inhaltsvorschau
                        </Button>
                    </div>
                </div>

                <div className="bg-[#0F0F0F] rounded-md p-4 w-1/4 flex-col space-y-2 border border-blue-800">
                    <div>
                        <h3 className="text-base font-semibold text-gray-200 flex flex-row items-center gap-x-2">
                           <FaGift  className="w-4 h-4" /> Abonnement eingelöst
                        </h3>
                    </div>
                    <div>
                        <Button className="bg-blue-800 hover:bg-blue-900 text-gray-200 hover:text-gray-300 w-full text-sm"
                        onClick={onMessage}
                        >
                            Popup-Vorschau
                        </Button>
                    </div>
                    <div>
                        <Button className="w-full text-sm bg-[#1C1C1C] text-gray-200 hover:text-gray-200" variant="ghost">
                            Inhaltsvorschau
                        </Button>
                    </div>
                </div>

                <div className="bg-[#0F0F0F] rounded-md p-4 w-1/4 flex-col space-y-2 border border-rose-800">
                    <div>
                        <h3 className="text-base font-semibold text-gray-200 flex flex-row items-center gap-x-2">
                           <FcExpired   className="w-4 h-4" /> Abo. fast abgelaufen
                        </h3>
                    </div>
                    <div>
                        <Button className="bg-rose-800 hover:bg-rose-900 text-gray-200 hover:text-gray-300 w-full text-sm"
                        onClick={onMessage}
                        >
                            Popup-Vorschau
                        </Button>
                    </div>
                    <div>
                        <Button className="w-full text-sm bg-[#1C1C1C] text-gray-200 hover:text-gray-200" variant="ghost">
                            Inhaltsvorschau
                        </Button>
                    </div>
                </div>

                
            </div>
            <div className="mt-4">
                <h3 className="text-lg text-gray-200 font-semibold">
                    User Popups
                </h3>
            </div>
            <div className="flex flex-row space-x-4 items-center">
                <div className="bg-[#0F0F0F] rounded-md p-4 w-1/4 flex-col space-y-2 border border-indigo-800">
                    <div>
                        <h3 className="text-base font-semibold text-gray-200 flex flex-row items-center gap-x-2">
                           <MessageCircleIcon className="w-4 h-4" /> Nachricht erhalten
                        </h3>
                    </div>
                    <div>
                        <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300 w-full text-sm"
                        onClick={onMessage}
                        >
                            Popup-Vorschau
                        </Button>
                    </div>
                    <div>
                        <Button className="w-full text-sm bg-[#1C1C1C] text-gray-200 hover:text-gray-200" variant="ghost">
                            Inhaltsvorschau
                        </Button>
                    </div>
                </div>

                <div className="bg-[#0F0F0F] rounded-md p-4 w-1/4 flex-col space-y-2 border border-yellow-500">
                    <div>
                        <h3 className="text-base font-semibold text-gray-200 flex flex-row items-center gap-x-2">
                           <TbMailExclamation  className="w-4 h-4" /> Buchungsvorschlag
                        </h3>
                    </div>
                    <div>
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-200 hover:text-gray-300 w-full text-sm"
                        onClick={onBookingRequest}
                        >
                            Popup-Vorschau
                        </Button>
                    </div>
                    <div>
                        <Button className="w-full text-sm bg-[#1C1C1C] text-gray-200 hover:text-gray-200" variant="ghost">
                            Inhaltsvorschau
                        </Button>
                    </div>
                </div>

                

                
            </div>
        </div>
    );
}

export default TestPopups;