const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/produto")

const addProductInCart = async (req, res) => {
  const { idProd, productName, productPrice, productSizes, productQuantity, src } = req.body;
  const { user_id } = req.params;

  try {
      // Verifica se o ID do usuário foi fornecido nos parâmetros
      if (!user_id) {
          return res.status(400).send({ message: "ID de usuário não fornecido" });
      }

      // Encontra o usuário pelo ID
      const findUser = await User.findById(user_id);
      if (!findUser) {
          return res.status(404).send({ message: "Usuário não encontrado, verifique se está logado corretamente" });
      }
      const createCart = await Cart.create({ 
          user_id, // Certifique-se de usar user_id
          idProd, 
          productName, 
          productPrice, 
          productSizes, 
          productQuantity, 
          src
      });

      return res.status(201).send(createCart); // Mudado para 201 para indicar criação bem-sucedida
  } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error);
      return res.status(500).send({ message: "Ocorreu um erro ao adicionar o produto ao carrinho" });
  }
};






const getUserCart = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Verifica se o ID do usuário foi fornecido nos parâmetros
    if (!user_id) {
      return res.status(400).send({ message: "ID de usuário não fornecido" });
    }

    // Busca todos os itens do carrinho para o usuário fornecido
    const userCart = await Cart.find({ user_id });

    // Verifica se o usuário possui itens no carrinho
    if (userCart.length === 0) {
      return res.status(404).send({ message: "Nenhum item encontrado no carrinho para este usuário" });
    }

    // Retorna os itens do carrinho
    return res.status(200).send(userCart);
  } catch (error) {
    console.error("Erro ao buscar o carrinho do usuário:", error);
    return res.status(500).send({ message: "Ocorreu um erro ao buscar o carrinho do usuário" });
  }
};

const deleteItemCart = async (req, res) => {
  const { _id } = req.params;

  try {
    // Verifica se os IDs do usuário e do produto foram fornecidos nos parâmetros
    if (!_id ) {
      return res.status(400).send({ message: "ID de usuário ou ID do produto não fornecido" });
    }

    // Deleta o item do carrinho com base no user_id e idProd
    const deletedCart = await Cart.findByIdAndDelete({ _id });

    // Verifica se o item do carrinho foi encontrado e deletado
    if (!deletedCart) {
      return res.status(404).send({ message: "Nenhum item encontrado no carrinho para este usuário e produto" });
    }

    // Retorna uma mensagem de sucesso
    return res.status(200).send({ message: "Item do carrinho deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar o item do carrinho:", error);
    return res.status(500).send({ message: "Ocorreu um erro ao deletar o item do carrinho" });
  }
};


module.exports = {
    addProductInCart,
    getUserCart,
    deleteItemCart
}