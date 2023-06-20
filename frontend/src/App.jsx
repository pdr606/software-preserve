import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componnets/login";
import Home from "./componnets/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
