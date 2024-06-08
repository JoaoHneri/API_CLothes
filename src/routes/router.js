const { Router } = require('express')
const ProductController = require("../controllers/produtoController")
const BuyerUserController = require("../controllers/BuyerUserController");
const CartController = require("../controllers/CartController");
const routes = Router()
const checkToken = require("../middlewares/checkToken")
const upload = require("../config/Multer")
const PaymentController = require("../controllers/PaymentController")
const userAdminController = require("../controllers/UserAdminController");
const PaymentMarketController = require("../controllers/PaymentMarket");
const EnderecoController = require("../controllers/EnderecoController");


routes.get("/", (req, res) => {
    res.status(200).send({msg:"Bem vindo A API CLothes"})
})

routes.get('/products', ProductController.getAll);
routes.get('/products/category/:category', ProductController.getByCategory);
routes.post('/products', upload.single("file"), ProductController.addProd);
routes.get("/products/:_id", ProductController.getById);
routes.put("/products/:_id", upload.single('file'), ProductController.updateProd);
routes.delete("/products/:_id", ProductController.deleteProd);

routes.post("/auth/register", BuyerUserController.registerUser);
routes.post("/auth/login", BuyerUserController.loginUser);
routes.get("/users/:user_id", BuyerUserController.getBuyerUserByID);
routes.get("/users", BuyerUserController.getBuyerUser);
routes.put("/users/:user_id", BuyerUserController.updateBuyerUser);
routes.delete("/users/:user_id", BuyerUserController.deleteBuyerUserByID);

routes.post("/cart/:user_id", CartController.addProductInCart);
routes.get("/cart/:user_id", CartController.getUserCart);
routes.delete('/cart/:_id', CartController.deleteItemCart);

routes.get("/payment/prod/:_id", PaymentController.getPaymentProd); 
routes.post("/payment/prod/code/:_id/:codRastreio/:idAdmin", PaymentController.sendAndCode); 
routes.post("/payment/:user_id", PaymentController.addProdToPay); 
routes.get("/payment/:user_id", PaymentController.getUserProdPay); 
routes.get("/payment/status/:user_id/:status", PaymentController.getUserProdPayByStatus); 
routes.get("/payment/send/status/:status", PaymentController.getProdsToSend); 
routes.get("/payment/send/complete/:_id", PaymentController.concludPayment); 

routes.post("/register/admin", userAdminController.registerAdminUser);
routes.post("/login/admin", userAdminController.loginAdminUser);
routes.get("/getAdminUser/:user_id", userAdminController.getAdminUser);


routes.post("/createOrder", PaymentMarketController.createOrder);

routes.get("/success", (req, res) => {res.send("success!");});
routes.get("/failure", (req, res) => {res.send("failure!");});
routes.get("/pending", (req, res) => {res.send("pending");});
routes.get("/success-payment/:user_id/:_id", PaymentMarketController.receiveWebhook);


routes.post("/address/:user_id", EnderecoController.addEndereco);
routes.get("/address/user/:user_id", EnderecoController.getUserEndereco);
routes.delete("/address/user/:address_id", EnderecoController.deleteUserEndereco);

module.exports = routes