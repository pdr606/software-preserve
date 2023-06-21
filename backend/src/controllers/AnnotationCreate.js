const Annotation = require("../models/Annotation");

module.exports = {
  async read(req, res) {
    const annotationList = await Annotation.find();

    return res.json(annotationList);
  },

  async create(req, res) {
    const { title, notes } = req.body;

    if (!title || !notes) {
      return res.status(400).json({ msg: "Necessário um título e uma nota" });
    }

    const annotationCreate = await Annotation.create({
      title,
      notes,
    });

    return res.json(annotationCreate);
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const annotationDelete = await Annotation.findByIdAndDelete({ _id: id });

      if (annotationDelete) {
        return res.json(annotationDelete);
      }

      return res
        .status(500)
        .json({ error: "Não foi encontrado nenhum registro" });
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Ocorreu um erro ao excluir o registro" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { notes } = req.body;

    const annotation = await Annotation.findOne({ _id: id });

    if (notes) {
      annotation.notes = notes;
      await annotation.save();
    }

    return res.json(annotation);
  },
};
