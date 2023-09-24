const Product = require("../models/produto");

const addProd = async (req, res) => {
  try {
    const { name, price, colors, size } = req.body;
    const Prods = await Product.create({ name, price, colors, size });
    return res.status(201).json(Prods);
  } catch (error) {
    return res.status(400).send(error); // Correção: use res.status().send() em vez de res.sendStatus()
  }
};

const getAll = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).json(allProducts); // Correção: use res.status().json() em vez de res.sendStatus()
  } catch (error) {
    return res.status(400).send(error); // Correção: use res.status().send() em vez de res.sendStatus()
  }
};

const getById = async (req, res) => {
    const { _id } = req.params;
  
    try {
      const product = await Product.findById(_id);
      if (!product) {
        return res.status(404).send('Produto não encontrado');
      }
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  const updateProd = async (req, res) => {
    const { _id } = req.params;
    try {
      const { name, price, colors, size } = req.body;
      const updatedProds = await Product.findByIdAndUpdate(_id, { name, price, colors, size });
      return res.status(201).json(updatedProds);
    } catch (error) {
      return res.status(400).send(error); // Correção: use res.status().send() em vez de res.sendStatus()
    }
  };
  



module.exports = {
  getAll,
  addProd,
  getById,
  updateProd
};
