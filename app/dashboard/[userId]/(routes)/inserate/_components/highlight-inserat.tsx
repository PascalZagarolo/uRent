import { inserat, user } from "@/drizzle/schema";

interface HighlightInseratProps {
    currentUser: typeof user.$inferSelect;
    foundInserate: typeof inserat.$inferSelect[];
}


const HighlightInserat: React.FC<HighlightInseratProps> = ({
    currentUser,
    foundInserate
}) => {

    const hightlightedInserate = foundInserate.filter((inserat : any) => inserat.isPublished && inserat?.isHighlighted);

    return (
        <div className="py-4 pb-8">
            <h1 className="text-md font-semibold">
                Hervorgehobene Inserate
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {hightlightedInserate.map((inserat : any) => (
                    <div className="p-4 dark:bg-[#0F0F0F] rounded-md" key={inserat.id}>1</div>
                ))}
            </div>
            {hightlightedInserate.length === 0 && (
                    <div className="flex justify-center text-sm dark:text-gray-200/60">
                        Keine hervorgehobenen Inserate..
                    </div>
                
                )}
        </div>
    );
}

export default HighlightInserat;