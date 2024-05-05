import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { savedSearch } from "@/db/schema";
import { MdContentPasteSearch, MdManageSearch } from "react-icons/md";


interface SavedSearchesShortCutProps {
    savedSearches : typeof savedSearch.$inferSelect[]
}

const SavedSearchShortCut : React.FC<SavedSearchesShortCutProps> = ({
    savedSearches
}) => {

    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <MdContentPasteSearch  className="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#191919]">
                <div className="">
                    <div>
                        <h3 className="flex items-center text-md font-semibold">
                            <MdManageSearch  className="w-4 h-4 mr-2"/> Gespeicherte Suchen
                        </h3>
                    </div>
                    <p className="text-xs dark:text-gray-200/60">
                        Deine gespeicherten Suchen, damit du sie schnell wiederfindest.
                    </p>
                    <div className="mt-4">

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SavedSearchShortCut;