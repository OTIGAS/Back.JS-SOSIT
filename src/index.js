/*DOTENV*/ require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

console.log(new Date().getDay())

app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));

const routes = [
  require("./routes/usuarioRouter"),
  require("./routes/agendaRouter"),
];

routes.forEach((route) => {
  app.use(route);
});

const PORT = process.env.PORT;

const TODAY = new Date().toLocaleDateString("pt-BR");
const HORS = new Date().toLocaleTimeString("pt-BR");

app.listen(PORT, () => {
  console.log(`Server rodando na porta: ${PORT}`);
  console.log(`Ultima atualização: ${TODAY} - ${HORS}`);
});

module.exports = app;
