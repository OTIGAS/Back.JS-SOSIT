const Compromisso = require("../infra/repository/compromissoRepository");
const compromissoRepository = new Compromisso();

class CompromissoController {
  async criarCompromisso(req, res) {
    const date = new Date().toLocaleDateString("pt-BR");
    const time = new Date().toLocaleTimeString("pt-BR");
    try {
      const idUsuario = req.user.id;

      if (!idUsuario) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const { data } = req.body;

      const { email, senha } = data;

      if (!email || !senha) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await usuarioRepository.criarCompromisso(email, senha);

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
      console.log(response, date, time);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }
}
