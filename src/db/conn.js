const mongoose = require('mongoose')

const dbUri = process.env.DB_URI
async function main(){
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(dbUri);
        console.log("Conectado com MongoDb");
    } catch (error) {
        
    }
}
module.exports = main;