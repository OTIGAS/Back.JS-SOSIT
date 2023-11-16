const express = require('express')
const router = express.Router()

const { verificaToken } = require('../middleware/verificaToken')

const CompromissoController = require('../controller/compromissoController')
const compromissoController = new CompromissoController()

router.post('/compromisso/cliente', verificaToken,compromissoController.criarCompromisso) //Criar Compromisso

module.exports = router

