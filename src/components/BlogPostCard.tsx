import { Calendar, Feather } from "lucide-react";
import { postSample } from "../data/post";
import { formatDate } from "../lib/utils";
import { Link } from "react-router-dom";

const BlogPostCard = () => {
  return (
    <Link
      to=""
      className="max-w-md mx-auto mt-10 overflow-hidden rounded-lg shadow-lg relative h-64"
      style={{
        backgroundImage: `url(${postSample.thumbnail})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      <div className="relative h-full p-6 flex flex-col justify-between">
        <div className="flex justify-between">
          <span className="text-white font-semibold flex items-center gap-1">
            <Feather size={16} /> {postSample.author_username}
          </span>
          <span className="text-white font-semibold flex items-center gap-1">
            <Calendar size={16} /> {formatDate(postSample.created_at)}
          </span>
        </div>
        <div className="w-3/4">
          <h1 className="text-2xl font-bold text-white mb-3 line-clamp-2">
            {postSample.title}
          </h1>
          <p className="text-gray-200 text-sm line-clamp-3">
            {postSample.content.slice(0, 150)}...
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
