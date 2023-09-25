const jwt = require('jsonwebtoken');
require('dotenv').config()

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Acesso negado!' });
    }

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado!' });
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret);
        next();
    } catch (error) {
        response.status(400).jso({msg: "Token inválido"})
    }

}

module.exports = checkToken;
