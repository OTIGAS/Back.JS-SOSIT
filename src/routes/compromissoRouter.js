const express = require("express");
const router = express.Router();

const { verificaToken } = require("../middleware/verificaToken");

const CompromissoController = require("../controller/compromissoController");
const compromissoController = new CompromissoController();

router.post(
  "/compromisso/cliente",
  verificaToken,
  compromissoController.criarCompromisso
); //Criar Compromisso

router.delete(
  "/compromisso/deleta",
  verificaToken,
  compromissoController.deletarCompromisso
); //Deletar Compromisso

router.get(
  "/compromisso/listar-todos",
  compromissoController.listarTodosCompromissos
); //Listar Todos Compromisso

router.get(
  "/compromisso/listar-por-id",
  compromissoController.listarCompromissoPorID
); //Listar Compromisso Por ID

router.get(
  "/compromisso/listar-por-idagenda-idusuario",
  compromissoController.listarCompromissoPorIdAgendaIdUsuario
); //Listar Compromissos Por ID Agenda e ID Usuário

router.get(
  "/compromisso/listar-por-idagenda",
  compromissoController.listarCompromissoPorIdAgenda
); //Listar Compromissos Por ID Agenda

router.get(
  "/compromisso/listar-por-idusuario",
  compromissoController.listarCompromissoPorIdUsuario
); //Listar Compromissos Por ID Usuário

module.exports = router;
