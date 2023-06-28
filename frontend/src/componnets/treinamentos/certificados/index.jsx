import Header from "../../../hook/header";
import { useState } from "react";

function Certificado() {
  const [selectFile, setSelectFile] = useState(null);

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

  return (
    <>
      <Header />
      <div>
        <input type="file" accept=".xlsx" onChange={handleFileUpload} />
        <button onClick={handleUpload}>Enviar</button>
      </div>
    </>
  );
}

export default Certificado;
