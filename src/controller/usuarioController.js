const Usuario = require("../infra/repository/usuarioRepository");
const usuarioRepository = new Usuario();

class UsuarioController {
  async autenticarUsuario(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await usuarioRepository.autenticarUsuario(email, senha);

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async criarCliente(req, res) {
    try {
      const { data } = req.body;

      const { usuario } = data;
      if (!usuario.nome || !usuario.email || !usuario.senha) {
        return res
          .status(400)
          .send({ erro: "Parâmetro(s) do Usuário ausente(s)." });
      }

      const { contato } = data;

      if (
        !contato.email_contato ||
        !contato.telefone ||
        !contato.nome_contato
      ) {
        return res
          .status(400)
          .send({ erro: "Parâmetro(s) do Contato ausente(s)." });
      }

      const response = await usuarioRepository.criarCliente(usuario, contato);

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async criarEmpresa(req, res) {
    try {
      const { data } = req.body;

      const { usuario } = data;

      if (!usuario.nome || !usuario.email || !usuario.senha) {
        return res
          .status(400)
          .send({ erro: "Parâmetro(s) do Usuário ausente(s)." });
      }

      const { contato } = data;

      if (
        !contato.email_contato ||
        !contato.telefone ||
        !contato.nome_contato
      ) {
        return res
          .status(400)
          .send({ erro: "Parâmetro(s) do Contato ausente(s)." });
      }

      const { endereco } = data;

      if (
        !endereco.cep ||
        !endereco.rua ||
        !endereco.num ||
        !endereco.cidade ||
        !endereco.estado
      ) {
        return res
          .status(400)
          .send({ erro: "Parâmetro(s) do Endereco ausente(s)." });
      }

      const { informacoes_empresa } = data;

      if (
        !informacoes_empresa.cnpj ||
        !informacoes_empresa.descricao ||
        !informacoes_empresa.link_site ||
        !informacoes_empresa.img_perfil
      ) {
        return res
          .status(400)
          .send({ erro: "Parâmetro(s) do Empresa ausente(s)." });
      }

      const { dados_bancarios } = data;

      if (
        !dados_bancarios.banco ||
        !dados_bancarios.agencia ||
        !dados_bancarios.digito ||
        !dados_bancarios.tipo_conta ||
        !dados_bancarios.conta
      ) {
        return res
          .status(400)
          .send({ erro: "Parâmetro(s) dos Dados Bancarios ausente(s)." });
      }

      const response = await usuarioRepository.criarEmpresa(
        usuario,
        contato,
        endereco,
        informacoes_empresa,
        dados_bancarios
      );

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async deletaUsuario(req, res) {
    try {
      const idUsuario = req.user.id;

      if (!idUsuario) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const response = await usuarioRepository.deletaUsuario(idUsuario);

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async listarTodosUsuarios(req, res) {
    try {
      const { tipo } = req.query;

      if (!tipo) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      let response;

      if (tipo === "cliente" || tipo === "Cliente") {
        response = await usuarioRepository.listarTodosClientes(tipo);
      } else if (tipo === "empresa" || tipo === "Empresa") {
        response = await usuarioRepository.listarTodasEmpresas(tipo);
      } else {
        response = { erro: "Falha ao identificar o tipo de usuário." };
      }

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async listarMeuPerfil(req, res) {
    try {
      const idUsuario = req.user.id;
      const tipo = req.user.tipo;

      if (!idUsuario || !tipo) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      let response;

      if (tipo === "cliente" || tipo === "Cliente") {
        response = await usuarioRepository.listarClientePorId(idUsuario);
      } else if (tipo === "empresa" || tipo === "Empresa") {
        response = await usuarioRepository.listarEmpresaPorIdComBanco(
          idUsuario
        );
      } else {
        response = { erro: "Falha ao identificar o tipo de usuário." };
      }

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async listarUsuarioPorId(req, res) {
    try {
      const { idUsuario, tipo } = req.query;

      if (!idUsuario || !tipo) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      let response;

      if (tipo === "cliente" || tipo === "Cliente") {
        response = await usuarioRepository.listarClientePorId(idUsuario);
      } else if (tipo === "empresa" || tipo === "Empresa") {
        response = await usuarioRepository.listarEmpresaPorId(idUsuario);
      } else {
        response = { erro: "Falha ao identificar o tipo de usuário." };
      }

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async atualizarUsuario(req, res) {
    try {
      const idUsuario = req.user.id;

      if (!idUsuario) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const { usuario } = req.body;

      if (
        !usuario ||
        !usuario.nome ||
        !usuario.email
      ) {
        return res
          .status(400)
          .send({ erro: "Parâmetro(s) do Usuário ausente(s)." });
      }

      const response = await usuarioRepository.atualizarUsuario(
        idUsuario,
        usuario
      );

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async atualizarContato(req, res) {
    try {
      const idUsuario = req.user.id;

      if (!idUsuario) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const { contato } = req.body;

      if (
        !contato ||
        !contato.email_contato ||
        !contato.telefone ||
        !contato.nome_contato
      ) {
        return res
          .status(400)
          .send({ erro: "Parâmetro(s) do Contato ausente(s)." });
      }

      const response = await usuarioRepository.atualizarContato(
        idUsuario,
        contato
      );

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async atualizarEndereco(req, res) {
    try {
      const idUsuario = req.user.id;

      if (!idUsuario) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const { endereco } = req.body;

      if (
        !endereco ||
        !endereco.cep ||
        !endereco.rua ||
        !endereco.num ||
        !endereco.cidade ||
        !endereco.estado
      ) {
        return res
          .status(400)
          .send({ erro: "Parâmetro(s) do Endereço ausente(s)." });
      }

      const response = await usuarioRepository.atualizarEndereco(
        idUsuario,
        endereco
      );

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async atualizarInformacoesEmpresa(req, res) {
    try {
      const idUsuario = req.user.id;

      if (!idUsuario) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const { informacoes_empresa } = req.body;

      if (
        !informacoes_empresa ||
        !informacoes_empresa.cnpj ||
        !informacoes_empresa.descricao ||
        !informacoes_empresa.link_site ||
        !informacoes_empresa.img_perfil
      ) {
        return res
          .status(400)
          .send({ erro: "Parâmetro(s) do Endereço ausente(s)." });
      }

      const response = await usuarioRepository.atualizarInformacoesEmpresa(
        idUsuario,
        informacoes_empresa
      );

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }

  async atualizarDadosBancarios(req, res) {
    try {
      const idUsuario = req.user.id;

      if (!idUsuario) {
        return res.status(400).send({ erro: "Parâmetro(s) ausente(s)." });
      }

      const { dados_bancarios } = req.body;

      if (
        !dados_bancarios ||
        !dados_bancarios.banco ||
        !dados_bancarios.agencia ||
        !dados_bancarios.digito ||
        !dados_bancarios.tipo_conta ||
        !dados_bancarios.conta
      ) {
        return res
          .status(400)
          .send({ erro: "Parâmetro(s) do Endereço ausente(s)." });
      }

      const response = await usuarioRepository.atualizarDadosBancarios(
        idUsuario,
        dados_bancarios
      );

      if (response.erro) {
        return res.status(400).send(response);
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ erro: "Erro interno do server" });
    }
  }
}

module.exports = UsuarioController;
