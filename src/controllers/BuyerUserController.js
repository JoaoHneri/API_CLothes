const buyerUser = require("../models/User");

const addBuyerUser = async(req, res) =>{
    const {userName,userPassword, userUsername, userEmail} = req.body;
    try {
        const userAdded = await buyerUser.create({userName,userPassword, userUsername, userEmail});
        return res.status(200).json(userAdded);
    } catch (error) {
        return res.status(400).send(error)
    }
}

const getBuyerUser = async(req, res) =>{
    try {
        const users = await buyerUser.find({});
        return res.status(200).send(users);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const updateBuyerUser = async(req, res) =>{
    const {user_id} = req.params;
    const {userName,userPassword, userUsername, userEmail} = req.body;
    try {
        const userUpdated = await buyerUser.findByIdAndUpdate(user_id,{userName,userPassword, userUsername, userEmail});
        return res.status(200).json({msg: "Usuario Atualizado: " + userUpdated});
    } catch (error) {
        return res.status(400).send(error)
    }
}

const getBuyerUserByID = async(req, res) =>{
    const {user_id} = req.params;
    try {
        const userById = await buyerUser.findById(user_id);
        return res.status(200).send(userById);
    } catch (error) {
        return res.status(400).send(error)
    }
}

module.exports = {
    getBuyerUser,
    addBuyerUser,
    updateBuyerUser,
    getBuyerUserByID
}