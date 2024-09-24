import { cn } from "@/lib/utils";

interface BlogCategorySelectProps {
    currentCategory : string;
    setCurrentCategory : (category : string) => void;
}

const BlogCategorySelect = ({ currentCategory, setCurrentCategory }: BlogCategorySelectProps) => {

    const renderedCategories = [
        {
            label : "Alle",
            value : null
        },
        {
            label : "Inserate",
            value : "inserate"
        }
    ]
    return ( 
        <div>
            <div className="w-full px-8">
                <div className="flex flex-row items-center space-x-8  border-b border-gray-400/50">
                    {renderedCategories.map((category, index) => (
                        <span className="text-sm">
                            <button
                                onClick={() => setCurrentCategory(category.value)}
                                key={index}
                                className={cn("text-base font-semibold text-gray-400 hover:text-gray-200",
                                    currentCategory === category.value ? "text-gray-200 border-b-2 border-gray-200" : ""
                                )}
                            >
                                {category.label}
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default BlogCategorySelect;