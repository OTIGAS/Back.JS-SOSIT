const Agenda = require('../infra/repository/agendaRepository')
const agendaRepository = new Agenda()

class AgendaController {
  async criarAgenda(req, res) {
    const date = new Date().toLocaleDateString('pt-BR')
    const time = new Date().toLocaleTimeString('pt-BR')
    try {
      const idUsuario = req.user.id
      const tipo = req.user.tipo

      if (!idUsuario || !tipo) {
        res.status(400).send({ erro: "Parâmetro(s) ausente(s)." })
      }

      if (tipo === 'cliente') {
        res.status(400).send({ erro: "Não autorizado." })
      }

      const { data } = req.body
      const { agenda } = data

      if (!agenda) {
        res.status(400).send({ erro: "Parâmetro(s) ausente(s)." })
      }

      const response = await usuarioRepository.criarAgenda(idUsuario, agenda)

      if (response.erro) {
        res.status(400).send(response)
      } else {
        res.status(200).send(response)
      }
      console.log(response, date, time)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Erro interno do server' })
    }
  }

  async deletarAgenda(req, res) {
    const date = new Date().toLocaleDateString('pt-BR')
    const time = new Date().toLocaleTimeString('pt-BR')
    try {
      const tipo = req.user.tipo

      if (!tipo) {
        res.status(400).send({ erro: "Parâmetro(s) ausente(s)." })
      }

      if (tipo === 'cliente') {
        res.status(400).send({ erro: "Não autorizado." })
      }

      const { idAgenda } = req.params

      if (!idAgenda) {
        res.status(400).send({ erro: "Parâmetro(s) ausente(s)." })
      }
      
      const response = await agendaRepository.deletarAgenda(idAgenda)

      if (response.erro) {
        res.status(400).send(response)
      } else {
        res.status(200).send(response)
      }
      console.log(response, date, time)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Erro interno do server' })
    }
  }
}

module.exports = AgendaController