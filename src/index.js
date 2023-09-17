/*DOTENV*/ require('dotenv').config()

const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

const routes = [
  require('./routes/usuarioRouter')
]

routes.forEach(route => {
  app.use(route)
})

const PORT = process.env.PORT

const TODAY = new Date().toLocaleDateString('pt-BR')
const HORS = new Date().toLocaleTimeString('pt-BR')

app.listen(PORT, () => { 
  console.log(`Server rodando na porta: ${PORT}`)
  console.log(`Ultima atualização: ${TODAY} - ${HORS}`)
})

module.exports = app