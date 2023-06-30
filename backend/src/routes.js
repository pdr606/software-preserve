const express = require("express");
const routes = express.Router();

const checkToken = require("./helpers/CheckToken");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

const Register = require("./controllers/Register");
const Login = require("./controllers/Login");
const Private = require("./controllers/Private");
const Annotation = require("./controllers/AnnotationCreate");
const PdfCreate = require("./controllers/Pdf");
const Material = require("./controllers/Material");
const Certificado = require("./controllers/Certificado");
const CriarInstrutor = require("./controllers/RegisterInstrutor");
const CriarConteudoProgramatico = require("./controllers/CriarConteudoProgramatico");
const ValidarCertificado = require("./controllers/ValidarCertificado");

routes.post("/register", Register.register);
routes.post("/login", Login.login);
routes.get("/private/:id", checkToken, Private.private);

routes.get("/annotations", checkToken, Annotation.read);
routes.post("/annotations", checkToken, Annotation.create);
routes.delete("/annotations/:id", checkToken, Annotation.delete);
routes.post("/annotations/update/:id", checkToken, Annotation.update);

routes.post("/gerarpdf", checkToken, PdfCreate.generatePdf);

routes.get("/material", Material.read);
routes.post("/material-criar", Material.create);
routes.put("/material-update/:id", Material.update);

routes.post("/enviar-certificado", upload.single("excel"), Certificado.create);

routes.post("/criar-instrutor", CriarInstrutor.create);
routes.get("/buscar-instrutor", CriarInstrutor.read);

routes.post("/criar-conteudo-programatico", CriarConteudoProgramatico.create);
routes.get("/buscar-conteudo-programatico", CriarConteudoProgramatico.read);

routes.post("/validar-certificado", ValidarCertificado.search);

module.exports = routes;
