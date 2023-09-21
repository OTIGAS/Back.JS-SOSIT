const db = require('../database')

const crypto = require('../../config/crypto')
const jsonwebtoken = require('../../config/jsonwebtoken')

class UsuarioRepository {
  constructor() {
    this.db = db
  }

  async autenticarUsuario(email, senha) {
    try {
      return await new Promise((resolve, reject) => {
        this.db.query(
          `
            SELECT id_usuario, tipo, senha FROM usuario WHERE email = ?;
          `,
          [
            email
          ],
          async (error, response) => {
            if (error) {
              return reject({ erro: "Falha na autenticação." })
            } else if (!response.length) {
              return resolve({ erro: 'E-mail e/ou Senha inválidos.' })
            } else {

              const senha_ecrypted = response[0].senha

              let senha_decrypted = await crypto.decripto(senha_ecrypted)

              if (senha_decrypted === senha) {

                const token = jsonwebtoken.criaToken({ id: response[0].id_usuario, tipo: response[0].tipo })

                return resolve({ 
                  mensagem: 'Usuário autenticado com sucesso.', 
                  tipo: response[0].tipo,
                  token 
                })
              } else {
                return resolve({ erro: 'E-mail e/ou Senha inválidos.' })
              }
            }
          }
        )
      })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async criarCliente(usuario, contato) {
    try {
      usuario.senha = await crypto.encripto(usuario.senha)
      return await new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
          if (err) {
            reject("Ocorreu um erro ao criar a transação.")
            return
          }
          return db.execute(
            `
              INSERT INTO contato (email_contato, telefone, nome_contato)
              VALUES (?,?,?);
            `,
            [
              contato.email_contato,
              contato.telefone,
              contato.nome_contato
            ],
            (error, response) => {
              if(error) {
                console.error(error)
                return db.rollback(() => {
                  return reject({
                    erro: "Falha na inclusão do contato."
                  })
                })
              } else if (response.affectedRows === 0) {
                return db.rollback(() => {
                  return reject({
                    erro: "Contato não cadastrado.",
                  })
                })
              } else {
                const idContato = response.insertId
                return db.execute(
                  `
                    INSERT INTO usuario (nome, tipo, email, senha, id_contato)
                    VALUES (?,?,?,?,?);
                  `,
                  [
                    usuario.nome,
                    'cliente',
                    usuario.email,
                    usuario.senha,
                    idContato
                  ],
                  (error, response) => {
                    if(error) {
                      console.error(error)
                      if (error.message.includes("Duplicate")) {
                        return db.rollback(() => {
                          return reject({
                            erro: "E-mail já cadastrado."
                          })
                        })
                      } else {
                        return db.rollback(() => {
                          return reject({
                            erro: "Falha na inclusão do usuário."
                          })
                        })
                      }
                    } else if (response.affectedRows === 0) {
                      return db.rollback(() => {
                        return reject({
                          erro: "Usuário não cadastrado.",
                        })
                      })
                    } else {
                      const token = jsonwebtoken.criaToken({ 
                        id: response.insertId, 
                        tipo: "cliente" 
                      })
                      return db.commit((err) => {
                        if (err) {
                          return db.rollback(() => {
                            return reject("Falha no Commit")
                          })
                        } else {
                          return resolve({
                            mensagem: "Usuário cadastrado com sucesso.",
                            token
                          })
                        }
                      })
                    }
                  }
                )
              }
            }
          )
        })
      })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async criarEmpresa(usuario, contato, endereco, informacoes_empresa, dados_bancarios) {
    try {
      if (typeof usuario.senha !== 'string') {
        throw new Error("A senha do usuário não é uma string válida.");
      }
      usuario.senha = await crypto.encripto(usuario.senha);
      return await new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
          if(err) {
            reject("Ocorreu um erro ao criar a transação.")
            return
          }
          return db.execute(
            `
              INSERT INTO contato (email_contato, telefone, nome_contato)
              VALUES (?,?,?);
            `,
            [
              contato.email_contato,
              contato.telefone,
              contato.nome_contato
            ],
            (error, response) => {
              if(error) {
                return db.rollback(() => {
                  return reject({
                    erro: "Falha na inclusão do contato."
                  })
                })
              } else if (response.affectedRows === 0) {
                return db.rollback(() => {
                  return reject({
                    erro: "Contato não cadastrado.",
                  })
                })
              } else {
                const idContato = response.insertId
                return db.execute(
                  `
                    INSERT INTO endereco (cep, rua, num, cidade, estado)
                    VALUES (?,?,?,?,?);
                  `,
                  [
                    endereco.cep,
                    endereco.rua,
                    endereco.num,
                    endereco.cidade,
                    endereco.estado
                  ],
                  (error, response) => {
                    if(error) {
                      return db.rollback(() => {
                        return reject({
                          erro: "Falha na inclusão do endereço."
                        })
                      })
                    } else if (response.affectedRows === 0) {
                      return db.rollback(() => {
                        return reject({
                          erro: "Endereço não cadastrado.",
                        })
                      })
                    } else {
                      const idEndereco = response.insertId
                      return db.execute(
                        `
                          INSERT INTO informacoes_empresa (cnpj, descricao, link_site, img_perfil)
                          VALUES (?,?,?,?);
                        `,
                        [
                          informacoes_empresa.cnpj,
                          informacoes_empresa.descricao,
                          informacoes_empresa.link_site,
                          informacoes_empresa.img_perfil
                        ],
                        (error, response) => {
                          if(error) {
                            return db.rollback(() => {
                              return reject({
                                erro: "Falha na inclusão das informações da empresa."
                              })
                            })
                          } else if (response.affectedRows === 0) {
                            return db.rollback(() => {
                              return reject({
                                erro: "Informações da empresa não cadastradas.",
                              })
                            })
                          } else {
                            const idInfoEmpresa = response.insertId
                            return db.execute(
                              `
                                INSERT INTO dados_bancarios (banco, agencia, digito, tipo_conta, conta)
                                VALUES (?,?,?,?,?);
                              `,
                              [
                                dados_bancarios.banco,
                                dados_bancarios.agencia,
                                dados_bancarios.digito,
                                dados_bancarios.tipo_conta,
                                dados_bancarios.conta
                              ],
                              (error, response) => {
                                if(error) {
                                  return db.rollback(() => {
                                    return reject({
                                      erro: "Falha na inclusão dos dados bancarios."
                                    })
                                  })
                                } else if (response.affectedRows === 0) {
                                  return db.rollback(() => {
                                    return reject({
                                      erro: "Dados bancarios não cadastrados.",
                                    })
                                  })
                                } else {
                                  const idDadosBanc = response.insertId

                                  return db.execute(
                                    `
                                      INSERT INTO usuario (nome, tipo, email, senha, id_contato, id_endereco, id_informacoes_empresa, id_dados_bancarios)
                                      VALUES (?,?,?,?,?,?,?,?);
                                    `,
                                    [
                                      usuario.nome,
                                      'empresa',
                                      usuario.email,
                                      usuario.senha,
                                      idContato,
                                      idEndereco,
                                      idInfoEmpresa,
                                      idDadosBanc
                                    ],
                                    (error, response) => {
                                      if(error) {
                                        if (error.message.includes("Duplicate")) {
                                          return db.rollback(() => {
                                            return reject({
                                              erro: "E-mail já cadastrado."
                                            })
                                          })
                                        } else {
                                          return db.rollback(() => {
                                            return reject({
                                              erro: "Falha na inclusão do usuário."
                                            })
                                          })
                                        }
                                      } else if (response.affectedRows === 0) {
                                        return db.rollback(() => {
                                          return reject({
                                            erro: "Usuário não cadastrado.",
                                          })
                                        })
                                      } else {
                                        const token = jsonwebtoken.criaToken({ 
                                          id: response.insertId, 
                                          tipo: "empresa" 
                                        })
                                        return db.commit((err) => {
                                          if (err) {
                                            return db.rollback(() => {
                                              return reject("Falha no Commit")
                                            })
                                          } else {
                                            return resolve({
                                              mensagem: "Usuário cadastrado com sucesso.",
                                              token
                                            })
                                          }
                                        })
                                      }
                                    }
                                  )
                                }
                              }
                            )
                          }
                        }
                      )
                    }
                  } 
                )
              }
            }
          )
        })
      })
    }
    catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async deletaUsuario(idUsuario) {
    try {
      return await new Promise((resolve, reject) => {
        this.db.query(
          `
            DELETE FROM usuario WHERE id_usuario = ?;
          `,
          [
            idUsuario
          ],
          (error, response) => {
            if (error) {
              console.log(error)
              return reject({ erro: "Falha ao deletar o usuario." })
            } else if (response.affectedRows === 0) {
              return resolve({ erro: "Nenhum usuario encontrado." })
            } else {
              return resolve({ mensagem: "Usuário deletado com sucesso." })
            }
          }
        )
      })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async listarTodosClientes() {
    try {
      return await new Promise((resolve, reject) => {
        this.db.query(
          `
            SELECT u.id_usuario, u.nome, u.tipo, c.*
            FROM usuario u
            INNER JOIN contato c ON u.id_contato = c.id_contato
            WHERE u.tipo LIKE 'cliente';
          `,
          [],
          (error, response) => {
            if (error) {
              return reject({ erro: "E-mail já cadastrado." })
            } else if (!response.length) {
              return resolve({ mensagem: "Nenhum usuario encontrado." })
            } else {
              return resolve(response)
            }
          }
        )
      })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async listarTodasEmpresas() {
    try {
      return await new Promise((resolve, reject) => {
        this.db.query(
          `
            SELECT id_usuario, u.nome, u.tipo, c.*, e.*, ie.* FROM usuario u
            INNER JOIN contato c ON u.id_contato = c.id_contato
            INNER JOIN endereco e ON u.id_endereco = e.id_endereco
            INNER JOIN informacoes_empresa ie ON u.id_informacoes_empresa = ie.id_informacoes_empresa
            INNER JOIN dados_bancarios db ON u.id_dados_bancarios = db.id_dados_bancarios
            WHERE u.tipo LIKE 'empresa';
          `,
          [],
          (error, response) => {
            console.log(response)
            if (error) {
              return reject({ erro: "Falha ao listar os usuarios." })
            } else if (!response.length) {
              return resolve({ mensagem: "Nenhum usuario encontrado." })
            } else {
              return resolve(response)
            }
          }
        )
      })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async listarClientePorId(idUsuario) {
    try {
      return await new Promise((resolve, reject) => {
        this.db.query(
          `
            SELECT u.id_usuario, u.nome, u.tipo, c.* FROM usuario u
            INNER JOIN contato c ON u.id_contato = c.id_contato
            WHERE u.id_usuario = ?;
          `,
          [
            idUsuario
          ],
          (error, response) => {
            if (error) {
              console.log(error)
              return reject({ erro: "Falha ao listar o usuario." })
            } else if (!response.length) {
              return resolve({ mensagem: "Nenhum usuario encontrado." })
            } else {
              return resolve(response)
            }
          }
        )
      })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async listarEmpresaPorId(idUsuario) {
    try {
      return await new Promise((resolve, reject) => {
        this.db.query(
          `
            SELECT u.id_usuario, u.nome, u.tipo, c.*, e.*, ie.* FROM usuario u
            INNER JOIN contato c ON u.id_contato = c.id_contato
            INNER JOIN endereco e ON u.id_endereco = e.id_endereco
            INNER JOIN informacoes_empresa ie ON u.id_informacoes_empresa = ie.id_informacoes_empresa
            INNER JOIN dados_bancarios db ON u.id_dados_bancarios = db.id_dados_bancarios
            WHERE u.id_usuario = ?;
          `,
          [
            idUsuario
          ],
          (error, response) => {
            if (error) {
              return reject({ erro: "Falha ao listar o usuario." })
            } else if (!response.length) {
              return resolve({ mensagem: "Nenhum usuario encontrado." })
            } else {
              return resolve(response)
            }
          }
        )
      })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async listarEmpresaPorIdComBanco(idUsuario) {
    try {
      return await new Promise((resolve, reject) => {
        this.db.query(
          `
            SELECT u.id_usuario, u.nome, u.tipo, c.*, e.*, ie.*, db.* FROM usuario u
            INNER JOIN contato c ON u.id_contato = c.id_contato
            INNER JOIN endereco e ON u.id_endereco = e.id_endereco
            INNER JOIN informacoes_empresa ie ON u.id_informacoes_empresa = ie.id_informacoes_empresa
            INNER JOIN dados_bancarios db ON u.id_dados_bancarios = db.id_dados_bancarios
            WHERE u.id_usuario = ?;
          `,
          [
            idUsuario
          ],
          (error, response) => {
            if (error) {
              return reject({ erro: "Falha ao listar o usuario." })
            } else if (!response.length) {
              return resolve({ mensagem: "Nenhum usuario encontrado." })
            } else {
              return resolve(response)
            }
          }
        )
      })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async atualizarContato(idUsuario, contato) {
    try {
      return await new Promise((resolve,reject) => {
        this.db.query(
          `
            UPDATE contato c
            JOIN usuario u ON c.id_contato = u.id_contato
            SET c.email_contato = ?, c.telefone = ?, c.nome_contato = ?
            WHERE u.id_usuario = ?;
          `,
          [
            contato.email_contato,
            contato.telefone,
            contato.nome_contato,
            idUsuario
          ],
          (error, response) => {
            if (error) {
              return reject({ erro: "Falha ao atualizar o contato do usuario." })
            } else if (response.affectedRows === 0) {
              return resolve({ erro: "Nenhum usuario encontrado." })
            } else {
              return resolve({ mensagem: "Dados de contato atualizados com sucesso." })
            }
          }
        )
      })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async atualizarEndereco(idUsuario, endereco) {
    try {
      return await new Promise((resolve,reject) => {
        this.db.query(
          `
            UPDATE endereco e
            JOIN usuario u ON u.id_endereco = e.id_endereco
            SET e.cep = ?, e.rua = ?, e.num = ?, e.cidade = ?, e.estado = ?
            WHERE u.id_usuario = ?;
          `,
          [
            endereco.cep,
            endereco.rua,
            endereco.num,
            endereco.cidade,
            endereco.estado,
            idUsuario
          ],
          (error, response) => {
            if (error) {
              return reject({ erro: "Falha ao atualizar o contato do usuario." })
            } else if (response.affectedRows === 0) {
              return resolve({ erro: "Dados de endereço deste usuário, não encontrados." })
            } else {
              return resolve({ mensagem: "Dados de contato atualizados com sucesso." })
            }
          }
        )
      })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async atualizarInformacoesEmpresa(idUsuario, informacoes_empresa) {
    try {
      return await new Promise((resolve,reject) => {
        this.db.query(
          `
            UPDATE informacoes_empresa ie
            JOIN usuario u ON ie.id_informacoes_empresa = u.id_informacoes_empresa
            SET ie.cnpj = ?, ie.descricao = ?, ie.link_site = ?, ie.img_perfil = ?
            WHERE u.id_usuario = ?;                        
          `,
          [
            informacoes_empresa.cnpj,
            informacoes_empresa.descricao,
            informacoes_empresa.link_site,
            informacoes_empresa.img_perfil,
            idUsuario
          ],
          (error, response) => {
            if (error) {
              return reject({ erro: "Falha ao atualizar o informações de empresa do usuario." })
            } else if (response.affectedRows === 0) {
              return resolve({ erro: "Dados da empresa deste usuário, não encontrados." })
            } else {
              return resolve({ mensagem: "Dados da empresa atualizados com sucesso." })
            }
          }
        )
      })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async atualizarDadosBancarios(idUsuario, dados_bancarios) {
    try {
      return await new Promise((resolve,reject) => {
        this.db.query(
          `
            UPDATE dados_bancarios db
            JOIN usuario u ON db.id_dados_bancarios = u.id_dados_bancarios
            SET db.banco = ?, db.agencia = ?, db.digito = ?, db.tipo_conta = ?, db.conta = ?
            WHERE u.id_usuario = ?;                  
          `,
          [
            dados_bancarios.banco,
            dados_bancarios.agencia,
            dados_bancarios.digito,
            dados_bancarios.tipo_conta,
            dados_bancarios.conta,
            idUsuario
          ],
          (error, response) => {
            if (error) {
              return reject({ erro: "Falha ao atualizar os dados bancarios do usuario." })
            } else if (response.affectedRows === 0) {
              return resolve({ erro: "Dados bancarios deste usuário, não encontrados." })
            } else {
              return resolve({ mensagem: "Dados da bancarios atualizados com sucesso." })
            }
          }
        )
      })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}

module.exports = UsuarioRepository