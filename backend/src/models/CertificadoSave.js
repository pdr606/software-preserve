const mongoose = require("mongoose");

const CertificadoSave = new mongoose.model("CertificadoSave", {
  NOME: String,
  LOCALIZACAO: String,
  TREINAMENTO: String,
});

module.exports = CertificadoSave;
