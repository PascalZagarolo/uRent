import { Badge } from "@/components/ui/badge";
import { blog } from "@/db/schema";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { BsCircleFill } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

interface RenderedBlogsProps {
  foundBlogs: typeof blog.$inferSelect[];
}

const RenderedBlogs = ({ foundBlogs }: RenderedBlogsProps) => {
  const router = useRouter();

  const onClick = (blogId: string) => {
    router.push(`/blog/${blogId}`);
  };

  return (
    <div className="space-y-10">
      {/* Featured Blog */}
      <div
        className="bg-[#222222] rounded-lg shadow-lg overflow-hidden transition-transform hover:shadow-xl cursor-pointer"
        onClick={() => onClick(foundBlogs[0]?.id)}
      >
        {/* Blog Image */}
        <div className="overflow-hidden">
          <Image
            src={foundBlogs[0]?.imageUrl}
            alt="blog image"
            width={1200}
            height={600}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="px-6 pt-6 pb-4">
          <div className="text-xs text-gray-200/60 font-semibold flex items-center">
            uRent <BsCircleFill className="w-1 h-1 mx-2" />{" "}
            <span className="font-medium">
              {format(new Date(foundBlogs[0]?.createdAt), "dd MMMM yyyy", { locale: de })}
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-100 hover:text-indigo-400 transition-colors duration-200 mt-2">
            {foundBlogs[0]?.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mt-2 line-clamp-3" dangerouslySetInnerHTML={{ __html: foundBlogs[0]?.content }}></p>
        </div>

        {/* Meta Information */}
        <div className="px-6 pb-6 flex items-center justify-between text-gray-400 text-sm">
          <span className="flex items-center bg-[#292929] hover:bg-[#323232] p-2 rounded-md text-gray-200 cursor-pointer" onClick={() => onClick(foundBlogs[0]?.id)}>
            Mehr erfahren <ArrowUpRight className="w-4 h-4 ml-2" />
          </span>
          <Badge className="bg-indigo-600 text-gray-100 px-2 py-0.5 rounded-full text-xs">
            {String(foundBlogs[0]?.category ?? "").slice(0, 1).toUpperCase() + String(foundBlogs[0]?.category ?? "").slice(1)}
          </Badge>
        </div>
      </div>

      {/* Additional Blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {foundBlogs.slice(1).map((blog, index) => (
          <div
            key={index}
            className="bg-[#1e1e1e] rounded-lg shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"
            onClick={() => onClick(blog.id)}
          >
            <Image
              src={blog.imageUrl}
              alt="blog image"
              width={400}
              height={200}
              className="w-full h-40 object-cover rounded-t-lg transition-transform hover:scale-105"
            />
            <div className="p-6 space-y-2">
              <div className="text-xs text-gray-200/60 font-semibold flex items-center">
                uRent <BsCircleFill className="w-1 h-1 mx-2" />{" "}
                <span className="font-medium">
                  {format(new Date(blog.createdAt), "dd MMM yyyy", { locale: de })}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-100 line-clamp-2 hover:text-indigo-400 transition-colors duration-200">
                {blog.title}
              </h3>

              <div className="flex items-center justify-between text-gray-400 text-xs mt-2">
                <span className="flex items-center bg-[#292929] hover:bg-[#323232] p-2 rounded-md text-gray-200 cursor-pointer"
                onClick={() => onClick(blog.id)}
                >
                  Mehr erfahren <ArrowUpRight className="w-4 h-4 ml-2" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderedBlogs;
