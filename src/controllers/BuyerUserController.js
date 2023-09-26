const buyerUser = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const enviarEmail = require("../services/nodemailer");

const registerUser = async (req, res) => {
  const { userName, userUsername, userEmail, userPassword } = req.body;

  if (!userUsername) {
    return res
      .status(422)
      .send({ msg: "O campo username deve ser preenchido" });
  }

  if (!userEmail) {
    return res.status(422).send({ msg: "O campo email deve ser preenchido" });
  }
  if (!userPassword) {
    return res
      .status(422)
      .send({ msg: "O campo password deve ser preenchido" });
  }
  if (!userName) {
    return res.status(422).send({ msg: "O campo Nome deve ser preenchido" });
  }

  const userExist = await buyerUser.findOne({ userEmail: userEmail });

  if (userExist) {
    return res.status(422).send({
      msg: "Já existe um usuário cadastrado com esse email, por favor tente com outro",
    });
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
    await enviarEmail(userEmail, userName)

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  if (!userEmail) {
    return res.status(422).send({ msg: "O campo email deve ser preenchido" });
  }
  if (!userPassword) {
    return res
      .status(422)
      .send({ msg: "O campo password deve ser preenchido" });
  }

  const checkUserExists = await buyerUser.findOne({ userEmail: userEmail });

  if (!checkUserExists) {
    return res.status(200).json({ msg: "Usuário não existe, crie uma conta " });
  }

  const checkPassword = await bcrypt.compare(
    userPassword,
    checkUserExists.userPassword
  );

  if (!checkPassword) {
    return res.status(422).send({ msg: "Senha inválida, tente novamente" });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: checkUserExists._id.toString,
      },
      secret
    );
    res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
  } catch (error) {
    return res.status(422).send(error);
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
    const userById = await buyerUser.findById(user_id, "-userPassword");
    return res.status(200).send(userById);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteBuyerUserByID = async (req, res) => {

  const { user_id } = req.params;

  const findUserById = await buyerUser.findById(user_id);
  if(!findUserById){
      return res.status(404).send("Usuário não encontrado, verifique se está logado ou se a conta existe.")
  }

  try {
    const deltedUser = await buyerUser.findByIdAndDelete(user_id);
    return res.status(200).send({msg:"Usuário deletado com sucesso"});
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  registerUser,
  getBuyerUser,
  updateBuyerUser,
  getBuyerUserByID,
  loginUser,
  deleteBuyerUserByID
};
