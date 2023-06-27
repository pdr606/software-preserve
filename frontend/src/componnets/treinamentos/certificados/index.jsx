import Header from "../../../hook/header";
import { useState } from "react";
import api from "../../../services/api";

function Certificado() {
  const [selectFile, setSelectFile] = useState(null);

  const handleFileUpload = (event) => {
    setSelectFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectFile);

    try {
      const response = await api.post("/enviar-certificado", { formData });
      console.log(response);
      console.log(response.data);
    } catch (error) {
      console.log(error);
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
