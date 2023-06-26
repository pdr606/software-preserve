const mongoose = require("mongoose");

const Material = new mongoose.model("Material", {
  treinamento: {
    type: String,
    required: true,
  },
  kit: {
    type: String,
    required: true,
  },
  dataSaida: {
    type: String,
    required: true,
  },
  dataEntrada: {
    type: String,
  },
  estado: {
    type: String,
    default: "Pendente",
  },
});

module.exports = Material;
