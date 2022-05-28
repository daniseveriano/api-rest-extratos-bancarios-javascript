const accounts = require("../database/database");

const getBankAccounts = async (req, res) => {
  const senha = req.query.senha_banco;

  if (!senha) {
    return res
      .status(401)
      .json({ mensagem: "A senha do banco deve ser informada!" });
  }

  if (senha !== accounts.banco.senha) {
    return res.status(401).json({ mensagem: "A senha do banco é inválida!" });
  }

  if (accounts.contas.length === 0) {
    return res.status(204).send();
  }

  return res.json(accounts.contas);
};

module.exports = getBankAccounts;
