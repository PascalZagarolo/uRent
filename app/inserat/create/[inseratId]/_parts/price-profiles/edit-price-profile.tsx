import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PencilIcon } from "lucide-react";

interface EditPriceProfileProps {
    priceProfileId : string
}

const EditPriceProfile : React.FC<EditPriceProfileProps> = ({
    priceProfileId
}) => {
    return ( 
        <Dialog>
            <DialogTrigger asChild>
                <Button className="dark:bg-[#1C1C1C] dark:hover:bg-[#191919]">
                <PencilIcon className="w-4 h-4 dark:text-gray-200 dark:hover:text-gray-300" />
                </Button>
                
            </DialogTrigger>
            <DialogContent>
                <div>
                    <div>
                        <h3>

                        </h3>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default EditPriceProfile;