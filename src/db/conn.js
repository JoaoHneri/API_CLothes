const mongoose = require('mongoose')

const dbUri = process.env.DB_URI
async function main(){
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(dbUri);
        console.log("Conectado com MongoDb");
    } catch (error) {
        console.log("Não foi possível conectar ao banco de dados MONGO");
    }
}
module.exports = main;