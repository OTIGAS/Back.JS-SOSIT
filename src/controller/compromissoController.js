const Compromisso = require("../infra/repository/compromissoRepository");
const compromissoRepository = new Compromisso();

class CompromissoController {
  async criarCompromisso(req, res) {
    try {
      const idUsuario = req.user.id;

      if (!idUsuario) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const { idAgenda, data, horario_inicio, horario_fim } = req.body;

      if (!idAgenda || !data || !horario_inicio || !horario_fim) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await compromissoRepository.criarCompromisso(
        idUsuario,
        idAgenda,
        data,
        horario_inicio, 
        horario_fim
      );

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async deletarCompromisso(req, res) {
    try {
      const { idDeletar } = req.query;

      if (!idDeletar) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await usuarioRepository.deletarCompromisso(idDeletar);

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async listarTodosCompromissos(req, res) {
    try {
      const response = await usuarioRepository.listarTodosCompromissos();

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async listarCompromissoPorID(req, res) {
    try {
      const { idCompromisso } = req.query;

      if (!idCompromisso) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await usuarioRepository.listarCompromissoPorID(idCompromisso);

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async listarCompromissoPorIdAgendaIdUsuario(req, res) {
    try {
      const { idAgenda, idUsuario } = req.query;

      if (!idAgenda | !idUsuario) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await usuarioRepository.listarCompromissoPorIdAgendaIdUsuario(idAgenda, idUsuario);

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async listarCompromissoPorIdAgenda(req, res) {
    try {
      const { idAgenda } = req.query;

      if (!idAgenda ) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await usuarioRepository.listarCompromissoPorIdAgenda(idAgenda);

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async listarCompromissoPorIdUsuario(req, res) {
    try {
      const { idUsuario } = req.query;

      if (!idUsuario ) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await usuarioRepository.listarCompromissoPorIdUsuario(idUsuario);

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }
}

module.exports = CompromissoController;
