const mongoose = require("mongoose");
const Material = require("../models/Material");

module.exports = {
  async read(req, res) {
    const MaterialList = await Material.find({ estado: "Pendente" });

    return res.json(MaterialList);
  },

  async create(req, res) {
    const { treinamento, kit, dataSaida, observacao } = req.body;

    if (!treinamento || !kit || !dataSaida || !observacao) {
      res.status(400).json({ msg: "Complete todos os dados" });
    }

    const MaterialCreate = await Material.create({
      treinamento,
      kit,
      dataSaida,
      observacao
    });

    return res.json(MaterialCreate);
  },

  async update(req, res) {
    const { id } = req.params;
    const { dataEntrada } = req.body;

    const MaterialUpdate = await Material.findOne({ _id: id });

    if (MaterialUpdate && MaterialUpdate.estado === "Pendente") {
      MaterialUpdate.estado = "Entregue";
      MaterialUpdate.dataEntrada = dataEntrada;
    }

    await MaterialUpdate.save();

    return res.json(MaterialUpdate);
  },
};
