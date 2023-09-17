const express = require('express')
const router = express.Router()

const verificaToken = require('../middlewares/verifica-token')

//Importação Usuario
const UsuarioController = require('../controller/usuarioController')
const usuarioController = new UsuarioController()

//Rotas Usuarios
router.post('/usuario/autenticar', verificaToken, usuarioController.autenticarUsuario) //Autenticar Usuario

router.post('/usuario/cliente', usuarioController.criarCliente) //Criar Cliente
router.post('/usuario/empresa', usuarioController.criarEmpresa) //Criar Empresa

router.delete('/usuario/deleta', usuarioController.deletaUsuario) //Deletar Usuário

router.get('/usuario/listar-todos/:tipo', usuarioController.listarTodosUsuarios) //Listar Todos Usuários
router.get('/usuario/listar-por-id/:idUsuario/:tipo', usuarioController.listarUsuarioPorId) //Listar Por ID

router.patch('/usuario/atualizar-contato', usuarioController.atualizarContato) //Atualizar Contato
router.patch('/usuario/atualizar-endereco', usuarioController.atualizarEndereco) //Atualizar Endereco
router.patch('/usuario/atualizar-dados-bancarios', usuarioController.atualizarDadosBancarios) //Atualizar Dados Bancarios
router.patch('/usuario/atualizar-informacoes-empresa', usuarioController.atualizarInformacoesEmpresa) //Atualizar Informações Empresa

module.exports = router