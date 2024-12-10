import { Routes, Route } from "react-router";
import App from "../App";
import Chat from "../components/ChatPages";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/about" element={<h1>This is about.</h1>} />
      <Route path="*" element={<h1>404 Page not found.</h1>} />
    </Routes>
  );
};

export default AppRoutes;
