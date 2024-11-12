import { Input } from "@/components/ui/input";


interface SearchBlogProps {
    currentTitle,
    setCurrentTitle
}

const SearchBlog = ({
    currentTitle, setCurrentTitle
} : SearchBlogProps) => {
    return (
        <div className="flex justify-center">
            <div className="relative sm:w-3/4 w-full px-4 sm:px-0">
                <Input
                    className="w-full p-4 pl-12 rounded-full bg-[#191919] border-none text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                    placeholder="Nach Blogs suchen..."
                    value={currentTitle}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                />
                <div className="absolute inset-y-0 left-4  items-center sm:flex hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l6-6m0 0l-6-6m6 6h12" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default SearchBlog;