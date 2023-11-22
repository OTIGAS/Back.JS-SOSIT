const db = require("../database");

class UsuarioRepository {
  constructor() {
    this.db = db;
  }

  async criarAgenda(idUsuario, agenda) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          INSERT INTO agenda (id_usuario, nome, servico, descricao) 
            VALUES (?,?,?,?)
        `,
        [idUsuario, agenda.nome, agenda.servico, agenda.descricao],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha na inclusão do usuário." });
          } else if (response.affectedRows === 0) {
            return resolve({ erro: "Nenhuma agenda cadastrada." });
          } else {
            return resolve({ mensagem: "Agenda cadastrada com sucesso." });
          }
        }
      );
    }).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  }

  async deletarAgenda(idAgenda, idUsuario) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          DELETE FROM agenda WHERE id_agenda = ? AND id_usuario = ?;
        `,
        [idAgenda, idUsuario],
        (error, response) => {
          if (error) {
            if (error.message.includes("foreign key")) {
              return resolve({
                erro: "Agenda esta sendo usanda como chave estrangeira.",
              });
            } else {
              return reject({ erro: "Falha ao deletar a agenda." });
            }
          } else if (response.affectedRows === 0) {
            return resolve({ erro: "Agenda não encontrada." });
          } else {
            return resolve({ mensagem: "Agenda deletada com sucesso." });
          }
        }
      );
    }).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  }

  async listarTodasAgendas() {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT 
            a.id_agenda, a.nome, a.servico, a.descricao, 
            u.id_usuario, u.nome as nome_empresa, c.email_contato, c.telefone, e.cep, e.rua, e.num, e.cidade, e.estado,
            a.horarios_seg as seg, a.horarios_ter as ter, a.horarios_qua as qua, a.horarios_qui as qui, a.horarios_sex as sex, a.horarios_sab as sab, a.horarios_dom as dom
          FROM agenda a
          INNER JOIN usuario u ON a.id_usuario = u.id_usuario
          INNER JOIN contato c ON u.id_contato = c.id_contato
          INNER JOIN endereco e ON u.id_endereco = e.id_endereco;
        `,
        [],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar todas as agendas." });
          } else if (!response.length) {
            return resolve({ erro: "Nenhuma agenda encontrada." });
          } else {
            return resolve(response);
          }
        }
      );
    }).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  }

  async listarAgendaPorIdAgenda(idAgenda) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT 
            a.id_agenda, a.nome, a.servico, a.descricao, 
            u.id_usuario, u.nome as nome_empresa, e.cep, e.rua, e.num, e.cidade, e.estado, c.email_contato, c.telefone,
            a.horarios_seg as seg, a.horarios_ter as ter, a.horarios_qua as qua, a.horarios_qui as qui, a.horarios_sex as sex, a.horarios_sab as sab, a.horarios_dom as dom
          FROM agenda a
          INNER JOIN usuario u ON a.id_usuario = u.id_usuario
          INNER JOIN contato c ON u.id_contato = c.id_contato
          INNER JOIN endereco e ON u.id_endereco = e.id_endereco
          WHERE a.id_agenda = ?;
        `,
        [idAgenda],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar aa agenda." });
          } else if (!response.length) {
            return resolve({ erro: "Nenhuma agenda encontrada." });
          } else {
            return resolve(response);
          }
        }
      );
    }).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  }

  async listarTodasAgendasPorIdEmpresa(idUsuario) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT 
            a.id_agenda, a.nome, a.servico, a.descricao, 
            u.id_usuario, u.nome as nome_empresa, e.cep, e.rua, e.num, e.cidade, e.estado,
            a.horarios_seg as seg, a.horarios_ter as ter, a.horarios_qua as qua, a.horarios_qui as qui, a.horarios_sex as sex, a.horarios_sab as sab, a.horarios_dom as dom
          FROM agenda a
          INNER JOIN usuario u ON a.id_usuario = u.id_usuario
          INNER JOIN endereco e ON u.id_endereco = e.id_endereco
          WHERE u.id_usuario = ?;
        `,
        [idUsuario],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar todas as agendas." });
          } else if (!response.length) {
            return resolve({ erro: "Nenhuma agenda encontrada." });
          } else {
            return resolve(response);
          }
        }
      );
    }).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  }

  async listarAgendasPorNome(nome) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT 
            a.id_agenda, a.nome, a.servico, a.descricao, 
            u.id_usuario, u.nome as nome_empresa, e.cep, e.rua, e.num, e.cidade, e.estado, c.email_contato, c.telefone,
            a.horarios_seg as seg, a.horarios_ter as ter, a.horarios_qua as qua, a.horarios_qui as qui, a.horarios_sex as sex, a.horarios_sab as sab, a.horarios_dom as dom
          FROM agenda a
          INNER JOIN usuario u ON a.id_usuario = u.id_usuario
          INNER JOIN contato c ON u.id_contato = c.id_contato
          INNER JOIN endereco e ON u.id_endereco = e.id_endereco
          WHERE a.nome LIKE ?;
        `,
        [`%${nome}%`],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar aa agenda." });
          } else if (!response.length) {
            return resolve({ erro: "Nenhuma agenda encontrada." });
          } else {
            return resolve(response);
          }
        }
      );
    }).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  }

  async listarAgendasPorServico(servico) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT 
            a.id_agenda, a.nome, a.servico, a.descricao, 
            u.id_usuario, u.nome as nome_empresa, e.cep, e.rua, e.num, e.cidade, e.estado, c.email_contato, c.telefone,
            a.horarios_seg as seg, a.horarios_ter as ter, a.horarios_qua as qua, a.horarios_qui as qui, a.horarios_sex as sex, a.horarios_sab as sab, a.horarios_dom as dom
          FROM agenda a
          INNER JOIN usuario u ON a.id_usuario = u.id_usuario
          INNER JOIN contato c ON u.id_contato = c.id_contato
          INNER JOIN endereco e ON u.id_endereco = e.id_endereco
          WHERE a.servico LIKE ?;
        `,
        [`%${servico}%`],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar aa agenda." });
          } else if (!response.length) {
            return resolve({ erro: "Nenhuma agenda encontrada." });
          } else {
            return resolve(response);
          }
        }
      );
    }).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  }

  async listarAgendasPorNomeEmpresa(nomeEmpresa) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT 
            a.id_agenda, a.nome, a.servico, a.descricao, 
            u.id_usuario, u.nome as nome_empresa, e.cep, e.rua, e.num, e.cidade, e.estado, c.email_contato, c.telefone,
            a.horarios_seg as seg, a.horarios_ter as ter, a.horarios_qua as qua, a.horarios_qui as qui, a.horarios_sex as sex, a.horarios_sab as sab, a.horarios_dom as dom
          FROM agenda a
          INNER JOIN usuario u ON a.id_usuario = u.id_usuario
          INNER JOIN contato c ON u.id_contato = c.id_contato
          INNER JOIN endereco e ON u.id_endereco = e.id_endereco
          WHERE u.nome LIKE ?;
        `,
        [`%${nomeEmpresa}%`],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar aa agenda." });
          } else if (!response.length) {
            return resolve({ erro: "Nenhuma agenda encontrada." });
          } else {
            return resolve(response);
          }
        }
      );
    }).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  }

  async atualizarHorariosAgenda(idUsuario, idAgenda, horarios) {
    return await new Promise((resolve, reject) => {
      const horariosSeg = horarios.seg ? JSON.stringify(horarios.seg) : null;
      const horariosTer = horarios.ter ? JSON.stringify(horarios.ter) : null;
      const horariosQua = horarios.qua ? JSON.stringify(horarios.qua) : null;
      const horariosQui = horarios.qui ? JSON.stringify(horarios.qui) : null;
      const horariosSex = horarios.sex ? JSON.stringify(horarios.sex) : null;
      const horariosSab = horarios.sab ? JSON.stringify(horarios.sab) : null;
      const horariosDom = horarios.dom ? JSON.stringify(horarios.dom) : null;
      this.db.query(
        `
          UPDATE agenda
          SET 
            horarios_seg = ?,
            horarios_ter = ?,
            horarios_qua = ?,
            horarios_qui = ?,
            horarios_sex = ?,
            horarios_sab = ?,
            horarios_dom = ?
          WHERE id_agenda = ? AND id_usuario = ?;
        `,
        [
          horariosSeg,
          horariosTer,
          horariosQua,
          horariosQui,
          horariosSex,
          horariosSab,
          horariosDom,
          idAgenda,
          idUsuario,
        ],
        (error, response) => {
          if (error) {
            console.log(error);
            return reject({
              erro: "Falha ao atualizar os horários da Agenda.",
            });
          } else if (response.affectedRows === 0) {
            return resolve({ erro: "Nenhuma Agenda encontrada." });
          } else {
            return resolve({
              mensagem: "Horários da Agenda atualizados com sucesso.",
            });
          }
        }
      );
    }).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  }

  async listarHorariosDiaAgenda(idAgenda, dataCompleta) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT * FROM agenda WHERE id_agenda = ?
        `,
        [idAgenda],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar a agenda." });
          } else {
            const dadosAgenda = response[0];
            const diaSemana = new Date(dataCompleta).getDay();
            this.db.query(
              `
                SELECT * FROM compromisso WHERE id_agenda = ? AND data_completa = ?;
              `,
              [idAgenda, dataCompleta],
              (error, response) => {
                if (error) {
                  return reject({ erro: "Falha ao listar a agenda." });
                } else if (!response.length) {
                  const horarios = [];
                  switch (diaSemana) {
                    case 0:
                      return resolve({
                        id_agenda: idAgenda,
                        horarios: dadosAgenda.horarios_dom.map((horario) => {
                          horarios.push({
                            inicio: horario.inicio,
                            fim: horario.fim,
                            disponivel: true,
                          });
                        }),
                      });
                      break;
                    case 1:
                      return resolve({
                        id_agenda: idAgenda,
                        horarios: dadosAgenda.horarios_seg.map((horario) => {
                          horarios.push({
                            inicio: horario.inicio,
                            fim: horario.fim,
                            disponivel: true,
                          });
                        }),
                      });
                      break;
                    case 2:
                      return resolve({
                        id_agenda: idAgenda,
                        horarios: dadosAgenda.horarios_ter.map((horario) => {
                          horarios.push({
                            inicio: horario.inicio,
                            fim: horario.fim,
                            disponivel: true,
                          });
                        }),
                      });
                      break;
                    case 3:
                      return resolve({
                        id_agenda: idAgenda,
                        horarios: dadosAgenda.horarios_qua.map((horario) => {
                          horarios.push({
                            inicio: horario.inicio,
                            fim: horario.fim,
                            disponivel: true,
                          });
                        }),
                      });
                      break;
                    case 4:
                      return resolve({
                        id_agenda: idAgenda,
                        horarios: dadosAgenda.horarios_qui.map((horario) => {
                          horarios.push({
                            inicio: horario.inicio,
                            fim: horario.fim,
                            disponivel: true,
                          });
                        }),
                      });
                      break;
                    case 5:
                      return resolve({
                        id_agenda: idAgenda,
                        horarios: dadosAgenda.horarios_sex.map((horario) => {
                          horarios.push({
                            inicio: horario.inicio,
                            fim: horario.fim,
                            disponivel: true,
                          });
                        }),
                      });
                      break;
                    case 6:
                      return resolve({
                        id_agenda: idAgenda,
                        horarios: dadosAgenda.horarios_sab.map((horario) => {
                          horarios.push({
                            inicio: horario.inicio,
                            fim: horario.fim,
                            disponivel: true,
                          });
                        }),
                      });
                      break;
                    default:
                      return reject({ erro: "Falha ao listar a agenda." });
                  }
                } else {
                  const horarios = [];
                  switch (diaSemana) {
                    case 0:
                      return resolve({
                        id_agenda: idAgenda,
                        horarios: dadosAgenda.horarios_dom.map((horario) => {
                          if (
                            response[0].horario_inicio.includes(
                              horario.inicio
                            ) | response[0].horario_fim.includes(horario.fim)
                          ) {
                            horarios.push({
                              inicio: horario.inicio,
                              fim: horario.fim,
                              disponivel: false,
                            });
                          } else {
                            horarios.push({
                              inicio: horario.inicio,
                              fim: horario.fim,
                              disponivel: false,
                            });
                          }
                        }),
                      });
                      break;
                    case 1:
                      return resolve({
                        id_agenda: idAgenda,
                        horarios: dadosAgenda.horarios_seg.map((horario) => {
                          if (
                            response[0].horario_inicio.includes(
                              horario.inicio
                            ) | response[0].horario_fim.includes(horario.fim)
                          ) {
                            horarios.push({
                              inicio: horario.inicio,
                              fim: horario.fim,
                              disponivel: false,
                            });
                          } else {
                            horarios.push({
                              inicio: horario.inicio,
                              fim: horario.fim,
                              disponivel: false,
                            });
                          }
                        }),
                      });
                      break;
                    case 2:
                      return resolve({
                        id_agenda: idAgenda,
                        horarios: dadosAgenda.horarios_ter.map((horario) => {
                          if (
                            response[0].horario_inicio.includes(
                              horario.inicio
                            ) | response[0].horario_fim.includes(horario.fim)
                          ) {
                            horarios.push({
                              inicio: horario.inicio,
                              fim: horario.fim,
                              disponivel: false,
                            });
                          } else {
                            horarios.push({
                              inicio: horario.inicio,
                              fim: horario.fim,
                              disponivel: false,
                            });
                          }
                        }),
                      });
                      break;
                    case 3:
                      return resolve({
                        id_agenda: idAgenda,
                        horarios: dadosAgenda.horarios_qua.map((horario) => {
                          if (
                            response[0].horario_inicio.includes(
                              horario.inicio
                            ) | response[0].horario_fim.includes(horario.fim)
                          ) {
                            horarios.push({
                              inicio: horario.inicio,
                              fim: horario.fim,
                              disponivel: false,
                            });
                          } else {
                            horarios.push({
                              inicio: horario.inicio,
                              fim: horario.fim,
                              disponivel: false,
                            });
                          }
                        }),
                      });
                      break;
                    case 4:
                      return resolve({
                        id_agenda: idAgenda,
                        horarios: dadosAgenda.horarios_qui.map((horario) => {
                          if (
                            response[0].horario_inicio.includes(
                              horario.inicio
                            ) | response[0].horario_fim.includes(horario.fim)
                          ) {
                            horarios.push({
                              inicio: horario.inicio,
                              fim: horario.fim,
                              disponivel: false,
                            });
                          } else {
                            horarios.push({
                              inicio: horario.inicio,
                              fim: horario.fim,
                              disponivel: false,
                            });
                          }
                        }),
                      });
                      break;
                    case 5:
                      return resolve({
                        id_agenda: idAgenda,
                        horarios: dadosAgenda.horarios_sex.map((horario) => {
                          if (
                            response[0].horario_inicio.includes(
                              horario.inicio
                            ) | response[0].horario_fim.includes(horario.fim)
                          ) {
                            horarios.push({
                              inicio: horario.inicio,
                              fim: horario.fim,
                              disponivel: false,
                            });
                          } else {
                            horarios.push({
                              inicio: horario.inicio,
                              fim: horario.fim,
                              disponivel: false,
                            });
                          }
                        }),
                      });
                      break;
                    case 6:
                      return resolve({
                        id_agenda: idAgenda,
                        horarios: dadosAgenda.horarios_sab.map((horario) => {
                          if (
                            response[0].horario_inicio.includes(
                              horario.inicio
                            ) | response[0].horario_fim.includes(horario.fim)
                          ) {
                            horarios.push({
                              inicio: horario.inicio,
                              fim: horario.fim,
                              disponivel: false,
                            });
                          } else {
                            horarios.push({
                              inicio: horario.inicio,
                              fim: horario.fim,
                              disponivel: false,
                            });
                          }
                        }),
                      });
                      break;
                    default:
                      return reject({ erro: "Falha ao listar a agenda." });
                  }
                }
              }
            );
          }
        }
      );
    }).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  }
  
}

module.exports = UsuarioRepository;
