import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { message } from "@/db/schema";



interface AttachmentRenderProps {
    messageWithImage : typeof message.$inferSelect
}

const AttachmentRender: React.FC<AttachmentRenderProps> = ({
    messageWithImage
}) => {
    return ( 
        <div className="border-black ">
            <Dialog>
                <DialogTrigger>
                    <div className="w-[75px] h-[75px] border-gray-800 border-2 bg-black">
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
 
export default AttachmentRender;