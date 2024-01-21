import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Messages } from "@prisma/client";


interface AttachmentRenderMobileProps {
    messageWithImage : Messages
}

const AttachmentRenderMobile: React.FC<AttachmentRenderMobileProps> = ({
    messageWithImage
}) => {
    return ( 
        <div className="border-black ">
            <Dialog>
                <DialogTrigger>
                    <div className="w-[70px] h-[70px] border-gray-800 border-2 bg-black">
                        <img 
                        src={messageWithImage.image}
                        className="w-full h-full rounded-md bg-black"
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
 
export default AttachmentRenderMobile;