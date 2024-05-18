const userAdmin = require("../models/UserAdmin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const verifyJwt = promisify(jwt.verify);
const  userBuy = require("../models/User");
const paymentModel = require("../models/PaymentModel");


const registerAdminUser = async (req, res) => {
  const { userName, userEmail, userPassword, isAdmin } = req.body;

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
      Rent: 0, // Definindo Rent como 0
      Orders: 0, // Definindo Orders como 0
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
    return res
      .status(200)
      .json({ msg: "Usuário registrado com sucesso", token, userId: user._id }); // Inclui o ID do usuário na resposta
  } catch (error) {
    return res.status(400).json(error);
  }
};

const loginAdminUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail) {
    return res.status(422).send({ msg: "O campo email deve ser preenchido" });
  }
  if (!userPassword) {
    return res
      .status(422)
      .send({ msg: "O campo password deve ser preenchido" });
  }

  try {
    const user = await userAdmin.findOne({ userEmail: userEmail });
    if (!user) {
      return res.status(404).send({ msg: "Usuário não encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(
      userPassword,
      user.userPassword
    );
    if (!isPasswordValid) {
      return res.status(401).send({ msg: "Senha inválida" });
    }

    // Gerar token JWT
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      secret
    );

    return res
      .status(200)
      .json({
        msg: "Login realizado com sucesso",
        token,
        userId: user._id,
        isAdmin: true,
      });
  } catch (error) {
    return res.status(500).json({ msg: "Erro interno do servidor", error });
  }
};

const getAdminUser = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(401).send({ msg: "Inserir user_id" });
  }

  try {
    const usersLength = await userBuy.countDocuments();
    const totalOrders = await paymentModel.countDocuments();
    const user = await userAdmin.findById(user_id);
    if (user) {
      const { userName, isAdmin, Rent, Orders } = user;
      return res.status(200).json({ userName, isAdmin, Rent, Orders, usersLength, totalOrders });
    } else {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Erro interno ao encontrar usuario", error });
  }
};


module.exports = {
  registerAdminUser,
  loginAdminUser,
  getAdminUser,
};
