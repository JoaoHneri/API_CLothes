const Endereco = require('../models/Endereco');  // Certifique-se de ter um modelo para Endereco

const addEndereco = async (req, res) => {
    const { user_id } = req.params;
    const { endereco, bairro, numero, cidade, estado, cep } = req.body;

    try {
        const address = await Endereco.create({
            user_id, endereco, bairro, numero, cidade, estado, cep
        });

        return res.status(201).json({ msg: `Endereço adicionado com sucesso: ${address}` });
    } catch (error) {
        return res.status(500).json({ msg: "Failed to create Endereco", error });
    }
};  

const getUserEndereco = async (req, res) => {
    const { user_id } = req.params;
    try {
        const userAddress = await Endereco.find({user_id : user_id});
        return res.status(200).send(userAddress);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const deleteUserEndereco = async (req, res) => {
    const { address_id } = req.params;

    try {
        const deleteAddress = await Endereco.findByIdAndDelete(address_id);
        return res.status(200).send(deleteAddress);
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports = { addEndereco, getUserEndereco, deleteUserEndereco
 };
