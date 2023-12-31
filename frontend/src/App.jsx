import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componnets/login";
import Home from "./componnets/home";
import { UserProvider } from "./context/userContext";
import { PrivateProvider } from "./routes/private";
import Checklist from "./componnets/treinamentos/checklist";
import Cronograma from "./componnets/treinamentos/cronograma";
import Orcamento from "./componnets/treinamentos/orcamento";
import Certificado from "./componnets/treinamentos/certificados";

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
          <Route
            path="/treinamentos/checklist"
            element={
              <PrivateProvider>
                <Checklist />
              </PrivateProvider>
            }
          />
          <Route
            path="/treinamentos/cronograma"
            element={
              <PrivateProvider>
                <Cronograma />
              </PrivateProvider>
            }
          />
          <Route
            path="/treinamentos/orcamento"
            element={
              <PrivateProvider>
                <Orcamento />
              </PrivateProvider>
            }
          />
          <Route
            path="/treinamentos/certificados"
            element={
              <PrivateProvider>
                <Certificado />
              </PrivateProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
