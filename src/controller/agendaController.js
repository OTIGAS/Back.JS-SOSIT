const Agenda = require("../infra/repository/agendaRepository");
const agendaRepository = new Agenda();

class AgendaController {
  async criarAgenda(req, res) {
    try {
      const idUsuario = req.user.id;
      const tipo = req.user.tipo;

      if (!idUsuario || !tipo) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      if (tipo === "cliente") {
        return res.status(400).send({ erro: "Não autorizado." });
      }

      const { data } = req.body;
      if (!data) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const { agenda } = data;
      if (!agenda) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await agendaRepository.criarAgenda(idUsuario, agenda);

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Erro interno do server" });
    }
  }

  async deletarAgenda(req, res) {
    try {
      const tipo = req.user.tipo;

      if (!tipo) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      if (tipo === "cliente") {
        return res.status(400).send({ erro: "Não autorizado." });
      }

      const idUsuario = req.user.id;

      if (!idUsuario) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const { idAgenda } = req.query;

      if (!idAgenda) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await agendaRepository.deletarAgenda(
        idAgenda,
        idUsuario
      );

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Erro interno do server" });
    }
  }

  async listarTodasAgendas(req, res) {
    try {
      const response = await agendaRepository.listarTodasAgendas();

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro interno do server" });
    }
  }

  async listarAgendaPorIdAgenda(req, res) {
    try {
      const { idAgenda } = req.query;

      if (!idAgenda) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await agendaRepository.listarAgendaPorIdAgenda(idAgenda);

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro interno do server" });
    }
  }

  async listarTodasAgendasPorIdEmpresa(req, res) {
    try {
      const { idEmpresa } = req.query;

      if (!idEmpresa) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await agendaRepository.listarTodasAgendasPorIdEmpresa(
        idEmpresa
      );

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro interno do server" });
    }
  }

  async listarAgendasPorNome(req, res) {
    try {
      const { nome } = req.query;

      if (!nome) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await agendaRepository.listarAgendasPorNome(nome);

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro interno do server" });
    }
  }

  async listarAgendasPorServico(req, res) {
    try {
      const { servico } = req.query;

      if (!servico) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await agendaRepository.listarAgendasPorServico(servico);

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro interno do server" });
    }
  }

  async listarAgendasPorNomeEmpresa(req, res) {
    try {
      const { nomeEmpresa } = req.query;

      if (!nomeEmpresa) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await agendaRepository.listarAgendasPorNomeEmpresa(
        nomeEmpresa
      );

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro interno do server" });
    }
  }

  async listarTodasAgendasPorToken(req, res) {
    try {
      const tipo = req.user.tipo;

      if (!tipo) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      if (tipo === "cliente") {
        return res.status(400).send({ erro: "Não autorizado." });
      }

      const idUsuario = req.user.id;

      if (!idUsuario) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await agendaRepository.listarTodasAgendasPorIdEmpresa(
        idUsuario
      );

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro interno do server" });
    }
  }

  async atualizarHorariosAgenda(req, res) {
    try {
      const idUsuario = req.user.id;
      const tipo = req.user.tipo;

      if (!idUsuario || !tipo) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      if (tipo === "cliente") {
        return res.status(400).send({ erro: "Não autorizado." });
      }

      const { data } = req.body;
      if (!data) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const { idAgenda } = data;
      if (!idAgenda) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const { horarios } = data;
      if (!horarios) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await agendaRepository.atualizarHorariosAgenda(
        idUsuario,
        idAgenda,
        horarios
      );

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Erro interno do server" });
    }
  }
}

module.exports = AgendaController;
