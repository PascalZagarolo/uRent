import { Badge } from "@/components/ui/badge";
import { blog } from "@/db/schema";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface RenderedBlogsProps {
    foundBlogs: typeof blog.$inferSelect[]
}

const RenderedBlogs = ({ foundBlogs }: RenderedBlogsProps) => {

  const router = useRouter();

  const onClick = (blogId : string) => {
    router.push(`/blog/${blogId}`);
  }

    return (
        <div>
            <div className="bg-[#242424] p-6 rounded-lg shadow-xl transition-transform transform hover:scale-[1.03] hover:shadow-2xl"
            onClick={() => {onClick(foundBlogs[0]?.id)}}
            >
        <div className="flex flex-row items-center "
        
        >
            <div>
                <img
                src="uRent.png"
                alt="logo"
                width={40}
                height={40}
                className="rounded-full shadow-2xl  border"
                />
            </div>
            <div className="font-semibold pl-4">
                uRent (Author)
            </div>
          <div className="ml-auto flex flex-row items-center space-x-8">
          <div className="text-sm text-gray-400 font-semibold">
            {format(new Date(foundBlogs[0]?.createdAt), "dd. MMMM yyyy")}
          </div>
          <div className="ml-auto">
            <Badge className="bg-indigo-800 text-gray-200">
              {foundBlogs[0]?.category}
            </Badge>
          </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg mt-2">
          <img
            src={foundBlogs[0]?.imageUrl}
            alt="blog image"
            width={1200}
            height={1000}
            className="w-full h-80 object-fill rounded-lg"
          />
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-white hover:text-indigo-500 transition-colors duration-300">
            {foundBlogs[0]?.title}
          </h3>
          <p className="text-sm text-gray-400 mt-2 line-clamp-3">
            {foundBlogs[0]?.content}
          </p>
        </div>
      </div>
            <div>
                {foundBlogs.slice(1, foundBlogs.length).map((blog, index) => (
                    <div key={index}>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default RenderedBlogs;