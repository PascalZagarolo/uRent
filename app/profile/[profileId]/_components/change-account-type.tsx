import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { userTable } from "@/db/schema";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

interface ChangeAccountTypeProps {
    thisUser : typeof userTable.$inferSelect;
}

const ChangeAccountType : React.FC<ChangeAccountTypeProps> = ({
    thisUser
}) => {

    const isCurrentlyBusines = thisUser?.isBusiness ? true : false;

    return ( 
        <Dialog>
            <DialogTrigger asChild className="text-sm font-medium flex items-center gap-x-2">
               <Button variant="ghost">
               <HiOutlineSwitchHorizontal className="w-4 h-4" /> {isCurrentlyBusines ? "Zum Mieterkonto wechseln" : "Zum Vermieterkonto wechseln"}
               </Button>
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#191919]">
                <div className="">
                    <h3 className="text-md font-semibold flex items-center">
                    <HiOutlineSwitchHorizontal className="w-4 h-4 mr-2" />  {isCurrentlyBusines ? "Zum Mieterkonto wechseln?" : "Zum Vermieterkonto wechseln?"}
                    </h3>
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default ChangeAccountType;