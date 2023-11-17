const { verificaJWT } = require("../config/jsonwebtoken");

async function verificaToken(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).send({ mensagem: "Token ausente." });
    }

    const [, token] = authorization.split(" ");

    const response = await verificaJWT(token);

    if (response.erro) {
      return res.status(400).send(response);
    } else {
      req.user = response;
    }

    return await next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ erro: "Falha na verificação do Token." });
  }
}

module.exports = { verificaToken };
