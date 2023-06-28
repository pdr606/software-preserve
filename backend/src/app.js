const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();

require("dotenv").config();
require("./config/dbconfig");

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/imgs', express.static('imgs'))

app.listen(3033);
