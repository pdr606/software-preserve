import { useEffect, useState } from "react";
import Header from "../../../hook/header";
import api from "../../../services/api";

import styles from "./styles.module.css";
import Select from "../../../hook/select";

function Checklist() {
  const [notes, setAllNotes] = useState(null);
  const [title, setTitle] = useState([]);
  const [treinamento, setTreinamento] = useState("");
  const [kit, setKit] = useState("");
  const [dataSaida, setDataSaida] = useState("");
  const [observacao, setObservacao] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const getAllNotes = async () => {
      const response = await api.get("/annotations", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setAllNotes(response.data);
    };

    getAllNotes();
  }, [token]);

  useEffect(() => {
    if (notes) {
      const allTitles = notes.map((item) => item.title);
      setTitle(allTitles);
    }
  }, [notes]);
  return (
    <>
      <Header />
      <main className={styles.ContainerPai}>
        <div className={styles.ContainerFilho}>
          <div className={styles.ContainerLeft}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="treinamento">Treinamento Corrente</label>
              <br />
              <Select
                className={styles.Select}
                value={treinamento}
                setValue={setTreinamento}
                text="Selecione o Treinamento"
                options={title}
              />
              <br />
              <label htmlFor="kit">Kit do Treinamento</label>
              <br />
              <Select
                className={styles.Select}
                value={kit}
                setValue={setKit}
                text="Selecione o Kit do Treinamento"
                options={[
                  "Kit Básico",
                  "Kit NR-20",
                  "Kit NR-33",
                  "Kit Brigada",
                ]}
              />
              <br />
              <label htmlFor="dataSaida">Data de Saída</label>
              <br />
              <input
                type="date"
                value={dataSaida}
                onChange={({ target }) => setDataSaida(target.value)}
              />
              <label htmlFor="observacao">Observações</label>
              <br />
              <textarea
                value={observacao}
                onChange={({ target }) => setObservacao(target.value)}
              ></textarea>
              <br />
              <button type="submit">Salvar</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Checklist;
