const userAdmin = require('../models/UserAdmin');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const verifyJwt = promisify(jwt.verify);


const registerAdminUser = async (req, res) => {
    const { userName, userEmail, userPassword, isAdmin } = req.body;
  
    if (!userEmail) {
      return res.status(422).send({ msg: "O campo email deve ser preenchido" });
    }
    if (!userPassword) {
      return res.status(422).send({ msg: "O campo password deve ser preenchido" });
    }
    if (!userName) {
      return res.status(422).send({ msg: "O campo Nome deve ser preenchido" });
    }
    if (isAdmin === undefined) {
      return res.status(422).send({ msg: "O campo isAdmin deve ser preenchido" });
    }
  
    const userExist = await userAdmin.findOne({ userEmail: userEmail });
  
    if (userExist) {
      return res.status(422).send({
        msg: "Já existe um usuário cadastrado com esse email, por favor tente com outro",
      });
    }
  
    // Introdução ao bcrypt
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(userPassword, salt);
  
    try {
      const user = await userAdmin.create({
        userName,
        userEmail,
        userPassword: passwordHash,
        isAdmin,
        Rent: 0,  // Definindo Rent como 0
        Orders: 0 // Definindo Orders como 0
      });
  
      // Gerar token JWT incluindo o ID do usuário no payload
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user._id.toString(), // Incluir o ID do novo usuário no payload
        },
        secret
      );
  
      await enviarEmail(userEmail, userName);
      return res.status(200).json({ msg: "Usuário registrado com sucesso", token, userId: user._id }); // Inclui o ID do usuário na resposta
    } catch (error) {
      return res.status(400).json(error);
    }
  };
  
  module.exports = {
    registerAdminUser
  }