const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const ejs = require("ejs");

const CertificadoSave = require("../models/CertificadoSave");
const ConteudoProgramatico = require('../models/ConteudoProgramatico')

module.exports = {
  async create(req, res) {
    let Data = [];
    const file = req.file;
    const { instrutor } = req.body;
    const {curso} = req.body
    const instrutorDados = JSON.parse(instrutor)

    const buscarConteudoProgramaticoPeloCurso = await ConteudoProgramatico.find({curso:curso})
    const conteudo_programatico = buscarConteudoProgramaticoPeloCurso[0].conteudo_programatico

    if (!file) {
      return res.status(400).send("Nenhum arquivo foi enviado");
    }

    const filePath = file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const workshet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(workshet);

    for (const e of jsonData) {
      const newSave = await CertificadoSave.create({
        NOME: e.NOME,
        LOCALIZACAO: e.LOCALIZACAO,
        TREINAMENTO: curso,
      });

      let jsonDataUpdate = {
        ID: newSave._id,
        NOME: e.NOME,
        CPF: e.CPF,
        LOCALIZACAO: e.LOCALIZACAO,
        EMPRESA: e.EMPRESA,
        TEXTO: e.TEXTO,
        NOME_INSTRUTOR: instrutorDados[0].nome,
        FORMACAO_INSTRUTOR: instrutorDados[0].formacao,
        DADOS_INSTRUTOR: instrutorDados[0].dados,
        CONTEUDO_PROGRAMATICO: buscarConteudoProgramaticoPeloCurso[0].conteudo_programatico,
      };

      Data.push(jsonDataUpdate);
    }

    const htmlPath = path.join(__dirname, "Certificado.ejs");
    const html = fs.readFileSync(htmlPath, "utf-8");

    const renderHtml = ejs.render(html, { Data, conteudo_programatico });

    const browser = await puppeteer.launch({
      headless: "next",
    });

    const page = await browser.newPage(); // 1

    await page.setContent(renderHtml, { waitUntil: "load" }); // 1

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      landscape: true,
    });


    try {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="certificado.pdf"'
      );
      res.send(pdfBuffer);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        } else {
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};
