async function verificaToken(req, res, next) {
  console.log(req.headers)
  try {
    const authorization = req.headers && req.headers.authorization

    if (!authorization) {
      return res.status(400).send({ mensagem: "Token ausente." })
    }

    const [,token]= authorization.split(" ")

    if (!token) {
      return res.status(400).send({ erro: "Token ausente." })
    }

    const response = await verificaToken(token)

    if (response.erro) {
      return res.status(400).send(response)
    } else {
      req.user = response
    }

    return await next()

  } catch (error) {
    console.log(error)
    return res.status(401).send({ erro: "Falha ao identificar o token." })
  }
  // return await next()
}

module.exports = verificaToken