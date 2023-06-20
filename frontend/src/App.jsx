import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componnets/login";
import Home from "./componnets/home";
import { UserProvider } from "./context/userContext";
import { PrivateProvider } from "./routes/private";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateProvider>
                <Home />
              </PrivateProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
