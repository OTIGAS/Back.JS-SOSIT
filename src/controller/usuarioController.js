const Usuario = require('../infra/repository/usuarioRepository')
const usuarioRepository = new Usuario()

class UsuarioController {
  async autenticarUsuario(req, res) {
    const date = new Date().toLocaleDateString('pt-BR')
    const time = new Date().toLocaleTimeString('pt-BR')
    try {
      const { data } = req.body

      const {email, senha} = data

      if(!email || !senha) {
        res.status(400).send({ erro: "Parâmetro(s) ausente(s)." })
      }

      const response = await usuarioRepository.autenticarUsuario(email,senha)

      if (response.erro) {
        res.status(400).send(response)
      } else {
        res.status(200).send(response)
      }
      console.log(response, date, time)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Erro interno do server' })
    }
  }

  async criarCliente(req, res) {
    const date = new Date().toLocaleDateString('pt-BR')
    const time = new Date().toLocaleTimeString('pt-BR')
    try {
      const { data } = req.body

      const { usuario } = data
      if(
        !usuario.nome || 
        !usuario.email || 
        !usuario.senha
      ) {
        res.status(400).send({ erro: "Parâmetro(s) do Usuário ausente(s)." })
      }

      const { contato } = data

      if(
        !contato.email_contato || 
        !contato.telefone || 
        !contato.nome_contato
      ) {
        res.status(400).send({ erro: "Parâmetro(s) do Contato ausente(s)." })
      }

      const response = await usuarioRepository.criarCliente(usuario, contato)

      if (response.erro) {
        res.status(400).send(response)
      } else {
        res.status(200).send(response)
      }
      console.log(response, date, time)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Erro interno do server' })
    }
  }

  async criarEmpresa(req, res) {
    const date = new Date().toLocaleDateString('pt-BR')
    const time = new Date().toLocaleTimeString('pt-BR')
    try {
      const { data } = req.body
      
      const { usuario } = data

      if(
        !usuario.nome || 
        !usuario.email || 
        !usuario.senha
      ) {
        res.status(400).send({ erro: "Parâmetro(s) do Usuário ausente(s)." })
      }

      const { contato } = data

      if(
        !contato.email_contato || 
        !contato.telefone || 
        !contato.nome_contato
      ) {
        res.status(400).send({ erro: "Parâmetro(s) do Contato ausente(s)." })
      }

      const { endereco } = data

      if(
        !endereco.cep || 
        !endereco.rua || 
        !endereco.num ||
        !endereco.cidade ||
        !endereco.estado
      ) {
        res.status(400).send({ erro: "Parâmetro(s) do Endereco ausente(s)." })
      }

      const { informacoes_empresa } = data

      if(
        !informacoes_empresa.cnpj || 
        !informacoes_empresa.descricao || 
        !informacoes_empresa.link_site ||
        !informacoes_empresa.img_perfil
      ) {
        res.status(400).send({ erro: "Parâmetro(s) do Empresa ausente(s)." })
      }

      const { dados_bancarios } = data

      if(
        !dados_bancarios.banco || 
        !dados_bancarios.agencia || 
        !dados_bancarios.digito ||
        !dados_bancarios.tipo_conta ||
        !dados_bancarios.conta
      ) {
        res.status(400).send({ erro: "Parâmetro(s) dos Dados Bancarios ausente(s)." })
      }

      const response = await usuarioRepository.criarEmpresa(
        usuario, 
        contato,
        endereco,
        informacoes_empresa,
        dados_bancarios
      )

      if (response.erro) {
        res.status(400).send(response)
      } else {
        res.status(200).send(response)
      }
      console.log(response, date, time)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Erro interno do server' })
    }
  }

  async deletaUsuario(req, res) {
    const date = new Date().toLocaleDateString('pt-BR')
    const time = new Date().toLocaleTimeString('pt-BR')
    try {
      const { data } = req.body

      const idUsuario = data.id

      if(!idUsuario) {
        res.status(400).send({ erro: "Parâmetro(s) ausente(s)." })
      }

      const response = await usuarioRepository.deletaUsuario(idUsuario)

      if (response.erro) {
        res.status(400).send(response)
      } else {
        res.status(200).send(response)
      }
      console.log(response, date, time)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Erro interno do server' })
    }
  }

  async listarTodosUsuarios(req, res) {
    const date = new Date().toLocaleDateString('pt-BR')
    const time = new Date().toLocaleTimeString('pt-BR')
    try {   
      const { tipo } = req.params

      if (!tipo) {
        res.status(400).send({ erro: "Parâmetro(s) ausente(s)." })
      }
      
      let response

      if (tipo === "cliente" || tipo === "Cliente") {
        response = await usuarioRepository.listarTodosClientes(tipo)
      } else if (tipo === "empresa" || tipo === "Empresa") {
        response = await usuarioRepository.listarTodasEmpresas(tipo)
      } else {
        response = { erro: "Falha ao identificar o tipo de usuário." }
      }

      if (response.erro) {
        res.status(400).send(response)
      } else {
        res.status(200).send(response)
      }
      console.log(response, date, time)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Erro interno do server' })
    }
  }

  async listarUsuarioPorId(req, res) {
    const date = new Date().toLocaleDateString('pt-BR')
    const time = new Date().toLocaleTimeString('pt-BR')
    try {
      const { idUsuario, tipo } = req.params

      if (!idUsuario || !tipo) {
        res.status(400).send({ erro: "Parâmetro(s) ausente(s)." })
      }

      let response

      if (tipo === "cliente" || tipo === "Cliente") {
        response = await usuarioRepository.listarClientePorId(idUsuario)
      } else if (tipo === "empresa" || tipo === "Empresa") {
        response = await usuarioRepository.listarEmpresaPorId(idUsuario)
      } else {
        response = { erro: "Falha ao identificar o tipo de usuário." }
      }

      if (response.erro) {
        res.status(400).send(response)
      } else {
        res.status(200).send(response)
      }
      console.log(response, date, time)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Erro interno do server' })
    }
  }

  async atualizarContato(req, res) {
    const date = new Date().toLocaleDateString('pt-BR')
    const time = new Date().toLocaleTimeString('pt-BR')
    try {
      const { data } = req.body

      const { idUsuario, contato } = data

      if (!idUsuario) {
        res.status(400).send({ erro: "Parâmetro(s) ausente(s)." })
      }

      if(
        !contato.email_contato || 
        !contato.telefone || 
        !contato.nome_contato
      ) {
        res.status(400).send({ erro: "Parâmetro(s) do Contato ausente(s)." })
      }
      
      const response = await usuarioRepository.atualizarContato(idUsuario, contato)

      if (response.erro) {
        res.status(400).send(response)
      } else {
        res.status(200).send(response)
      }
      console.log(response, date, time)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Erro interno do server' })
    }
  }

  async atualizarEndereco(req, res) {
    const date = new Date().toLocaleDateString('pt-BR')
    const time = new Date().toLocaleTimeString('pt-BR')
    try {
      const { data } = req.body

      const { idUsuario, endereco } = data

      if (!idUsuario) {
        res.status(400).send({ erro: "Parâmetro(s) ausente(s)." })
      }

      if(
        !endereco.cep || 
        !endereco.rua || 
        !endereco.num || 
        !endereco.cidade || 
        !endereco.estado
      ) {
        res.status(400).send({ erro: "Parâmetro(s) do Endereço ausente(s)." })
      }
      
      const response = await usuarioRepository.atualizarEndereco(idUsuario, endereco)

      if (response.erro) {
        res.status(400).send(response)
      } else {
        res.status(200).send(response)
      }
      console.log(response, date, time)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Erro interno do server' })
    }
  }

  async atualizarInformacoesEmpresa(req, res) {
    const date = new Date().toLocaleDateString('pt-BR')
    const time = new Date().toLocaleTimeString('pt-BR')
    try {
      const { data } = req.body

      const { idUsuario, informacoes_empresa } = data

      if (!idUsuario) {
        res.status(400).send({ erro: "Parâmetro(s) ausente(s)." })
      }

      if(
        !informacoes_empresa.cnpj || 
        !informacoes_empresa.descricao || 
        !informacoes_empresa.link_site || 
        !informacoes_empresa.img_perfil
      ) {
        res.status(400).send({ erro: "Parâmetro(s) do Endereço ausente(s)." })
      }
      
      const response = await usuarioRepository.atualizarInformacoesEmpresa(idUsuario, informacoes_empresa)

      if (response.erro) {
        res.status(400).send(response)
      } else {
        res.status(200).send(response)
      }
      console.log(response, date, time)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Erro interno do server' })
    }
  }

  async atualizarDadosBancarios(req, res) {
    const date = new Date().toLocaleDateString('pt-BR')
    const time = new Date().toLocaleTimeString('pt-BR')
    try {
      const { data } = req.body

      const { idUsuario, dados_bancarios } = data

      if (!idUsuario) {
        res.status(400).send({ erro: "Parâmetro(s) ausente(s)." })
      }

      if(
        !dados_bancarios.banco || 
        !dados_bancarios.agencia || 
        !dados_bancarios.digito || 
        !dados_bancarios.tipo_conta || 
        !dados_bancarios.conta
      ) {
        res.status(400).send({ erro: "Parâmetro(s) do Endereço ausente(s)." })
      }
      
      const response = await usuarioRepository.atualizarDadosBancarios(idUsuario, dados_bancarios)

      if (response.erro) {
        res.status(400).send(response)
      } else {
        res.status(200).send(response)
      }
      console.log(response, date, time)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Erro interno do server' })
    }
  }
}

module.exports = UsuarioController