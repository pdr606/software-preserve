import Header from "../../../hook/header";
import { useEffect, useState } from "react";

import styles from "./styles.module.css";
import Select from "../../../hook/select";
import api from "../../../services/api";

function Certificado() {
  const [selectFile, setSelectFile] = useState(null);
  const [curso, setCurso] = useState("");
  const [instrutor, setInstrutor] = useState("");
  const [instrutores, setInstrutores] = useState([]);

  const [nomeInstrutor, setNomeInstrutor] = useState("");
  const [formacaoInstrutor, setFormacaoInstrutor] = useState("");
  const [dadosInstrutor, setDadosInstrutor] = useState("");
  const [assinaturaInstrutor, setAssinaturaInstrutor] = useState("");

  const handleFileUpload = (event) => {
    setSelectFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("excel", selectFile);
    formData.append("instrutor", instrutor);

    console.log(instrutor);
    try {
      const response = await fetch("http://localhost:3033/enviar-certificado", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.startsWith("application/pdf")) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "certificado.pdf";
        link.click();

        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log("Deu ruim", error);
    } finally {
      console.log("acabou");
    }
  };

  const registrarInstrutor = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/criar-instrutor", {
        nome: nomeInstrutor,
        formacao: formacaoInstrutor,
        dados: dadosInstrutor,
        url_foto: assinaturaInstrutor,
      });
      searchInstrutor();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const searchInstrutor = async () => {
    const response = await api.get("/buscar-instrutor");
    const data = response.data;

    const instrutores = data.map((instrutor) => instrutor.nome);
    setInstrutores(instrutores);
    setNomeInstrutor("");
    setFormacaoInstrutor("");
    setDadosInstrutor("");
    setAssinaturaInstrutor("");
  };

  useEffect(() => {
    searchInstrutor();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.Container}>
        <div className={styles.ContainerLeft}>
          <div className={styles.Card}>
            <h1>Gerar Certificados / PDF</h1>
            <Select
              className={styles.Select}
              text="Curso"
              options={["NR-06", "NR-12", "NR-33"]}
              setValue={setCurso}
              value={curso}
            />
            <Select
              className={styles.Select}
              text="Instrutor"
              options={instrutores}
              setValue={setInstrutor}
              value={instrutor}
            />
            <input type="file" accept=".xlsx" onChange={handleFileUpload} />
            <button
              className={styles.ContainerLeftButton}
              onClick={handleUpload}
            >
              Enviar
            </button>
          </div>
          <div className={styles.CardCadastro}>
            <h2>Cadastre o instrutor:</h2>
            <form onSubmit={registrarInstrutor}>
              <label htmlFor="nome">Nome completo:</label>
              <br />
              <input
                type="text"
                name="nome"
                id="nome"
                placeholder="José Afonso Cardoso"
                value={nomeInstrutor}
                onChange={({ target }) => setNomeInstrutor(target.value)}
              />
              <br />
              <label htmlFor="formacao">Formação:</label>
              <br />
              <input
                type="text"
                name="formacao"
                id="formacao"
                placeholder="Instrutor / Tec. Segurança"
                value={formacaoInstrutor}
                onChange={({ target }) => setFormacaoInstrutor(target.value)}
              />
              <br />
              <label htmlFor="dados">MTE ou RG e CPF: </label>
              <br />
              <input
                type="text"
                name="dados"
                id="dados"
                placeholder="MTE 00000 - ES / CPF: 000.000.000-00"
                value={dadosInstrutor}
                onChange={({ target }) => setDadosInstrutor(target.value)}
              />
              <br />
              <label htmlFor="assinatura">
                URL Assinatura (não obrigatorio):
              </label>
              <br />
              <input
                type="text"
                name="assinatura"
                id="assinatura"
                placeholder="http://sirv.com/assinatura-instrutor"
                value={assinaturaInstrutor}
                onChange={({ target }) => setAssinaturaInstrutor(target.value)}
              />
              <br />
              <button className={styles.CardCadastroButton} type="submit">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Certificado;
