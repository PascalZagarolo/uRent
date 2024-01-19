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
                <div className="">
                    <img
                        className="max-w-[200px] max-h-[200px]"
                        src={imageLink}
                    />
                </div>
            </DialogTrigger>
            <DialogContent>
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