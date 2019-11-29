const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const alunas = require("../model/alunas.json");
const bcrypt = require("bcryptjs");

//Validando se a senha que o usuário inseriu é a mesma que ele cadastrou
function checkPassword(passwordEntry, password) {
  //console.log(passwordEntry, 'aqui é o password do usuario')
  //console.log(password, 'aqui é o password do BD')
  return bcrypt.compareSync(passwordEntry, password);
}

exports.getToken = (req, res) => {
  const { name, password: passwordEntry } = req.body;
  const user = alunas.find(e => e.nome == name);

  if (!user) {
    return res.status(401).json({ error: "User not found!" });
  }

  const { id, nome, hashPass } = user;

  try {
    checkPassword(passwordEntry, hashPass);
  } catch (e) {
    return res.status(401).json({ error: "password does not match" });
  }

  try {
    return res.json({
      user: {
        id,
        nome
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  } catch (e) {
    return res.status(401).json({ error: "error" });
  }
};
