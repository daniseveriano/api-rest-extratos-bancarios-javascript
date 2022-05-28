const accounts = require("../database/database");
const { format } = require("date-fns");

const depositBankAccount = async (req, res) => {
  const { numero_conta, valor } = req.body;

  if (!numero_conta || !valor) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos devem ser informados!" });
  }

  if (numero_conta.length !== 6) {
    return res.status(400).json({
      mensagem: "O número da conta deve ter 6 dígitos, com zeros à esquerda!",
    });
  }

  if (valor <= 0) {
    return res
      .status(400)
      .json({ mensagem: "O valor para depósito deve ser maior do que zero!" });
  }

  const indexAccount = accounts.contas.findIndex(
    (account) => account.numero === numero_conta
  );

  if (indexAccount < 0) {
    return res.status(404).json({
      mensagem: "Número de conta bancária inválido!",
    });
  }

  const newDeposit = {
    data: format(new Date(), "yyyy-dd-MM HH:mm:ss"),
    numero_conta,
    valor,
  };

  accounts.depositos.push(newDeposit);

  accounts.contas[indexAccount].saldo += valor;

  return res.status(201).send();
};

module.exports = depositBankAccount;
