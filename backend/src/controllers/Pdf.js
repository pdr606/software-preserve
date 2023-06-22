const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

module.exports = {
  async generatePdf(req, res) {
    const { nome, email, mensagem } = req.body;

    const htmlPath = path.join(__dirname, "print.html");
    const html = fs.readFileSync(htmlPath, "utf-8");
    const htmlWithData = html
      .replace("{{NOME}}", nome)
      .replace("{{EMAIL}}", email)
      .replace("{{MENSAGEM}}", mensagem);

    const browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();

    await page.setContent(htmlWithData, { waitUntil: "load" });

    fs.writeFileSync("temp.html", htmlWithData);

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
