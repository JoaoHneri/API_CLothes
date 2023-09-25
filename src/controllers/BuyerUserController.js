const buyerUser = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { userName, userUsername, userEmail, userPassword } = req.body;

  if (!userUsername || !userName || !userEmail || !userPassword) {
    return res.status(422).send({ msg: "Todos os campos são necessários" });
  }

  const userExist = await buyerUser.findOne({ userEmail: userEmail });

  if (userExist) {
    return res
      .status(422)
      .send({ msg: "Usuário já existe, tente com outro email" });
  }

  //Introdução ao bcrypt
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(userPassword, salt);
  //
  try {
    const user = await buyerUser.create({
      userName,
      userUsername,
      userEmail,
      userPassword: passwordHash,
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const loginUser = async (req, res) => {
    const {userEmail, userPassword} = req.body;
    if(!userEmail){
        return res.status(422).send({ msg:"O campo email deve ser preenchido"})
    }
    if(!userPassword){
        return res.status(422).send({ msg:"O campo password deve ser preenchido"})
    }

    const checkUserExists = await buyerUser.findOne({userEmail: userEmail})

    if(!checkUserExists){
        return res.status(200).json({msg: "Usuário não existe, crie uma conta "})
    }

    const checkPassword = await bcrypt.compare(userPassword,  checkUserExists.userPassword)

    if(!checkPassword){
        return res.status(422).send({ msg:"Senha inválida, tente novamente"});
    }


};

const getBuyerUser = async (req, res) => {
  try {
    const users = await buyerUser.find({});
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const updateBuyerUser = async (req, res) => {
  const { user_id } = req.params;
  const { userName, userPassword, userUsername, userEmail } = req.body;
  try {
    const userUpdated = await buyerUser.findByIdAndUpdate(user_id, {
      userName,
      userPassword,
      userUsername,
      userEmail,
    });
    return res.status(200).json({ msg: "Usuario Atualizado: " + userUpdated });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getBuyerUserByID = async (req, res) => {
  const { user_id } = req.params;
  try {
    const userById = await buyerUser.findById(user_id);
    return res.status(200).send(userById);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  registerUser,
  getBuyerUser,
  updateBuyerUser,
  getBuyerUserByID,
};
