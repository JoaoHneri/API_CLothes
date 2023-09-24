const Product = require("../models/Produto");

const addProd = async (req, res) => {
  try {
    const { productName, productPrice, productColors, productSizes, productDescription,productQuantity } = req.body;
    const Prods = await Product.create({ productName, productPrice, productColors, productSizes, productDescription,productQuantity });
    return res.status(201).json(Prods);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(400).send(error);
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
      const { productName, productPrice, productColors, productSizes, productDescription,productQuantity } = req.body;
      const updatedProds = await Product.findByIdAndUpdate(_id, { productName, productPrice, productColors, productSizes, productDescription,productQuantity });
      return res.status(201).json({msg: `Produto Atualizado com sucesso: ${updatedProds}`});
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  const deleteProd = async (req, res) => {
    const { _id } = req.params;
    try {
      const deletedProd = await Product.findByIdAndDelete(_id);
      return res.status(201).json(deletedProd);
    } catch (error) {
      return res.status(400).send({msg: "Produto não encontrado"})
    }
  }
  



module.exports = {
  getAll,
  addProd,
  getById,
  updateProd, deleteProd
};
