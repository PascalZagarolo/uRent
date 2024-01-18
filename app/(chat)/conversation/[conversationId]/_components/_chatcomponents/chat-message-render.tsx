import { cn } from "@/lib/utils";
import { Messages, User } from "@prisma/client";

interface ChatMessageRenderProps {
    messages: Messages;
    isOwn: boolean;

}

const ChatMessageRender: React.FC<ChatMessageRenderProps> = ({
    messages,
    isOwn,

}) => {

    const formatEuropeanTime = (inputDate: Date): string => {
        const hours = String(inputDate.getHours()).padStart(2, '0');
        const minutes = String(inputDate.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`;
    };


    return (
        <div className="">
            <div className={cn("rounded-lg flex p-2 w-1/2", isOwn ? " mr-8 ml-auto" : " mr-auto")}>
                <div className={cn("min-w-[50px]", isOwn ? "ml-auto" : "mr-auto")}>
                    <div className={cn("p-4 rounded-lg mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] border-2 flex border-gray-300",
                        isOwn ? "bg-emerald-200 ml-auto" : "bg-sky-600 mr-auto")}>

                        <div className="flex justify-center">
                            {messages.content}
                        </div>

                    </div>
                    <p className="text-right mr-1 text-xs mt-1 text-gray-900/60 font-semibold">
                        {formatEuropeanTime(messages.createdAt)} Uhr
                    </p>
                </div>
                
            </div>



        </div>


    );
}

export default ChatMessageRender;