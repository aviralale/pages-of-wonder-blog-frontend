import { Calendar, Feather } from "lucide-react";
import { formatDate } from "../lib/utils";
import { Link } from "react-router-dom";
import { Post } from "../lib/types";

const BlogPostCard = ({
  title,
  created_at,
  content,
  slug,
  thumbnail,
  author_username,
  category_name,
}: Post) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <Link
        to={`/posts/${slug}`}
        className="block bg-gray-100 border border-black hover:drop-shadow-sm overflow-hidden transition duration-200"
      >
        {/* Image Container */}
        <div
          className="h-48 w-full relative bg-gray-100"
          style={
            thumbnail
              ? {
                  backgroundImage: `url('${thumbnail}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-300/90" />
        </div>

        {/* Content Container */}
        <div className="p-6 bg-gray-100">
          {/* Meta Information */}
          <div className="flex justify-between items-center mb-4 ">
            <span className="flex items-center gap-1">
              <Feather size={16} />
              <span className="text-sm">{author_username}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              <span className="text-sm">{formatDate(created_at)}</span>
            </span>
          </div>

          {/* Title and Content */}
          <h1 className="text-xl font-bold mb-2 line-clamp-2">{title}</h1>
          <p className=" text-sm mb-4 line-clamp-3">
            {truncateText(content, 150)}
          </p>

          {/* Category Tag */}
          <div className="flex justify-between items-center">
            <span className="inline-block bg-slate-700 text-slate-200 text-sm px-3 py-1 rounded-full">
              {category_name}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPostCard;
