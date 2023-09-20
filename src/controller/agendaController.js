const Agenda = require('../infra/repository/agendaRepository')
const agendaRepository = new Agenda()

class AgendaController {
    async criarAgenda(req, res) {
        const date = new Date().toLocaleDateString('pt-BR')
        const time = new Date().toLocaleTimeString('pt-BR')
        try {
            
        } catch (error) {
            
        }
    }
}
