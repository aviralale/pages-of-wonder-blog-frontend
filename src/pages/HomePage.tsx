import { useEffect, useState } from "react";
import { axiosInstance } from "../api/api";
import { Post } from "../lib/types";
import BlogPostCard from "../components/BlogPostCard";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/posts");
      setBlogPosts(response.data.results);
      setFilteredPosts(response.data.results);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const filtered = blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author_username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(blogPosts);
    }
    setIsSearching(false);
  }, [searchTerm, blogPosts]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg font-medium text-gray-600">
          Loading posts...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        {/* Header Section */}
        <div className="text-center  ">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Pages of Wonder
          </h1>
          <div className="relative">
            <Navbar />
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                size={20}
              />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-black  transition-colors duration-200 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Search Status */}
        {isSearching ? (
          <div className="text-center text-gray-600 my-8">Searching...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center text-gray-600 my-8">
            <p className="text-lg">No posts found.</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-blue-500 hover:text-blue-600"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          /* Posts Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredPosts.map((post) => (
              <div
                key={`${post.author}${post.category}${post.id}${
                  post.updated_at ? post.updated_at : "0"
                }`}
                className=""
              >
                <BlogPostCard
                  id={post.id}
                  title={post.title}
                  created_at={post.created_at}
                  content={post.content}
                  slug={post.slug}
                  thumbnail={post.thumbnail}
                  author_username={post.author_username}
                  category={post.category}
                  category_name={post.category_name}
                  category_slug={post.category_slug}
                  updated_at={post.updated_at}
                  author={post.author}
                />
              </div>
            ))}
          </div>
        )}

        {/* Posts Count */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-8 text-gray-600">
            Showing {filteredPosts.length} post
            {filteredPosts.length !== 1 && "s"}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
