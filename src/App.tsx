import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import BlogPostCard from "./components/BlogPostCard";

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Routes>
        <Route path="/" element={<BlogPostCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
