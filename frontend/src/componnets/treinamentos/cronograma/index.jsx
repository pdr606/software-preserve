import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import api from "../../../services/api";
import Notes from "../../../hook/notes";
import Header from "../../../hook/header";

function Cronograma() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await api.post("/annotations", {
      title,
      notes,
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    

    setTitle("");
    setNotes("");
    setAllNotes([...allNotes, response.data]);
  };

  const handleDelete = async (id) => {

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
  

  return (
    <>
    <Header/>
    <main className={styles.ContainerPai}>
    <h1 className={styles.Title} >- Gerar e Acompanhar Cronograma -</h1>
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
    <section>
    </section>
    </>
  );
}

export default Cronograma;
