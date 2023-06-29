import Header from "../../../hook/header";
import { useEffect, useState } from "react";

import styles from './styles.module.css'
import Select from "../../../hook/select";
import api from "../../../services/api";

function Certificado() {
  const [selectFile, setSelectFile] = useState(null);
  const [curso, setCurso] = useState('')
  const [instrutor, setInstrutor] = useState('')
  const [instrutores, setInstrutores] = useState([])

  const handleFileUpload = (event) => {
    setSelectFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("excel", selectFile);
    console.log(formData)

    try {
      const response = await fetch("http://localhost:3033/enviar-certificado", {
      method: "POST",
        body: 
          formData
      });
      
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.startsWith('application/pdf')){
        const blob = await response.blob();
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = "certificado.pdf"
        link.click()

        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.log('Deu ruim', error);
    } finally {
      console.log("acabou");
    }
  };

  useEffect(() =>{
    const searchInstrutor = async () =>{
      const response = await api.get('/buscar-instrutor')
      const data = response.data

      const instrutores = data.map((instrutor) => instrutor.nome)
      setInstrutores(instrutores)
    }


    searchInstrutor()
  }, [])


  return (
    <>
      <Header />
      <main className={styles.Container} >
        <div className={styles.ContainerLeft} >
          <div className={styles.Card} >
          <h1>Gerar Certificados / PDF</h1>
          <Select
          className={styles.Select}
          text="Curso"
          options={['NR-06', 'NR-12', 'NR-33']}
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
          <input  type="file" accept=".xlsx" onChange={handleFileUpload} />
          <button onClick={handleUpload}>Enviar</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Certificado;
