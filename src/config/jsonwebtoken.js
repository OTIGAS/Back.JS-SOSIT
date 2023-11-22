/*DOTENV*/ require("dotenv").config();

const jwt = require("jsonwebtoken");

function criaToken(dados) {
  return jwt.sign(dados, process.env.PALAVRA_CHAVE_TOKEN);
}

function verificaJWT(token) {
  console.log(token)
  return jwt.verify(
    token,
    process.env.PALAVRA_CHAVE_TOKEN,
    async (err, decoded) => {
      if (err) {
        return { erro: "Não autorizado." };
      }
      return decoded;
    }
  );
}

module.exports = {
  criaToken,
  verificaJWT,
};
