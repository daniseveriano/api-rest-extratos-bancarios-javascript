const accounts = require("../database/database");
const { format } = require("date-fns");

const transferBankAccounts = async (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos devem ser informados!" });
  }

  if (numero_conta_origem.length !== 6 || numero_conta_destino.length !== 6) {
    return res.status(400).json({
      mensagem: "O número da conta deve ter 6 dígitos, com zeros à esquerda!",
    });
  }

  const indexOriginAccount = accounts.contas.findIndex(
    (account) => account.numero === numero_conta_origem
  );

  if (indexOriginAccount < 0) {
    return res.status(404).json({
      mensagem: "Número de conta bancária de origem inválido!",
    });
  }

  const indexDestinyAccount = accounts.contas.findIndex(
    (account) => account.numero === numero_conta_destino
  );

  if (indexDestinyAccount < 0) {
    return res.status(404).json({
      mensagem: "Número de conta bancária de destino inválido!",
    });
  }

  if (valor <= 0) {
    return res
      .status(400)
      .json({ mensagem: "O valor para depósito deve ser maior do que zero!" });
  }

  if (accounts.contas[indexOriginAccount].saldo < valor) {
    return res.status(404).json({
      mensagem: "Não há saldo disponível para a transferência!",
    });
  }

  if (accounts.contas[indexOriginAccount].usuario.senha !== senha) {
    return res.status(404).json({
      mensagem: "Senha de usuário inválida!",
    });
  }

  const newTransfer = {
    data: format(new Date(), "yyyy-dd-MM HH:mm:ss"),
    numero_conta_origem,
    numero_conta_destino,
    valor,
  };

  accounts.transferencias.push(newTransfer);

  accounts.contas[indexOriginAccount].saldo -= valor;

  accounts.contas[indexDestinyAccount].saldo += valor;

  return res.status(201).send();
};

module.exports = transferBankAccounts;
