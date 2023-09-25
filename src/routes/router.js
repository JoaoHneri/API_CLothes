const { Router } = require('express')
const ProductController = require("../controllers/produtoController")
const BuyerUserController = require("../controllers/BuyerUserController");
const routes = Router()

routes.get('/products', ProductController.getAll);
routes.post('/products', ProductController.addProd);
routes.get("/products/:_id", ProductController.getById);
routes.put("/products/:_id", ProductController.updateProd);
routes.delete("/products/:_id", ProductController.deleteProd);

routes.get("/buyerUsers", BuyerUserController.getBuyerUser);
routes.post("/buyerUsers", BuyerUserController.addBuyerUser);
routes.put("/buyerUsers/:user_id", BuyerUserController.updateBuyerUser);
routes.get("/buyerUsers/:user_id", BuyerUserController.getBuyerUserByID);

module.exports = routes