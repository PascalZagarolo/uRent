import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

interface ChatImageRenderProps {
    imageLink: string
}

const ChatImageRender: React.FC<ChatImageRenderProps> = ({
    imageLink
}) => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="sm:w-[200px] sm:h-[200px] flex justify-center">
                    <img
                        className="sm:max-w-[200px] sm:max-h-[200px]"
                        src={imageLink}
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="">
                <div>
                    <img
                        className="width: auto;
                        height: auto;
                        max-width: 100%;
                        max-height: 100%;"
                        src={imageLink}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ChatImageRender;