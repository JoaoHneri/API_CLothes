const Cart = require("../models/Cart");
const User = require("../models/User");


const addProductInCart = async (req, res) => {
    const {products, userName} = req.body;
    const {user_id} = req.params;

    try {
        if(products == 0){
            return res.status(404).send({message: "Carrinho não pode está vazio, verifique se há items"}) 
        }

        const findUser = await User.findById({_id: user_id});
        if(!findUser){
            return res.status(404).send({message: "Usuário não encontrado, verifique se está logado corretamente"})
        }

        const createCart = await Cart.create({products, userName: user_id})
        return res.status(200).send(createCart);
    } catch (error) {
        return res.status(404).send(error);
    }
}


const getUserCart = async (req, res) => {
    const {user_id} = req.params;
    try {
        const findCartUser = await Cart.find({userName: user_id});
        if(!findCartUser){
            res.status(200).send({msg: "Usuário não possui items no carrinho"})
        }
        return res.status(200).send(findCartUser)
    } catch (error) {
        return res.status(400).send(error)
    }
}

const deleteCart = async (req, res) => {
    const { cart_id } = req.params;

    try {
        const findCart = await Cart.findById(cart_id);
        if (!findCart) {
            return res.status(400).send({ msg: "Este Carrinho não existe" });
        }

        const deleteCart = await Cart.findByIdAndDelete(cart_id);
        if (!deleteCart) {
            return res.status(400).send({ msg: "Falha ao excluir o carrinho" });
        }

        return res.status(200).send(deleteCart);
    } catch (error) {
        return res.status(400).send(error);
    }
}


module.exports = {
    addProductInCart,
    getUserCart,
    deleteCart
}