import { useEffect, useState } from "react";
import { AiOutlineCheck, AiFillPushpin } from "react-icons/ai";
import { BiErrorAlt } from "react-icons/bi";
import Header from "../../../hook/header";
import api from "../../../services/api";

import styles from "./styles.module.css";
import Select from "../../../hook/select";
import Loading from "../../../img/Loading2.gif";

const buscarMaterial = async (token, setCheckList) => {
  const response = await api.get("/material", {
    headers: { authorization: `Bearer ${token}` },
  });
  setCheckList(response.data);
};

function Checklist() {
  const [checklist, setCheckList] = useState([]);
  const [notes, setAllNotes] = useState([]);
  const [title, setTitle] = useState([]);
  const [treinamento, setTreinamento] = useState("");
  const [kit, setKit] = useState("");
  const [dataSaida, setDataSaida] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [observacao, setObservacao] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post(
        "/material-criar",
        {
          treinamento,
          kit,
          dataSaida,
          observacao,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setCheckList([...checklist, response.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setTreinamento("");
      setKit("");
      setDataSaida("");
      setObservacao("");
    }
  };

  const handleUpdate = async (id) => {
    await api.put(
      `material-update/${id}`,
      {
        dataEntrega,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    buscarMaterial(token, setCheckList);
  };

  useEffect(() => {
    buscarMaterial(token, setCheckList);
  }, [token]);

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
                required
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
                  "Kit APH",
                  "Kit NR-20",
                  "Kit NR-33",
                  "Kit Brigada",
                ]}
                required
              />
              <br />
              <label htmlFor="dataSaida">Data de Saída</label>
              <br />
              <input
                required
                type="date"
                value={dataSaida}
                onChange={({ target }) => setDataSaida(target.value)}
              />
              <label htmlFor="observacao">Observações</label>
              <br />
              <textarea
                required
                value={observacao}
                onChange={({ target }) => setObservacao(target.value)}
              ></textarea>
              <br />
              {loading ? (
                <img
                  className={styles.Loading}
                  src={Loading}
                  alt="Gif Loading"
                />
              ) : (
                <button type="submit">Salvar</button>
              )}
            </form>
          </div>
          <div className={styles.ContainerRight}>
            <div className={styles.Card}>
              <h1>
                <AiFillPushpin /> Kit Básico
              </h1>
              <ul>
                <li>
                  <AiOutlineCheck className={styles.Icon} />
                  Mochila
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Notebook
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Carregador do
                  Notebook
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Canetas
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Mochila
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Data show
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Passador de Slide
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Pen drive
                </li>
              </ul>
            </div>
            <div className={styles.Card}>
              <h1>
                <AiFillPushpin />
                Kit APH
              </h1>
              <ul>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Prancha Amarela
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Maleta de primeiros
                  socorros
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Boneco simulação
                </li>
              </ul>
            </div>
            <div className={styles.Card}>
              <h1>
                <AiFillPushpin />
                Kit NR-20
              </h1>
              <ul>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Kit Básico
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Extintores
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Queimador /
                  Especifícar o modelo
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Maleta / Isqueiro /
                  Manômetro
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Ascendedor a gás
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Luva / Especifícar
                  quantidade{" "}
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Óculos /
                  Especifícar quantidade{" "}
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Capacete /
                  Especifícar quantidade{" "}
                </li>
              </ul>
            </div>
            <div className={styles.Card}>
              <h1>
                <AiFillPushpin />
                Kit NR-33
              </h1>
              <ul>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Kit Básico
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Kit APH
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Cinto de segurança
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Talabarte
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Equipamento de
                  respiração autônomo
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Maleta Azul /
                  Ferramentaria
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Cordas /
                  Especifícar tamanhos
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Prancha formato
                  concha - Laranja
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Tripé Reclinável
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Detector de Gás
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Luva / Especifícar
                  quantidade{" "}
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Óculos /
                  Especifícar quantidade{" "}
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Capacete /
                  Especifícar quantidade{" "}
                </li>
              </ul>
            </div>
            <div className={styles.Card}>
              <h1>
                <AiFillPushpin />
                Kit Brigada
              </h1>
              <ul>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Kit Básico
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Kit APH
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Extintores
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Queimador /
                  Especifícar o modelo
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Maleta / Isqueiro /
                  Manômetro
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Ascendedor a gás
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Duas Mangueiras
                  1,5m
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Uma Mangueira 2,5m
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Adaptador 2,5 para
                  1,5
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Disjuntor
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Luva / Especifícar
                  quantidade{" "}
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Óculos /
                  Especifícar quantidade{" "}
                </li>
                <li>
                  <AiOutlineCheck className={styles.Icon} /> Capacete /
                  Especifícar quantidade{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <section className={styles.ShowCard}>
          {checklist.length > 0 &&
            checklist.map((item) => (
              <div className={styles.CardTemporario} key={item._id}>
                <h3>
                  Treinamento: <span>{item.treinamento}</span>
                </h3>
                <p>
                  Kit Usado: <span>{item.kit}</span>
                </p>
                <p>
                  Data de Saída: <span>{item.dataSaida}</span>
                </p>
                <p>
                  Observações: <span>{item.observacao}</span>
                </p>
                <p>
                  Estado:{" "}
                  <span className={styles.Span}>
                    {item.estado} <BiErrorAlt className={styles.IconSpan} />{" "}
                  </span>
                </p>
                <p>
                  Data de Entrada:{" "}
                  <span>
                    <input
                      type="date"
                      required
                      value={dataEntrega}
                      onChange={({ target }) => setDataEntrega(target.value)}
                    />
                    <button onClick={() => handleUpdate(item._id)}>
                      Entregue
                    </button>
                  </span>
                </p>
              </div>
            ))}
        </section>
      </main>
    </>
  );
}

export default Checklist;
