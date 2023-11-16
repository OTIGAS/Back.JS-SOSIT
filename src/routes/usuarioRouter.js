const express = require('express')
const router = express.Router()

const { verificaToken } = require('../middleware/verificaToken')

const UsuarioController = require('../controller/usuarioController')
const usuarioController = new UsuarioController()

router.post('/usuario/autenticar', usuarioController.autenticarUsuario) //Autenticar Usuario

router.post('/usuario/cliente', usuarioController.criarCliente) //Criar Cliente
router.post('/usuario/empresa', usuarioController.criarEmpresa) //Criar Empresa

router.delete('/usuario/deleta', verificaToken, usuarioController.deletaUsuario) //Deletar Usuário

router.get('/usuario/listar-meu-perfil', verificaToken, usuarioController.listarMeuPerfil) //Listar Por Token

router.get('/usuario/listar-todos', usuarioController.listarTodosUsuarios) //Listar Todos Usuários
router.get('/usuario/listar-por-id', usuarioController.listarUsuarioPorId) //Listar Por ID

router.patch('/usuario/atualizar-contato', verificaToken, usuarioController.atualizarContato) //Atualizar Contato
router.patch('/usuario/atualizar-endereco', verificaToken, usuarioController.atualizarEndereco) //Atualizar Endereco
router.patch('/usuario/atualizar-dados-bancarios', verificaToken, usuarioController.atualizarDadosBancarios) //Atualizar Dados Bancarios
router.patch('/usuario/atualizar-informacoes-empresa', verificaToken, usuarioController.atualizarInformacoesEmpresa) //Atualizar Informações Empresa

module.exports = router