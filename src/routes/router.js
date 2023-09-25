const { Router } = require('express')
const ProductController = require("../controllers/produtoController")
const BuyerUserController = require("../controllers/BuyerUserController");
const CartController = require("../controllers/CartController");
const routes = Router()
const checkToken = require("../middlewares/checkToken")





routes.get("/", (req, res) => {
    res.status(200).send({msg:"Bem vindo A API CLothes"})
})

routes.get('/products', ProductController.getAll);
routes.post('/products', ProductController.addProd);
routes.get("/products/:_id", ProductController.getById);
routes.put("/products/:_id", ProductController.updateProd);
routes.delete("/products/:_id", ProductController.deleteProd);

routes.post("/auth/register", BuyerUserController.registerUser);
routes.get("/users/:user_id", BuyerUserController.getBuyerUserByID);
routes.post("/auth/login", BuyerUserController.loginUser);
routes.get("/users", BuyerUserController.getBuyerUser);
routes.put("/users/:user_id", BuyerUserController.updateBuyerUser);


routes.post("/cart/:user_id", CartController.addProductInCart);
routes.get("/cart/:user_id", CartController.getUserCart);
routes.delete("/cart/:cart_id", CartController.deleteCart)

module.exports = routes