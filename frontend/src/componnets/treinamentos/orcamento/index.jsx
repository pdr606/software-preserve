import { useState, useEffect } from "react";
import Select from "../../../hook/select";
import styles from './styles.module.css'
import Loading from '../../../img/Loading.gif'
import Header from "../../../hook/header";

function Orcamento() {
  const [curso, setCurso] = useState("");
  const [total, setTotal] = useState("0");
  const [loading, setLoading] = useState(false)

  const [formValues, setFormValue] = useState({
    solicitante: "",
    email: "",
    observacao: "",
    alunos: "",
    horas: "",
    macacoes: "",
    gasolina: "",
    diesel: "",
    porcentagem: "",
    extintores: "",
  });

  useEffect(() => {
    if (curso === "BRIGADA" || curso === "NR-33") {
      let totalAlunos = +formValues.alunos * 180;
      let totalMacacoes = +formValues.macacoes * 20;
      let totalHoras = +formValues.horas * 30;
      let totalGasolina = +formValues.gasolina * 5;
      let totalDiesel = +formValues.diesel * 5;
      let totalExtintores = +formValues.extintores * 40;

      let totalBrigada =
        totalAlunos +
        totalMacacoes +
        totalHoras +
        totalGasolina +
        totalDiesel +
        totalExtintores;

      let totalComAumento =
        totalBrigada + (totalBrigada * formValues.porcentagem) / 100;
      setTotal(totalComAumento.toLocaleString("pt-BR"));
    } else{
      let totalAlunos = +formValues.alunos * 130;
      let totalHoras = +formValues.horas * 30;
      
      let totalTreinamento = totalAlunos + totalHoras
      let totalComAumento = totalTreinamento + (totalTreinamento * formValues.porcentagem) / 100
      setTotal(totalComAumento.toLocaleString("pt-BR"))

    }
  }, [curso, formValues]);

  console.log(formValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      setLoading(true)
      const response = await fetch("http://localhost:3033/gerarpdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          formValues,
          curso,
          total,
        }),
      });


      const contentType = response.headers.get("content-type");

      if (contentType && contentType.startsWith("application/pdf")) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "relatorio.pdf";
        link.click();

        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
      setFormValue({
        solicitante: "",
        email: "",
        observacao: "",
        alunos: "",
        horas: "",
        macacoes: "",
        gasolina: "",
        diesel: "",
        porcentagem: "",
        extintores: "",
      })
      setCurso('Cursos')
    }
  };

  return (
    <div className={styles.Container} >
      <>
      <Header/>
        <h1 className={styles.Title}>- Gerar Orçamento -</h1>
        <form className={styles.Formulario} onSubmit={handleSubmit}>
          <div className={styles.ContainerForm} >
          <input
            value={formValues.solicitante}
            onChange={({ target }) =>
              setFormValue({ ...formValues, solicitante: target.value })
            }
            placeholder="Solicitante"
          />
          <input
            value={formValues.email}
            onChange={({ target }) =>
              setFormValue({ ...formValues, email: target.value })
            }
            placeholder="E-mail"
          />
          <input
            value={formValues.observacao}
            onChange={({ target }) =>
              setFormValue({ ...formValues, observacao: target.value })
            }
            placeholder="Obervação"
          />
          <Select
          className={styles.Select}
            text={"Cursos"}
            options={[
              "NR-05",
              "NR-06",
              "NR-10",
              "NR-10-SEP",
              "NR-12",
              "NR-18",
              "NR-20",
              "NR-23",
              "NR-33",
              "NR-35",
              "BRIGADA",
              "BRIGADA-NT07",
            ]}
            setValue={setCurso}
            value={curso}
          />
          {curso === "BRIGADA" || curso === "NR-33" ? (
            <input
              type="number"
              value={formValues.macacoes}
              onChange={({ target }) =>
                setFormValue({ ...formValues, macacoes: target.value })
              }
              placeholder="Quantidade de Macacões"
            />
          ) : null}
          {curso === "BRIGADA" ||
          curso === "NR-20" ||
          curso === "NR-23" ||
          curso === "BRIGADA-NT07" ? (
            <>
              <input
                type="number"
                value={formValues.gasolina}
                onChange={({ target }) =>
                  setFormValue({ ...formValues, gasolina: target.value })
                }
                placeholder="Litros de Gasolina"
              />
              <input
                type="number"
                value={formValues.diesel}
                onChange={({ target }) =>
                  setFormValue({ ...formValues, diesel: target.value })
                }
                placeholder="Litros de Diesel"
              />
              <input
                type="number"
                value={formValues.extintores}
                onChange={({ target }) =>
                  setFormValue({ ...formValues, extintores: target.value })
                }
                placeholder="Extintores"
              />
            </>
          ) : null}

          <input
            type="number"
            value={formValues.alunos}
            onChange={({ target }) =>
              setFormValue({ ...formValues, alunos: target.value })
            }
            placeholder="Alunos"
          />
          <input
            type="number"
            value={formValues.horas}
            onChange={({ target }) =>
              setFormValue({ ...formValues, horas: target.value })
            }
            placeholder="Horas de Treinamento"
          />
          <input
            type="number"
            value={formValues.porcentagem}
            onChange={({ target }) =>
              setFormValue({ ...formValues, porcentagem: target.value })
            }
            placeholder="Porcentagem de Lucro"
          />
          <p>R$ {total}</p>
          {loading ? <img src={Loading} /> : <button type="submit">Gerar Orçamento</button>}
          </div>
        </form>
      </>
    </div>
  );
}

export default Orcamento;
