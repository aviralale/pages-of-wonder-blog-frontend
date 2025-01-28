import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PublicRoute from "./auth/PublicRoute";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
