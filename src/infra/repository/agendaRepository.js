const db = require('../database')

const crypto = require('../../config/crypto')
const jsonwebtoken = require('../../config/jsonwebtoken')

class UsuarioRepository {
  constructor() {
    this.db = db
  }

  async criarAgenda() {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `
          INSERT INTO agenda (
            id_usuario, nome, servico, descricao, 
            horarios_seg, horarios_ter, horarios_qua, horarios_qui, horarios_sex, horarios_sab, horarios_dom
          ) VALUES (?,?,?,?,?,?,?,?,?,?,?)
        `,
        [

        ], (error, response) => {
          if(error) {
            return reject({ erro: "Falha na inclusão do usuário." })
          } else if (response.affectedRows === 0) {
            return resolve({ erro: ""})
          } else [

          ]
        }
      )
    })
  }

}

module.exports = UsuarioRepository