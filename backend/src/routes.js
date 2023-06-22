const express = require("express");
const routes = express.Router();

const checkToken = require("./helpers/CheckToken");

const Register = require("./controllers/Register");
const Login = require("./controllers/Login");
const Private = require("./controllers/Private");
const Annotation = require("./controllers/AnnotationCreate");
const PdfCreate = require("./controllers/Pdf");

routes.post("/register", Register.register);
routes.post("/login", Login.login);
routes.get("/private/:id", checkToken, Private.private);

routes.get("/annotations", Annotation.read);
routes.post("/annotations", Annotation.create);
routes.delete("/annotations/:id", checkToken, Annotation.delete);
routes.post("/annotations/update/:id", Annotation.update);

routes.post("/gerarpdf", PdfCreate.generatePdf);

module.exports = routes;
