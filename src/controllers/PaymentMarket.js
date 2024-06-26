const mercadopago = require("mercadopago");


const userAdmin = require('../models/UserAdmin');
const Product = require("../models/produto");
const Payment = require("../models/PaymentModel")
const Endereco = require("../models/Endereco");


const createOrder = async (req, res) => {
  const { MercadoPagoConfig, Preference } = mercadopago;
  const { title, quantity, unitPrice, _id, user_id } = req.body;


  const UserEnderecoExist = await Endereco.findOne({user_id: user_id});

  if (!UserEnderecoExist) {
    return res.status(400).send({ message: "Endereço não encontrado, adicione um endereço de entrega antes de efetuar um pagamento" });
  }

  const client = new MercadoPagoConfig({
    accessToken:
      "TEST-5578619956867464-051619-e0e64a90ef16d6b9e18f9a75b92a1535-1817359044",
  });

  const preference = new Preference(client);
  let rest;
  const response = await preference
    .create({
      body: {
        items: [
          {
            title: title,
            quantity: quantity,
            unit_price: unitPrice,
            currency_id: "BRL",
          },
        ],
        back_urls: {
          success: `http://localhost:4200/success-payment/${user_id}/${_id}`,
          pending: `http://localhost:4200/account/${user_id}`,
          failure: `http://localhost:4200/account/${user_id}`,
        },
      },
    })
    .then((response) => {
      rest = response;
    })
    .catch(console.log);

  return res.status(201).send(rest);
};

const receiveWebhook = async (req, res) => {
  const { user_id, _id } = req.params;

  try {
    const payment = await Payment.findById(_id);
    if (!payment) {
      return res.status(404).send("Pagamento não encontrado");
    }

    // Verificar se o pagamento já está com status "Aguardando Envio" e se os IDs coincidem
    if (payment.status === "Aguardando Envio" && payment.user_id.toString() === user_id) {
      return res.status(400).send("Este pagamento já foi processado.");
    }

    payment.status = "Aguardando Envio";
    await payment.save();

    // Atualizar o userAdmin
    const admin = await userAdmin.findOne(); // Encontrar o único administrador no sistema
    if (!admin) {
      return res.status(404).send("Administrador não encontrado");
    }

    admin.Rent = (admin.Rent || 0) + payment.productPrice;
    admin.Orders = (admin.Orders || 0) + 1;
    await admin.save();

    return res.status(200).send("Webhook processado com sucesso");
  } catch (error) {
    console.error("Erro ao processar o webhook:", error);
    return res.status(500).send("Erro interno do servidor");
  }
};

module.exports = {
  createOrder,
  receiveWebhook,
};






module.exports = {
  createOrder,
  receiveWebhook,
};