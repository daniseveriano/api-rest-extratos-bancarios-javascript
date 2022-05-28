const accounts = require("../database/database");

let idDaConta = 1;

const createBankAccounts = async (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({
      mensagem: "Todos os campos da conta bancária devem ser informados!",
    });
  }

  const findSameUser = accounts.contas.find(
    (element) => element.usuario.cpf === cpf || element.usuario.email === email
  );

  if (accounts.contas.length > 0 && findSameUser) {
    return res
      .status(403)
      .json({
        mensagem: "Já existe uma conta com o cpf ou e-mail informados!",
      });
  }

  const newBankAccount = {
    numero: String(idDaConta).padStart(6, "0"),
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };

  accounts.contas.push(newBankAccount);

  idDaConta++;

  return res.status(201).send();
};

module.exports = createBankAccounts;
