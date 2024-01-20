import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Messages } from "@prisma/client";


interface AttachmentRenderProps {
    messageWithImage : Messages
}

const AttachmentRender: React.FC<AttachmentRenderProps> = ({
    messageWithImage
}) => {
    return ( 
        <div className="border-black">
            <Dialog>
                <DialogTrigger>
                    <div className="w-[75px] h-[75px] border-black border">
                        <img 
                        src={messageWithImage.image}
                        className="w-full h-full"
                        />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <img 
                    src={messageWithImage.image}
                    />
                </DialogContent>
            </Dialog>
        </div>
     );
}
 
export default AttachmentRender;