const accounts = require("../database/database");
const { format } = require("date-fns");

const withdrawBankAccount = async (req, res) => {
  const { numero_conta, valor, senha } = req.body;

  if (!numero_conta || !valor || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos devem ser informados!" });
  }

  if (numero_conta.length !== 6) {
    return res
      .status(400)
      .json({
        mensagem: "O número da conta deve ter 6 dígitos, com zeros à esquerda!",
      });
  }

  const indexAccount = accounts.contas.findIndex(
    (account) => account.numero === numero_conta
  );

  if (indexAccount < 0) {
    return res.status(404).json({
      mensagem: "Número de conta bancária inválido!",
    });
  }

  if (valor <= 0) {
    return res
      .status(400)
      .json({ mensagem: "O valor para depósito deve ser maior do que zero!" });
  }

  if (accounts.contas[indexAccount].saldo < valor) {
    return res.status(404).json({
      mensagem: "Não há saldo disponível para o saque!",
    });
  }

  if (accounts.contas[indexAccount].usuario.senha !== senha) {
    return res.status(404).json({
      mensagem: "Senha de usuário inválida!",
    });
  }

  const newWithdrawal = {
    data: format(new Date(), "yyyy-dd-MM HH:mm:ss"),
    numero_conta,
    valor,
  };

  accounts.saques.push(newWithdrawal);

  accounts.contas[indexAccount].saldo -= valor;

  return res.status(201).send();
};

module.exports = withdrawBankAccount;
