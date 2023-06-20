import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../img/loading.gif";
import LogoPreserve from "../../img/logo-preserve.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3033/login", {
        email,
        password,
      });
      setUser(res);
    } catch (error) {
      setMessage("Ocorreu um erro ao entrar na plataforma");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSubmit(event);
    }
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  }, [message]);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  return (
    <main className={styles.containerPai}>
      <div className={styles.containerFilho}>
        <div className={styles.containerInput}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUpCapture={(e) => handleKey(e)}
          ></input>
          <button onClick={handleSubmit}>Login</button>
          {loading ? (
            <img className={styles.Loading} src={Loading} alt="Gif Loading" />
          ) : (
            <img
              className={styles.LogoPreserve}
              src={LogoPreserve}
              alt="Logo Preserve Soluções em Segurança"
            />
          )}
          {message && <p className={styles.Message}>{message}</p>}
        </div>
      </div>
    </main>
  );
}

export default Login;
