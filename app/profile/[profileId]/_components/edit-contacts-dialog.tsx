import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Contact2Icon, Share2Icon } from "lucide-react";

const EditContactsDialog = () => {
    return ( 
        <Dialog>
            <DialogTrigger asChild>
            <Button className="text-xs hover:underline" variant="ghost" size="sm">
                      <Share2Icon className="w-4 h-4 mr-2" />  Kontakte verwalten
                    </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-[#191919] dark:text-gray-200 text-gray-700 dark:border-none">
            <div>
                <h1 className="flex items-center font-semibold">
                    <Contact2Icon className="w-4 h-4 mr-2" /> Kontakte verwalten
                </h1>
                <p className="text-xs dark:text-gray-200/70">
                    Verwalte deine Kontaktdaten. Angegebene Kontaktdaten werden öffentlich auf deinem Profil angezeigt.
                </p>
            </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default EditContactsDialog;