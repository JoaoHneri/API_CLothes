const { Router } = require('express')
const ProductController = require("../controllers/produtoController")
const routes = Router()

routes.get('/products', ProductController.getAll);
routes.post('/products', ProductController.addProd);
routes.get("/products/:_id", ProductController.getById);
routes.put("/products/:_id", ProductController.updateProd);
routes.delete("/products/:_id", ProductController.deleteProd);
module.exports = routes