import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";


interface ChatImageRenderProps {
    imageLink: string,
    content? : string
}

const ChatImageRender: React.FC<ChatImageRenderProps> = ({
    imageLink,
    content
}) => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="sm:w-[200px] sm:h-[200px] flex justify-center">
                    <img
                        className="sm:max-w-[200px] sm:max-h-[200px]"
                        src={imageLink}
                    />
                    {content && (
                        <div>
                            {content}
                        </div>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent className="dark:bg-[#101010] flex justify-center border-none">
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