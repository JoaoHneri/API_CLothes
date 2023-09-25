const { Router } = require('express')
const ProductController = require("../controllers/produtoController")
const BuyerUserController = require("../controllers/BuyerUserController");
const routes = Router()

routes.get('/products', ProductController.getAll);
routes.post('/products', ProductController.addProd);
routes.get("/products/:_id", ProductController.getById);
routes.put("/products/:_id", ProductController.updateProd);
routes.delete("/products/:_id", ProductController.deleteProd);

routes.post("/auth/register", BuyerUserController.registerUser);
routes.get("/users", BuyerUserController.getBuyerUser);
routes.put("/users/:user_id", BuyerUserController.updateBuyerUser);
routes.get("/users/:user_id", BuyerUserController.getBuyerUserByID);

module.exports = routes