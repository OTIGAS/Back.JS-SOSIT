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
    const diasDaSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const diaDaSemanaNumero = new Date(dataCompleta).getDay();
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT * FROM agenda WHERE id_agenda = ?
        `,
        [idAgenda, dataCompleta],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar a agenda." });
          } else {
            const horariosDom = response[0].horarios_dom
            const horariosSeg = response[0].horarios_seg
            const horariosTer = response[0].horarios_ter
            const horariosQua = response[0].horarios_qua
            const horariosQui = response[0].horarios_qui
            const horariosSex = response[0].horarios_sex
            const horariosSab = response[0].horarios_sab
            this.db.query(
              `
                SELECT * FROM compromisso WHERE id_agenda = ? AND data_completa = ?
              `,
              [idAgenda, dataCompleta],
              (error, response) => {
                if (error) {
                  return reject({ erro: "Falha ao listar a agenda." });
                } else if (!response.length) {
                  if(diasDaSemana[diaDaSemanaNumero] === "Domingo") {
                    return horariosDom.map((horarioDom) => {
                      return {
                        horairoInicio: horariosDom.inicio,
                        horarioFim: horariosDom.fim,
                        disponivel: true,
                        idAgenda: idAgenda
                      }
                    })
                  } else if(diasDaSemana[diaDaSemanaNumero] === "Segunda-feira") {
                    return horariosSeg.map((horarioSeg) => {
                      return {
                        horairoInicio: horariosSeg.inicio,
                        horarioFim: horariosSeg.fim,
                        disponivel: true,
                        idAgenda: idAgenda
                      }
                    })
                  } else if(diasDaSemana[diaDaSemanaNumero] === "Terça-feira") {
                    return horariosTer.map((horarioTer) => {
                      return {
                        horairoInicio: horariosTer.inicio,
                        horarioFim: horariosTer.fim,
                        disponivel: true,
                        idAgenda: idAgenda
                      }
                    })
                  } else if(diasDaSemana[diaDaSemanaNumero] === "Quarta-feira") {
                    return horariosQua.map((horarioQua) => {
                      return {
                        horairoInicio: horariosQua.inicio,
                        horarioFim: horariosQua.fim,
                        disponivel: true,
                        idAgenda: idAgenda
                      }
                    })
                  } else if(diasDaSemana[diaDaSemanaNumero] === "Quinta-feira") {
                    return horariosQui.map((horarioQui) => {
                      return {
                        horairoInicio: horariosQui.inicio,
                        horarioFim: horariosQui.fim,
                        disponivel: true,
                        idAgenda: idAgenda
                      }
                    })
                  } else if(diasDaSemana[diaDaSemanaNumero] === "Sexta-feira") {
                    return horariosSex.map((horarioSex) => {
                      return {
                        horairoInicio: horariosSex.inicio,
                        horarioFim: horariosSex.fim,
                        disponivel: true,
                        idAgenda: idAgenda
                      }
                    })
                  } else if(diasDaSemana[diaDaSemanaNumero] === "Domingo") {
                    return horariosSab.map((horarioSab) => {
                      return {
                        horairoInicio: horariosSab.inicio,
                        horarioFim: horariosSab.fim,
                        disponivel: true,
                        idAgenda: idAgenda
                      }
                    })
                  }
                } else {
                  if(diasDaSemana[diaDaSemanaNumero] === "Domingo") {
                    return horariosDom.map((horarioDom) => {
                      if(response[0].horario.includes(horarioDom.inicio) | response[0].horario.includes(horarioDom.fim)) {
                        return {
                          horairoInicio: horarioDom.inicio,
                          horarioFim: horarioDom.fim,
                          disponivel: false,
                          idAgenda: idAgenda
                        }
                      } else {
                        return {
                          horairoInicio: horarioDom.inicio,
                          horarioFim: horarioDom.fim,
                          disponivel: true,
                          idAgenda: idAgenda
                        }
                      }
                    })
                  } else if(diasDaSemana[diaDaSemanaNumero] === "Segunda-feira") {
                    return horariosSeg.map((horarioSeg) => {
                      if(response[0].horario.includes(horarioSeg.inicio) | response[0].horario.includes(horarioSeg.fim)) {
                        return {
                          horairoInicio: horarioSeg.inicio,
                          horarioFim: horarioSeg.fim,
                          disponivel: false,
                          idAgenda: idAgenda
                        }
                      } else {
                        return {
                          horairoInicio: horarioSeg.inicio,
                          horarioFim: horarioSeg.fim,
                          disponivel: true,
                          idAgenda: idAgenda
                        }
                      }
                    })
                  } else if(diasDaSemana[diaDaSemanaNumero] === "Terça-feira") {
                    return horariosTer.map((horarioTer) => {
                      if(response[0].horario.includes(horarioTer.inicio) | response[0].horario.includes(horarioTer.fim)) {
                        return {
                          horairoInicio: horarioTer.inicio,
                          horarioFim: horarioTer.fim,
                          disponivel: false,
                          idAgenda: idAgenda
                        }
                      } else {
                        return {
                          horairoInicio: horarioTer.inicio,
                          horarioFim: horarioTer.fim,
                          disponivel: true,
                          idAgenda: idAgenda
                        }
                      }
                    })
                  } else if(diasDaSemana[diaDaSemanaNumero] === "Quarta-feira") {
                    return horariosQua.map((horarioQua) => {
                      console.log(horario)
                      if(response[0].horario.includes(horarioQua.inicio) | response[0].horario.includes(horarioQua.fim)) {
                        return {
                          horairoInicio: horarioQua.inicio,
                          horarioFim: horarioQua.fim,
                          disponivel: false,
                          idAgenda: idAgenda
                        }
                      } else {
                        return {
                          horairoInicio: horarioQua.inicio,
                          horarioFim: horarioQua.fim,
                          disponivel: true,
                          idAgenda: idAgenda
                        }
                      }
                    })
                  } else if(diasDaSemana[diaDaSemanaNumero] === "Quinta-feira") {
                    return horariosQui.map((horarioQui) => {
                      if(response[0].horario.includes(horarioQui.inicio) | response[0].horario.includes(horarioQui.fim)) {
                        return {
                          horairoInicio: horarioQui.inicio,
                          horarioFim: horarioQui.fim,
                          disponivel: false,
                          idAgenda: idAgenda
                        }
                      } else {
                        return {
                          horairoInicio: horarioQui.inicio,
                          horarioFim: horarioQui.fim,
                          disponivel: true,
                          idAgenda: idAgenda
                        }
                      }
                    })
                  } else if(diasDaSemana[diaDaSemanaNumero] === "Sexta-feira") {
                    return horariosSex.map((horarioSex) => {
                      if(response[0].horario.includes(horarioSex.inicio) | response[0].horario.includes(horarioSex.fim)) {
                        return {
                          horairoInicio: horarioSex.inicio,
                          horarioFim: horarioSex.fim,
                          disponivel: false,
                          idAgenda: idAgenda
                        }
                      } else {
                        return {
                          horairoInicio: horarioSex.inicio,
                          horarioFim: horarioSex.fim,
                          disponivel: true,
                          idAgenda: idAgenda
                        }
                      }
                    })
                  } else if(diasDaSemana[diaDaSemanaNumero] === "Domingo") {
                    return horariosSab.map((horarioSab) => {
                      if(response[0].horario.includes(horarioSab.inicio) | response[0].horario.includes(horarioSab.fim)) {
                        return {
                          horairoInicio: horarioSab.inicio,
                          horarioFim: horarioSab.fim,
                          disponivel: false,
                          idAgenda: idAgenda
                        }
                      } else {
                        return {
                          horairoInicio: horarioSab.inicio,
                          horarioFim: horarioSab.fim,
                          disponivel: true,
                          idAgenda: idAgenda
                        }
                      }
                    })
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
