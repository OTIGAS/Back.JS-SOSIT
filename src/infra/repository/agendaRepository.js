const db = require('../database')

class UsuarioRepository {
  constructor() {
    this.db = db
  }

  async criarAgenda(idUsuario, agenda) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          INSERT INTO agenda (id_usuario, nome, servico, descricao) 
            VALUES (?,?,?,?)
        `,
        [
          idUsuario,
          agenda.nome,
          agenda.servico,
          agenda.descricao
        ], 
        (error, response) => {
          if(error) {
            return reject({ erro: "Falha na inclusão do usuário." })
          } else if (response.affectedRows === 0) {
            return resolve({ erro: "Nenhuma agenda cadastrada." })
          } else {
            return resolve({ mensagem: "Agenda cadastrada com sucesso." })
          }
        }
      )
    }).catch(error => {
      console.log(error)
      throw new Error(error)
    })
  }

  async deletarAgenda(idAgenda, idUsuario) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          DELETE FROM agenda WHERE id_agenda = ? AND id_usuario = ?;
        `,
        [
          idAgenda,
          idUsuario
        ],
        (error, response) => {
          if (error) {
            if (error.message.includes("foreign key")) {
              return resolve({ erro: "Agenda esta sendo usanda como chave estrangeira." })
            } else {
              return reject({ erro: "Falha ao deletar a agenda." })
            }
          } else if (response.affectedRows === 0) {
            return resolve({ erro: "Agenda não encontrada." })
          } else {
            return resolve({ mensagem: "Agenda deletada com sucesso." })
          }
        }
      )
    }).catch(error => {
      console.log(error)
      throw new Error(error)
    })
  }

  async listarTodasAgendas() {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT 
            a.id_agenda, a.nome, a.servico, a.descricao, 
            u.id_usuario, u.nome as nome_empresa, c.email_contato, c.telefone, e.cep, e.rua, e.num, e.cidade, e.estado,
            a.horarios_seg, a.horarios_ter, a.horarios_qua, a.horarios_qui, a.horarios_sex, a.horarios_sab, a.horarios_dom
          FROM agenda a
          INNER JOIN usuario u ON a.id_usuario = u.id_usuario
          INNER JOIN contato c ON u.id_contato = c.id_contato
          INNER JOIN endereco e ON u.id_endereco = e.id_endereco;
        `,
        [],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar todas as agendas." })
          } else if (!response.length) {
            return resolve({ erro: "Nenhuma agenda encontrada." })
          } else {
            return resolve(response)
          }
        }
      )
    }).catch(error => {
      console.log(error)
      throw new Error(error)
    })
  }

  async listarAgendaPorIdAgenda(idAgenda) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT 
            a.id_agenda, a.nome, a.servico, a.descricao, 
            u.id_usuario, u.nome as nome_empresa, e.cep, e.rua, e.num, e.cidade, e.estado, c.email_contato, c.telefone,
            a.horarios_seg, a.horarios_ter, a.horarios_qua, a.horarios_qui, a.horarios_sex, a.horarios_sab, a.horarios_dom
          FROM agenda a
          INNER JOIN usuario u ON a.id_usuario = u.id_usuario
          INNER JOIN contato c ON u.id_contato = c.id_contato
          INNER JOIN endereco e ON u.id_endereco = e.id_endereco
          WHERE a.id_agenda = ?;
        `,
        [idAgenda],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar aa agenda." })
          } else if (!response.length) {
            return resolve({ erro: "Nenhuma agenda encontrada." })
          } else {
            return resolve(response)
          }
        }
      )
    }).catch(error => {
      console.log(error)
      throw new Error(error)
    })
  }

  async listarTodasAgendasPorIdEmpresa(idUsuario) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT 
            a.id_agenda, a.nome, a.servico, a.descricao, 
            u.id_usuario, u.nome as nome_empresa, e.cep, e.rua, e.num, e.cidade, e.estado,
            a.horarios_seg, a.horarios_ter, a.horarios_qua, a.horarios_qui, a.horarios_sex, a.horarios_sab, a.horarios_dom
          FROM agenda a
          INNER JOIN usuario u ON a.id_usuario = u.id_usuario
          INNER JOIN endereco e ON u.id_endereco = e.id_endereco
          WHERE u.id_usuario = ?;
        `,
        [idUsuario],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar todas as agendas." })
          } else if (!response.length) {
            return resolve({ erro: "Nenhuma agenda encontrada." })
          } else {
            return resolve(response)
          }
        }
      )
    }).catch(error => {
      console.log(error)
      throw new Error(error)
    })
  }

  async listarAgendasPorNome(nome) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT 
            a.id_agenda, a.nome, a.servico, a.descricao, 
            u.id_usuario, u.nome as nome_empresa, e.cep, e.rua, e.num, e.cidade, e.estado, c.email_contato, c.telefone,
            a.horarios_seg, a.horarios_ter, a.horarios_qua, a.horarios_qui, a.horarios_sex, a.horarios_sab, a.horarios_dom
          FROM agenda a
          INNER JOIN usuario u ON a.id_usuario = u.id_usuario
          INNER JOIN contato c ON u.id_contato = c.id_contato
          INNER JOIN endereco e ON u.id_endereco = e.id_endereco
          WHERE a.nome LIKE ?;
        `,
        [`%${nome}%`],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar aa agenda." })
          } else if (!response.length) {
            return resolve({ erro: "Nenhuma agenda encontrada." })
          } else {
            return resolve(response)
          }
        }
      )
    }).catch(error => {
      console.log(error)
      throw new Error(error)
    })
  }

  async listarAgendasPorServico(servico) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT 
            a.id_agenda, a.nome, a.servico, a.descricao, 
            u.id_usuario, u.nome as nome_empresa, e.cep, e.rua, e.num, e.cidade, e.estado, c.email_contato, c.telefone,
            a.horarios_seg, a.horarios_ter, a.horarios_qua, a.horarios_qui, a.horarios_sex, a.horarios_sab, a.horarios_dom
          FROM agenda a
          INNER JOIN usuario u ON a.id_usuario = u.id_usuario
          INNER JOIN contato c ON u.id_contato = c.id_contato
          INNER JOIN endereco e ON u.id_endereco = e.id_endereco
          WHERE a.servico LIKE ?;
        `,
        [`%${servico}%`],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar aa agenda." })
          } else if (!response.length) {
            return resolve({ erro: "Nenhuma agenda encontrada." })
          } else {
            return resolve(response)
          }
        }
      )
    }).catch(error => {
      console.log(error)
      throw new Error(error)
    })
  }

  async listarAgendasPorNomeEmpresa(nomeEmpresa) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT 
            a.id_agenda, a.nome, a.servico, a.descricao, 
            u.id_usuario, u.nome as nome_empresa, e.cep, e.rua, e.num, e.cidade, e.estado, c.email_contato, c.telefone,
            a.horarios_seg, a.horarios_ter, a.horarios_qua, a.horarios_qui, a.horarios_sex, a.horarios_sab, a.horarios_dom
          FROM agenda a
          INNER JOIN usuario u ON a.id_usuario = u.id_usuario
          INNER JOIN contato c ON u.id_contato = c.id_contato
          INNER JOIN endereco e ON u.id_endereco = e.id_endereco
          WHERE u.nome LIKE ?;
        `,
        [`%${nomeEmpresa}%`],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar aa agenda." })
          } else if (!response.length) {
            return resolve({ erro: "Nenhuma agenda encontrada." })
          } else {
            return resolve(response)
          }
        }
      )
    }).catch(error => {
      console.log(error)
      throw new Error(error)
    })
  }

  async atualizarHorariosAgenda(horarios) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          UPDATE agenda
            SET horarios_seg = JSON_SET(horarios_seg, ?, ?)
            SET horarios_ter = JSON_SET(horarios_ter, ?, ?)
            SET horarios_qua = JSON_SET(horarios_qua, ?, ?)
            SET horarios_qui = JSON_SET(horarios_qui, ?, ?)
            SET horarios_sex = JSON_SET(horarios_sex, ?, ?)
            SET horarios_sab = JSON_SET(horarios_sab, ?, ?)
            SET horarios_dom = JSON_SET(horarios_dom, ?, ?)
        `,
        [],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao atualizar os horários da Agenda." })
          } else if (response.affectedRows === 0) {
            return resolve({ erro: "Nenhuma Agenda encontrada." })
          } else {
            return resolve({ mensagem: "Horários da Agenda atualizados com sucesso." })
          }
        }
      )
    }).catch(error => {
      console.log(error)
      throw new Error(error)
    })
  }
}

module.exports = UsuarioRepository