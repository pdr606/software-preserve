import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import api from "../../../services/api";
import Notes from "../../../hook/notes";

function Cronograma() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await api.post("/annotations", {
      title,
      notes,
    });

    setTitle("");
    setNotes("");
    setAllNotes([...allNotes, response.data]);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    console.log(token);

    try {
      setLoading(true);
      const deleteOne = await api.delete(`/annotations/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (deleteOne) {
        setAllNotes(allNotes.filter((note) => note._id !== id));
      }
    } catch (error) {
      console.log("Erro ao deletar");
    } finally {
      setLoading(false);
    }
  };

  const getAllNotes = async () => {
    const response = await api.get("/annotations");
    setAllNotes(response.data);
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <main className={styles.ContainerPai}>
      <div className={styles.ContainerFilho}>
        <div className={styles.ContainerLeft}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Titulo do Cronograma</label>
            <br />
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />{" "}
            <br />
            <label htmlFor="notes">Anotações</label>
            <br />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <br />
            <button type="submit">Salvar</button>
          </form>
        </div>
        <div className={styles.ContainerRight}>
          {allNotes.map((data) => (
            <Notes
              loading={loading}
              handleDelete={handleDelete}
              key={data._id}
              data={data}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Cronograma;
