const jwt = require('jsonwebtoken')

function criaToken(dados) {
  const token = jwt.sign(
    dados, 
    process.env.PALAVRA_CHAVE_TOKEN
  )
  
  return token
}

module.exports = {
  criaToken
};