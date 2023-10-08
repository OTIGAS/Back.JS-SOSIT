const express = require('express')
const router = express.Router()

const { verificaToken } = require('../middleware/verificaToken')

const AgendaController = require('../controller/agendaController')
const agendaController = new AgendaController()

router.post('/agenda', verificaToken, agendaController.criarAgenda) //Criar Agenda

router.delete('/agenda/deleta/:idAgenda', verificaToken, agendaController.deletarAgenda) //Deletar Agenda

router.get('/agenda/listar-todas', agendaController.listarTodasAgendas) //Listar Todas as Agendas

router.get('/agenda/listar-por-id/:idAgenda', agendaController.listarAgendaPorIdAgenda) //Listar Agenda Por ID
router.get('/agenda/listar-por-id-empresa/:idEmpresa', agendaController.listarTodasAgendasPorIdEmpresa) //Listar Agendas Por IdEmpresa

router.get('/agenda/listar-por-nome/:nome', agendaController.listarAgendasPorNome) //Listar Agendas Por Nome
router.get('/agenda/listar-por-servico/:servico', agendaController.listarAgendasPorServico) //Listar Agendas Por Serviço
router.get('/agenda/listar-por-nome-empresa/:nomeEmpresa', agendaController.listarAgendasPorNomeEmpresa) //Listar Agendas Por Nome da Empresa

router.get('/agenda/listar-todas-por-token', verificaToken, agendaController.listarTodasAgendasPorToken) //Listar Todas as Agendas Por Token



module.exports = router