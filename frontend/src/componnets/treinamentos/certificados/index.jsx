import Header from "../../../hook/header";
import { useEffect, useState } from "react";

import styles from "./styles.module.css";
import Select from "../../../hook/select";
import api from "../../../services/api";

function Certificado() {
  const [selectFile, setSelectFile] = useState(null);
  const [curso, setCurso] = useState("");
  const [arrayInstrutores, setArrayInstrutores] = useState([]);
  const [instrutorEscolhido, setInstrutorEscolhido] = useState("");
  const [arrayNomeInstrutores, setArrayNomeInstrutores] = useState([]);
  const [idParaValidar, setIdParaValidar] = useState("");

  const [certificadoInválido, setCertificadoInvalido] = useState(false);
  const [certificadoValido, setCertificadoValido] = useState("");

  const [nomeInstrutor, setNomeInstrutor] = useState("");
  const [formacaoInstrutor, setFormacaoInstrutor] = useState("");
  const [dadosInstrutor, setDadosInstrutor] = useState("");
  const [assinaturaInstrutor, setAssinaturaInstrutor] = useState("");

  const handleFileUpload = (event) => {
    setSelectFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const instrutorEscolhidoComDados = arrayInstrutores.filter(
      (instrutor) => instrutor.nome === instrutorEscolhido
    );

    const formData = new FormData();

    formData.append("excel", selectFile);
    formData.append("instrutor", JSON.stringify(instrutorEscolhidoComDados));
    formData.append("curso", curso);
    try {
      const response = await fetch("http://localhost:3033/enviar-certificado", {
        method: "POST",
        body: formData,
      });

      console.log(instrutorEscolhidoComDados);

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

    setArrayInstrutores(response.data);
    const instrutores = data.map((instrutor) => instrutor.nome);
    setArrayNomeInstrutores(instrutores);
    setNomeInstrutor("");
    setFormacaoInstrutor("");
    setDadosInstrutor("");
    setAssinaturaInstrutor("");
  };

  const validarCertificado = async (e) => {
    e.preventDefault();
    setCertificadoValido(false);

    console.log("Entrou aqui");

    try {
      const response = await api.post("/validar-certificado", {
        idParaValidar,
      });
      setCertificadoValido(response.data);
    } catch (error) {
      setCertificadoInvalido(true);
      setTimeout(() => {
        setCertificadoInvalido(false);
      }, 3000);
    }
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
            <h2>Gerar Certificados / PDF</h2>
            <form>
              <label htmlFor="curso">Conteudo Programático:</label>
              <br />
              <Select
                className={styles.Select}
                text="Curso"
                options={["NR-06", "NR-10", "NR-35"]}
                setValue={setCurso}
                value={curso}
              />
              <br />
              <label htmlFor="instrutor">Selecione o Instrutor:</label>
              <br />
              <Select
                className={styles.Select}
                text="Instrutor"
                options={arrayNomeInstrutores}
                setValue={setInstrutorEscolhido}
                value={instrutorEscolhido}
              />
              <br />
              <label htmlFor="modelo">Importe os Dados: </label>
              <input
                className={styles.CustomFile}
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
              />
              <button
                className={styles.ContainerLeftButton}
                onClick={handleUpload}
              >
                Enviar
              </button>
            </form>
          </div>
          <div className={styles.CardCadastro}>
            <h2>Cadastre o Instrutor</h2>
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
          <div className={styles.CardCadastro}>
            <h2>Valide seu ID</h2>
            <form onSubmit={validarCertificado}>
              <label htmlFor="id">Digite o ID do Certificado:</label>
              <br />
              <input
                value={idParaValidar}
                onChange={({ target }) => setIdParaValidar(target.value)}
                type="text"
                name="id"
                id="id"
                placeholder="a8248dj2810aakd3883"
              />
              <br />
              <button type="submit" className={styles.BuscarButton}>
                Fazer Busca
              </button>
              {certificadoInválido && (
                <div className={styles.notValid}>
                  <h1>Certificado inválido</h1>
                </div>
              )}
              {certificadoValido ? (
                <div className={styles.isValid}>
                  <h1>Certificado Válido </h1>
                  <p>- {certificadoValido.NOME}</p>
                  <p>- {certificadoValido.LOCALIZACAO}</p>
                  <p>- {certificadoValido.TREINAMENTO}</p>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Certificado;
