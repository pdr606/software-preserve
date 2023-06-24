const express = require("express");
const routes = express.Router();

const checkToken = require("./helpers/CheckToken");

const Register = require("./controllers/Register");
const Login = require("./controllers/Login");
const Private = require("./controllers/Private");
const Annotation = require("./controllers/AnnotationCreate");
const PdfCreate = require("./controllers/Pdf");
const Material = require('./controllers/Material')

routes.post("/register", Register.register);
routes.post("/login", Login.login);
routes.get("/private/:id", checkToken, Private.private);

routes.get("/annotations", checkToken, Annotation.read);
routes.post("/annotations", checkToken, Annotation.create);
routes.delete("/annotations/:id", checkToken, Annotation.delete);
routes.post("/annotations/update/:id", checkToken, Annotation.update);

routes.post("/gerarpdf", checkToken, PdfCreate.generatePdf);

routes.post('/material', Material.create)

module.exports = routes;
