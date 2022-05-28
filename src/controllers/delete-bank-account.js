const accounts = require("../database/database");

const deleteBankAccount = async (req, res) => {
  if (req.params.numeroConta.length !== 6) {
    return res.status(400).json({
      mensagem: "O número da conta deve ter 6 dígitos, com zeros à esquerda!",
    });
  }

  const indexAccount = accounts.contas.findIndex(
    (account) => account.numero === req.params.numeroConta
  );

  if (indexAccount < 0) {
    return res.status(404).json({
      mensagem: "Número de conta bancária inválido!",
    });
  }

  if (accounts.contas[indexAccount].saldo !== 0) {
    return res.status(404).json({
      mensagem: "A conta só pode ser removida se o saldo for zero!",
    });
  }

  accounts.contas.splice(indexAccount, 1);

  return res.status(201).send();
};

module.exports = deleteBankAccount;
