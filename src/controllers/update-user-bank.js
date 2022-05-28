const accounts = require("../database/database");

const updateUserBank = async (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({
      mensagem: "Todos os campos da conta bancária devem ser informados!",
    });
  }

  const searchAccount = accounts.contas.find(
    (account) => account.numero === req.params.numeroConta
  );

  if (!searchAccount) {
    return res.status(400).json({
      mensagem: "Número de conta bancária não encontrado!",
    });
  }

  const findSameUser = accounts.contas.find(
    (element) => element.usuario.cpf === cpf || element.usuario.email === email
  );

  if (findSameUser) {
    return res
      .status(403)
      .json({
        mensagem: "Já existe uma conta com o cpf ou e-mail informados!",
      });
  }

  searchAccount.usuario.nome = nome;
  searchAccount.usuario.cpf = cpf;
  searchAccount.usuario.data_nascimento = data_nascimento;
  searchAccount.usuario.telefone = telefone;
  searchAccount.usuario.email = email;
  searchAccount.usuario.senha = senha;

  return res.status(201).send();
};

module.exports = updateUserBank;
