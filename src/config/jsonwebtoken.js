const jwt = require('jsonwebtoken')

function criaToken(dados) {
  return jwt.sign(
    dados, 
    process.env.PALAVRA_CHAVE_TOKEN
  )
}

function verificaToken(token) {
  return jwt.verify(token, process.env.PALAVRA_CHAVE_TOKEN, async (err, decoded) => {
    if (err) {
      return res.status(400).send({ erro: "Token invalido." })
    } else {
      return decoded
    }
  })
}

module.exports = {
  criaToken, 
  verificaToken
}