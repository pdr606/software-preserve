const ejs = require("ejs");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

module.exports = {
  async generatePdf(req, res) {
    const { formValues, curso, total } = req.body;

    const htmlPath = path.join(__dirname, "print.ejs");
    const html = fs.readFileSync(htmlPath, "utf-8");
    const htmlWithData = html
      .replace("{{NOME}}", formValues.nome)
      .replace("{{EMAIL}}", formValues.email)
      .replace("{{MENSAGEM}}", formValues.mensagem)
      .replace("{{ALUNOS}}", formValues.alunos)
      .replace("{{HORAS}}", formValues.horas)
      .replace("{{CURSO}}", curso)
      .replace("{{TOTAL}}", total);

    const renderedHtml = ejs.render(htmlWithData, { formValues, curso, total });

    const browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();

    await page.setContent(renderedHtml, { waitUntil: "load" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    fs.writeFileSync("temp.pdf", pdfBuffer);

    try {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="relatorio.pdf"'
      );
      res.send(pdfBuffer);
    } catch (error) {
      console.log(error);
    }
  },
};
