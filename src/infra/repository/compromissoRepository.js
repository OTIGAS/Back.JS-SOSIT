const db = require("../database");

class ComrpomissoRepository {
  constructor() {
    this.db = db;
  }

  async criarCompromisso(idUsuario, idAgenda, data, horario_inicio, horario_fim) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          INSERT INTO compromisso (id_agenda, id_usuario, data_completa, horario_inicio, horario_fim) 
            VALUES (?,?,?,?,?)
        `,
        [idAgenda, idUsuario, data, horario_inicio, horario_fim],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha na inclusão do compromisso." });
          } else if (response.affectedRows === 0) {
            return resolve({ erro: "Nenhum compromisso cadastrado." });
          } else {
            return resolve({ mensagem: "Compromisso cadastrado com sucesso." });
          }
        }
      );
    }).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  }

  async deletarCompromisso(idCompromisso) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          DELETE FROM compromisso WHERE id_compromisso = ?;
        `,
        [idCompromisso],
        (error, response) => {
          if (error) {
            if (error.message.includes("foreign key")) {
              return resolve({
                erro: "Compromisso esta sendo usanda como chave estrangeira.",
              });
            } else {
              return reject({ erro: "Falha ao deletar o compromisso." });
            }
          } else if (response.affectedRows === 0) {
            return resolve({ erro: "Compromisso não encontrado." });
          } else {
            return resolve({ mensagem: "Compromisso deletado com sucesso." });
          }
        }
      );
    }).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  }

  async listarTodosCompromissos() {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT * FROM compromisso;
        `,
        [],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar todos os compromissos." });
          } else if (!response.length) {
            return resolve({ erro: "Nenhum compromisso encontrado." });
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

  async listarCompromissoPorID(idCompromisso) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT * FROM compromisso WHERE id_compromisso = ?;
        `,
        [idCompromisso],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar o compromisso." });
          } else if (!response.length) {
            return resolve({ erro: "Compromisso não encontrado." });
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

  async listarCompromissoPorIdAgendaIdUsuario(idAgenda, idUsuario) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT * FROM compromisso WHERE id_agenda = ? AND id_usuario = ?;
        `,
        [idAgenda, idUsuario],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar o compromisso." });
          } else if (!response.length) {
            return resolve({ erro: "Compromisso não encontrado." });
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

  async listarCompromissoPorIdAgenda(idAgenda) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT * FROM compromisso WHERE id_agenda = ?;
        `,
        [idAgenda],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar o compromisso." });
          } else if (!response.length) {
            return resolve({ erro: "Compromisso não encontrado." });
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

  async listarCompromissoPorIdUsuario(idUsuario) {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT * FROM compromisso WHERE id_usuario = ?;
        `,
        [idUsuario],
        (error, response) => {
          if (error) {
            return reject({ erro: "Falha ao listar o compromisso." });
          } else if (!response.length) {
            return resolve({ erro: "Compromisso não encontrado." });
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
}

module.exports = ComrpomissoRepository;
