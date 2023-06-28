const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const ejs = require("ejs");

const CertificadoSave = require("../models/CertificadoSave");

module.exports = {
  async create(req, res) {
    const file = req.file;
    let Data = [];
    const TREINAMENTO = "NR-35";

    if (!file) {
      return res.status(400).send("Nenhum arquivo foi enviado");
    }

    const filePath = file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const workshet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(workshet);

    try {
      jsonData.forEach(async (e) => {
        const newSave = await CertificadoSave.create({
          NOME: e.NOME,
          LOCALIZACAO: e.LOCALIZACAO,
          TREINAMENTO,
        });

        console.log(newSave);

        let jsonDataUpdate = {
          NOME: e.NOME,
          CPF: e.CPF,
          LOCALIZACAO: e.LOCALIZACAO,
          EMPRESA: e.EMPRESA,
          TEXTO: e.TEXTO,
        };

        Data.push(jsonDataUpdate);
      });
    } catch (error) {
      console.log("Deu ruim");
    } finally {
      console.log("MEU DATA ESTA AQUI EM BAIXO");
      console.log(Data);
    }

    const htmlPath = path.join(__dirname, "Certificado.ejs");
    const html = fs.readFileSync(htmlPath, "utf-8");

    const renderHtml = ejs.render(html, { Data });

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
    } catch (error) {
      console.log(error);
    }
  },
};
