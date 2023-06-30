const CertificadoSave = require("../models/CertificadoSave");

module.exports = {
  async search(req, res) {
    const { idParaValidar } = req.body;

    if (!idParaValidar) {
      return res.status(200).send({ msg: "Envie pelo menos um ID" });
    }

    try {
      const buscarCertificadoNoBanco = await CertificadoSave.findById(
        idParaValidar
      );

      if (buscarCertificadoNoBanco) {
        return res.json(buscarCertificadoNoBanco);
      }

      return res.status(200).json({ msg: "Certificado ou ID Inválido" });
    } catch (error) {
      return res.status(400).json({ msg: "Certificado ou ID Inválido" });
    }
  },
};
