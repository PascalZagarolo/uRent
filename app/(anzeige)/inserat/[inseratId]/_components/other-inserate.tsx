import { Separator } from "@/components/ui/separator";
import { inserat, userTable } from "@/db/schema";
import OtherInserateRender from "./other-inserate-render";
import { LayoutGrid } from "lucide-react";

interface OtherInserateProps {
    thisUser: typeof userTable.$inferSelect,
    inserateArray: typeof inserat.$inferSelect[];
}

const OtherInserate: React.FC<OtherInserateProps> = ({
    thisUser,
    inserateArray
}) => {
    return (
        <div className="bg-gradient-to-b from-[#151823] to-[#1B1F2E] rounded-xl border border-gray-800/30 shadow-lg overflow-hidden">
            <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                        <LayoutGrid className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-sm text-gray-400">Weitere Inserate von</h3>
                        <p className="font-semibold text-gray-200 line-clamp-1">{thisUser?.name}</p>
                    </div>
                </div>
                
                <Separator className="my-3 bg-gray-800/50" />
                
                {inserateArray.length > 0 ? (
                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        {inserateArray.map((pInserat) => (
                            <OtherInserateRender
                                key={pInserat.id}
                                thisInserat={pInserat}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <p className="text-gray-400 text-sm">
                            Keine weiteren Inserate vorhanden
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OtherInserate;