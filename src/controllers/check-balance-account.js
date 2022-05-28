const accounts = require("../database/database");

const checkBalanceAccount = async (req, res) => {
  const conta = req.query.numero_conta;
  const senha = req.query.senha;

  if (!conta || !senha) {
    return res
      .status(400)
      .json({ mensagem: "O número da conta e a senha são obrigatórios!" });
  }

  if (conta.length !== 6) {
    return res
      .status(400)
      .json({
        mensagem: "O número da conta deve ter 6 dígitos, com zeros à esquerda!",
      });
  }

  const findIndexAccount = accounts.contas.findIndex(
    (account) => account.numero === conta
  );

  if (findIndexAccount < 0) {
    return res.status(400).json({ mensagem: "Conta bancária não encontrada!" });
  }

  if (accounts.contas[findIndexAccount].usuario.senha !== senha) {
    return res.status(400).json({ mensagem: "Senha inválida!" });
  }

  const balance = accounts.contas[findIndexAccount].saldo;

  return res.json({ saldo: `${balance}` });
};

module.exports = checkBalanceAccount;
