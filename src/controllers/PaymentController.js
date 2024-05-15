const Payment = require("../models/PaymentModel")
const User = require("../models/User");
const Cart = require("../models/Cart");

const addProdToPay = async (req, res) => {
    const { user_id } = req.params;
    const products = req.body;
  
    try {
        if (!user_id) {
            return res.status(400).send({ message: "ID de usuário não fornecido" });
        }
  
        const findUser = await User.findById(user_id);
        if (!findUser) {
            return res.status(404).send({ message: "Usuário não encontrado, verifique se está logado corretamente" });
        }
  
        // Mapeia a lista de produtos e cria um novo documento no banco de dados para cada um
        const createdProducts = await Promise.all(products.map(async (product) => {
            const { idProd, productName, productPrice, productSizes, productQuantity, src, status } = product;
            // Verifica se status está presente, se não estiver, atribui "Aguardando pagamento"
            const finalStatus = status || "Aguardando Pagamento";
            await Payment.create({ idProd, user_id, productName, productPrice, productSizes, productQuantity, src, status: finalStatus });
            // Exclui os itens do carrinho que possuem os mesmos idProd e user_id do produto adicionado ao pagamento
            await Cart.deleteMany({ idProd, user_id });
        }));
  
        return res.status(201).send(createdProducts); // Retorna a lista de produtos criados
    } catch (error) {
        console.error("Erro ao adicionar produto(s) ao pagamento:", error);
        return res.status(500).send({ message: "Ocorreu um erro ao adicionar o(s) produto(s) ao pagamento" });
    }
};



  

const getUserProdPay = async (req, res) => {
    const { user_id } = req.params;

    try {
        if(!user_id){
            return res.status(400).send({ message: "ID de usuário não fornecido" });
        }

        const findProds = await Payment.find({user_id});
        if (findProds.length === 0) {
            return res.status(404).send({ message: "Nenhum item encontrado no carrinho para este usuário" });
          }
      
          // Retorna os itens do carrinho
          return res.status(200).send(findProds);
    } catch (error) {
        console.error("Erro ao buscar produtos do usuário:", error);
        return res.status(500).send({ message: "Ocorreu um erro ao buscar os produtos do usuário" });
    }
}

const getUserProdPayByStatus = async (req, res) => {
    const { user_id, status } = req.params;

    try {
        if (!user_id) {
            return res.status(400).send({ message: "ID de usuário não fornecido" });
        }

        const findProds = await Payment.find({ user_id, status });
        if (findProds.length === 0) {
            return res.status(404).send({ message: "Nenhum item encontrado no carrinho para este usuário com o status fornecido" });
        }
      
        // Retorna os itens do carrinho com o status fornecido
        return res.status(200).send(findProds);
    } catch (error) {
        console.error("Erro ao buscar produtos do usuário por status:", error);
        return res.status(500).send({ message: "Ocorreu um erro ao buscar os produtos do usuário por status" });
    }
}


module.exports = {
    addProdToPay,
    getUserProdPay,
    getUserProdPayByStatus
}