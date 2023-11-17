const Compromisso = require("../infra/repository/compromissoRepository");
const compromissoRepository = new Compromisso();

class CompromissoController {
  async criarCompromisso(req, res) {
    try {
      const idUsuario = req.user.id;

      if (!idUsuario) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const { idAgenda, data, horario } = req.body;

      if (!idAgenda || !data || !horario) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await compromissoRepository.criarCompromisso(
        idUsuario,
        idAgenda,
        data,
        horario
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

      const response = await usuarioRepository.criarCompromisso(email, senha);
    } catch (error) {}
  }
}

module.exports = CompromissoController;