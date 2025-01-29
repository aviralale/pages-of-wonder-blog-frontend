import { useEffect, useState } from "react";
import { Categories, Category } from "../lib/types";
import { axiosInstance } from "../api/api";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [categories, setCategories] = useState<Categories | null>(null);
  const [category, setCategory] = useState<Category[] | []>([]);
  // const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("categories/");
      setCategories(response.data);
      setCategory(response.data.results);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <nav className="flex w-full gap-4 justify-between mb-8">
      {category.map((c) => (
        <NavLink to={c.slug} key={`${c.id}`} className="">
          {c.name}
          <span className="text-xs p-1">({c.posts_count})</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
