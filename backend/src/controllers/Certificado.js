module.exports = {
  async create(req, res) {
    try {
      const file = req.file;

      res.status(200).send("Arquivo recebido com sucesso");
      console.log("Funcionou");
    } catch (error) {
      console.log(error);
    }
  },
};
